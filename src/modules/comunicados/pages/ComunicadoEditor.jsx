
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getComunicado,
  createComunicado,
  updateComunicado,
} from "../services/comunicadosService";
import useAuth from "../../auth/hooks/useAuth";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import PageHeader from "../../../components/ui/PageHeader";

export default function ComunicadoEditor() {
  const { id } = useParams();
  const editing = Boolean(id);
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState({
    titulo: "",
    mensagem: "",
    data: "",
  });

  useEffect(() => {
    if (editing) {
      const c = getComunicado(id);
      if (c) setForm(c);
    }
  }, [id, editing]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) updateComunicado(form);
    else createComunicado(form);
    navigate("/comunicados");
  };

  if (user.role !== "admin" && user.role !== "pastor")
    return <p className="p-4">Acesso negado.</p>;

  return (
    <div className="flex flex-col gap-4 max-w-xl">
      <PageHeader
        title={editing ? "Editar Comunicado" : "Novo Comunicado"}
        subtitle="Use comunicados para avisos importantes da igreja"
      />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Título"
          name="titulo"
          placeholder="Ex: Reunião de Líderes"
          value={form.titulo}
          onChange={handleChange}
        />
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Mensagem</label>
          <textarea
            className="textarea textarea-bordered"
            name="mensagem"
            placeholder="Digite o comunicado completo"
            value={form.mensagem}
            onChange={handleChange}
          />
        </div>
        <Input
          label="Data"
          name="data"
          type="date"
          value={form.data}
          onChange={handleChange}
        />

        <div className="flex gap-2 mt-2">
          <Button type="submit">
            Salvar
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/comunicados")}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
