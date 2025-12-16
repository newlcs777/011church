import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useAuth from "../../auth/hooks/useAuth";
import useEvents from "../hooks/useEvents";
import { canCreateEvent } from "../utils/eventPermissions";

import PageHeader from "../../../components/ui/PageHeader";
import EventForm from "../components/EventForm";

export default function EventEditor() {
  const { id } = useParams();
  const editing = Boolean(id);
  const navigate = useNavigate();
  const { user } = useAuth();

  const canCreate = canCreateEvent(user.role);

  const {
    getEventById,
    createEvent,
    updateEvent,
  } = useEvents();

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    data: "",
    horario: "",
    local: "",
  });

  /* 🔴 CORREÇÃO 1: nunca sobrescrever com objeto incompleto */
  useEffect(() => {
    if (editing) {
      const evt = getEventById(id);

      if (evt) {
        setForm({
          titulo: evt.titulo ?? "",
          descricao: evt.descricao ?? "",
          data: evt.data ?? "",
          horario: evt.horario ?? "",
          local: evt.local ?? "",
        });
      }
    }
  }, [editing, id, getEventById]);

  /* 🔴 CORREÇÃO 2: atualização segura de estado */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editing) {
      updateEvent(form);
    } else {
      createEvent(form);
    }

    navigate("/eventos");
  };

  if (!canCreate) {
    return (
      <p className="p-6 text-sm text-base-content/60 text-center">
        Você não tem permissão para criar eventos.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-6">
      {/* HEADER — PADRÃO HOME */}
      <PageHeader
        title={editing ? "Editar evento" : "Novo evento"}
        subtitle={
          editing
            ? "Atualize as informações do evento"
            : "Preencha os dados para cadastrar um novo evento"
        }
      />

      {/* FORM */}
      <section className="flex flex-col gap-2">
        <div className="rounded-xl bg-base-100 p-6">
          <EventForm
            values={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={() => navigate("/eventos")}
            submitLabel={
              editing
                ? "Salvar alterações"
                : "Salvar evento"
            }
          />
        </div>
      </section>
    </div>
  );
}
