import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useAuth from "../../auth/hooks/useAuth";
import useComunicados from "../hooks/useComunicados";
import { canCreateComunicado } from "../utils/comunicadopermissions";

import PageHeader from "../../../components/ui/PageHeader";
import ComunicadoForm from "../components/ComunicadoForm";

export default function ComunicadoEditor() {
  const { id } = useParams();
  const editing = Boolean(id);
  const navigate = useNavigate();
  const { user } = useAuth();

  const canCreate = canCreateComunicado(user?.role);

  const {
    getComunicadoById,
    createComunicado,
    updateComunicado,
    loading,
  } = useComunicados();

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    data: "",
    horario: "",
    local: "",
  });

  useEffect(() => {
    if (!editing) return;

    const comunicado = getComunicadoById(id);
    if (!comunicado) return;

    setForm({
      titulo: comunicado.titulo ?? "",
      descricao: comunicado.descricao ?? "",
      data: comunicado.data ?? "",
      horario: comunicado.horario ?? "",
      local: comunicado.local ?? "",
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
      updateComunicado({
        id,
        ...form,
      });
    } else {
      createComunicado(form);
    }

    navigate("/comunicados");
  };

  if (!canCreate) {
    return (
      <p className="p-6 text-sm text-base-content/60 text-center">
        Este acesso é reservado à liderança da igreja.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-6">
      {/* TOPO */}
      <div className="flex items-center justify-between">
        <span className="w-[60px]" />

        <PageHeader
          title={editing ? "Editar comunicado" : "Novo comunicado"}
          subtitle={
            editing
              ? "Edite com cuidado a mensagem que será compartilhada com a igreja"
              : "Escreva um comunicado para edificação e orientação da igreja"
          }
          align="center"
        />

        <span className="w-[60px]" />
      </div>

      {/* FORMULÁRIO */}
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
            <ComunicadoForm
              values={form}
              onChange={handleChange}
              onSubmit={handleSubmit}
              onCancel={() => navigate(-1)}
              submitLabel={
                editing
                  ? "Salvar alterações"
                  : "Publicar comunicado"
              }
            />
          )}
        </div>
      </section>
    </div>
  );
}
