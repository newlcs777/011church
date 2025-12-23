import { useState, useEffect, useRef } from "react";
import { useAuthContext } from "@/modules/auth/context/AuthContext";

export default function TaskForm({
  onSubmit,
  initialData = null,
  members = [],
}) {
  const { user } = useAuthContext();
  const isInitialized = useRef(false);

  const canEdit =
    user?.role === "admin" ||
    user?.role === "pastor" ||
    user?.role === "lider";

  const [form, setForm] = useState({
    title: "",
    date: "",
    responsibleId: "",
    responsibleName: "",
    responsibleRole: "",
    status: "Pendente",
    description: "",
  });

  const [errors, setErrors] = useState({});

  // ===============================
  // CARREGAR DADOS (EDIT)
  // ===============================
  useEffect(() => {
    if (!initialData || isInitialized.current) return;

    setForm({
      title: initialData.title || "",
      date: initialData.date || "",
      responsibleId: initialData.responsibleId || "",
      responsibleName: initialData.responsibleName || "",
      responsibleRole: initialData.responsibleRole || "",
      status: initialData.status || "Pendente",
      description: initialData.description || "",
    });

    isInitialized.current = true;
  }, [initialData]);

  // ===============================
  // VALIDAÇÃO
  // ===============================
  const validate = () => {
    const newErrors = {};
    if (!form.title.trim())
      newErrors.title = "Informe o nome do serviço.";
    return newErrors;
  };

  // ===============================
  // HANDLERS
  // ===============================
  const handleChange = (e) => {
    if (!canEdit) return;
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectResponsible = (e) => {
    if (!canEdit) return;

    const memberId = e.target.value;
    const selected = members.find((m) => m.id === memberId);

    setForm((prev) => ({
      ...prev,
      responsibleId: selected?.id || "",
      responsibleName: selected?.name || "",
      responsibleRole: selected?.role || "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canEdit) return;

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;
    onSubmit(form);
  };

  // ===============================
  // CLASSES — IGUAIS AO MemberForm
  // ===============================
  const inputBase = `
    input
    input-bordered
    input-sm
    w-full
  `;

  const selectBase = `
    select
    select-bordered
    select-sm
    w-full
  `;

  const textareaBase = `
    textarea
    textarea-bordered
    textarea-sm
    w-full
    resize-none
  `;

  const readOnlyClass = `
    bg-base-200
    cursor-not-allowed
  `;

  // ===============================
  // RENDER
  // ===============================
  return (
    <form
      onSubmit={handleSubmit}
      className="
        flex
        flex-col
        gap-6
        w-full
        max-w-xl
        mx-auto
        px-4
        pb-24
      "
    >
      {/* INFORMAÇÕES DO SERVIÇO */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm sm:text-base font-medium">
          Informações do serviço
        </h3>

        <p className="text-sm text-base-content/60">
          Dados relacionados à atividade no ministério.
        </p>

        <input
          name="title"
          placeholder="Nome do serviço"
          value={form.title}
          onChange={handleChange}
          disabled={!canEdit}
          className={`${inputBase} ${!canEdit ? readOnlyClass : ""} ${
            errors.title ? "input-error" : ""
          }`}
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          disabled={!canEdit}
          className={`${inputBase} ${!canEdit ? readOnlyClass : ""}`}
        />
      </div>

      {/* RESPONSÁVEL */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm sm:text-base font-medium">
          Responsável
        </h3>

        <p className="text-sm text-base-content/60">
          Servo designado para este serviço.
        </p>

        <select
          value={form.responsibleId}
          onChange={handleSelectResponsible}
          disabled={!canEdit}
          className={`${selectBase} ${!canEdit ? readOnlyClass : ""}`}
        >
          <option value="">Selecione um servo</option>
          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name} — {m.role}
            </option>
          ))}
        </select>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          disabled={!canEdit}
          className={`${selectBase} ${!canEdit ? readOnlyClass : ""}`}
        >
          <option>Pendente</option>
          <option>Em andamento</option>
          <option>Concluída</option>
        </select>
      </div>

      {/* OBSERVAÇÕES */}
      <textarea
        name="description"
        placeholder="Observações sobre o serviço"
        value={form.description}
        onChange={handleChange}
        disabled={!canEdit}
        rows={4}
        className={`${textareaBase} ${!canEdit ? readOnlyClass : ""}`}
      />

      {/* AÇÃO — STICKY (IGUAL AO MemberForm) */}
      {canEdit && (
        <div
          className="
            sticky
            bottom-0
            bg-base-100
            pt-4
            pb-3
            flex
            justify-center
            border-t
            border-base-200
          "
        >
          <button
            type="submit"
            className="
              text-xs
              font-medium
              text-base-content/60
              hover:bg-base-200
              rounded-lg
              px-4
              py-2
              transition
              active:scale-[0.98]
            "
          >
            Salvar
          </button>
        </div>
      )}
    </form>
  );
}
