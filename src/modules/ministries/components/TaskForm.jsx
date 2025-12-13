import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "@/modules/auth/context/AuthContext";

export default function TaskForm({
  onSubmit,
  initialData = {},
  members = [],
}) {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const canEdit =
    user?.role === "admin" ||
    user?.role === "pastor" ||
    user?.role === "lider";

  const [form, setForm] = useState({
    title: initialData.title || "",
    date: initialData.date || "",
    responsibleId: initialData.responsibleId || "",
    responsibleName: initialData.responsibleName || "",
    responsibleRole: initialData.responsibleRole || "",
    status: initialData.status || "Pendente",
    description: initialData.description || "",
  });

  const handleSelectResponsible = (e) => {
    if (!canEdit) return;

    const memberId = e.target.value;
    const selected = members.find((m) => m.id === memberId);

    setForm({
      ...form,
      responsibleId: selected?.id || "",
      responsibleName: selected?.name || "",
      responsibleRole: selected?.role || "",
    });
  };

  const handleChange = (e) => {
    if (!canEdit) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canEdit) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn btn-ghost btn-sm focus:outline-none focus:ring-0"
        >
          ← Voltar
        </button>
      </div>

      {!canEdit && (
        <p className="text-xs text-base-content/50">
          Visualização somente leitura
        </p>
      )}

      {/* TÍTULO */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Título</span>
        </label>

        <input
          name="title"
          placeholder="Título da tarefa"
          className="input input-bordered input-sm w-full"
          value={form.title}
          onChange={handleChange}
          disabled={!canEdit}
          required
        />
      </div>

      {/* DATA */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Data</span>
        </label>

        <input
          name="date"
          type="date"
          className="input input-bordered input-sm w-full"
          value={form.date}
          onChange={handleChange}
          disabled={!canEdit}
        />
      </div>

      {/* RESPONSÁVEL */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Responsável</span>
        </label>

        <select
          className="select select-bordered select-sm w-full"
          value={form.responsibleId}
          onChange={handleSelectResponsible}
          disabled={!canEdit}
        >
          <option value="">Selecione um responsável</option>

          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name} — {m.role}
            </option>
          ))}
        </select>
      </div>

      {/* STATUS */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Status</span>
        </label>

        <select
          name="status"
          className="select select-bordered select-sm w-full"
          value={form.status}
          onChange={handleChange}
          disabled={!canEdit}
        >
          <option>Pendente</option>
          <option>Em andamento</option>
          <option>Concluída</option>
        </select>
      </div>

      {/* DESCRIÇÃO */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Descrição</span>
        </label>

        <textarea
          name="description"
          className="textarea textarea-bordered textarea-sm w-full"
          rows={3}
          value={form.description}
          onChange={handleChange}
          disabled={!canEdit}
        />
      </div>

      {/* AÇÕES */}
      {canEdit && (
        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="btn btn-outline btn-sm flex-1 focus:outline-none focus:ring-0"
          >
            Salvar
          </button>
        </div>
      )}
    </form>
  );
}
