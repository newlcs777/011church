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
    loading,
  } = useEvents();

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    data: "",
    horario: "",
    local: "",
  });

  useEffect(() => {
    if (!editing) return;

    const evt = getEventById(id);
    if (!evt) return;

    setForm({
      titulo: evt.titulo ?? "",
      descricao: evt.descricao ?? "",
      data: evt.data ?? "",
      horario: evt.horario ?? "",
      local: evt.local ?? "",
    });
  }, [editing, id]);

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
      updateEvent({
        id,
        ...form,
      });
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
      {/* TOPO */}
      <div className="flex items-center justify-between">
        <span className="w-[60px]" />

        <PageHeader
          title={editing ? "Editar evento" : "Novo evento"}
          subtitle={
            editing
              ? "Atualize as informações do evento"
              : "Preencha os dados para cadastrar um novo evento"
          }
          align="center"
        />

        <span className="w-[60px]" />
      </div>

      {/* FORM */}
      <section className="flex flex-col gap-2">
        <div className="rounded-xl bg-base-100 p-6">
          {editing && loading ? (
            <div className="flex flex-col gap-4 animate-pulse">
              <div className="h-10 rounded bg-base-200" />
              <div className="h-28 rounded bg-base-200" />
              <div className="grid grid-cols-2 gap-4">
                <div className="h-10 rounded bg-base-200" />
                <div className="h-10 rounded bg-base-200" />
              </div>
              <div className="h-10 rounded bg-base-200" />
            </div>
          ) : (
            <EventForm
              values={form}
              onChange={handleChange}
              onSubmit={handleSubmit}
              onCancel={() => navigate(-1)}
              submitLabel={
                editing
                  ? "Salvar alterações"
                  : "Salvar evento"
              }
            />
          )}
        </div>
      </section>
    </div>
  );
}
