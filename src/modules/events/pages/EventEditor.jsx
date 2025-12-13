
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEvent, createEvent, updateEvent } from "../services/eventsService";
import useAuth from "../../auth/hooks/useAuth";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import PageHeader from "../../../components/ui/PageHeader";

export default function EventEditor() {
  const { id } = useParams();
  const editing = Boolean(id);
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    data: "",
    horario: "",
    local: "",
  });

  useEffect(() => {
    if (editing) {
      const evt = getEvent(id);
      if (evt) setForm(evt);
    }
  }, [id, editing]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) updateEvent(form);
    else createEvent(form);
    navigate("/eventos");
  };

  if (user.role !== "admin" && user.role !== "pastor")
    return <p className="p-4">Acesso negado.</p>;

  return (
    <div className="flex flex-col gap-4 max-w-xl">
      <PageHeader
        title={editing ? "Editar Evento" : "Criar Evento"}
        subtitle="Organize os eventos da igreja de forma simples"
      />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Título"
          name="titulo"
          placeholder="Ex: Culto de Domingo"
          value={form.titulo}
          onChange={handleChange}
        />
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Descrição</label>
          <textarea
            className="textarea textarea-bordered"
            name="descricao"
            placeholder="Detalhes sobre o evento"
            value={form.descricao}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Data"
            name="data"
            type="date"
            value={form.data}
            onChange={handleChange}
          />
          <Input
            label="Horário"
            name="horario"
            type="time"
            value={form.horario}
            onChange={handleChange}
          />
        </div>
        <Input
          label="Local"
          name="local"
          placeholder="Ex: 011 Church - Santo Amaro"
          value={form.local}
          onChange={handleChange}
        />

        <div className="flex gap-2 mt-2">
          <Button type="submit">
            Salvar
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/eventos")}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
