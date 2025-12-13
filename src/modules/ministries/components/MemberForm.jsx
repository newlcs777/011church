import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function MemberForm({
  onSubmit,
  initialData = null,
  readOnly = false,
}) {
  const navigate = useNavigate();
  const isInitialized = useRef(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    birthDate: "",
    role: "",
    availability: "",
    isActive: true,
    termSigned: false,
    notes: "",
  });

  const [errors, setErrors] = useState({});

  // ===============================
  // CARREGAR DADOS INICIAIS (EDIT)
  // ===============================
  useEffect(() => {
    if (!initialData || isInitialized.current) return;

    setForm({
      name: initialData.name || "",
      phone: initialData.phone || "",
      email: initialData.email || "",
      address: initialData.address || "",
      birthDate: initialData.birthDate || "",
      role: initialData.role || "",
      availability: initialData.availability || "",
      isActive: initialData.isActive ?? true,
      termSigned: initialData.termSigned ?? false,
      notes: initialData.notes || "",
    });

    isInitialized.current = true;
  }, [initialData]);

  // ===============================
  // VALIDAÇÃO
  // ===============================
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Nome obrigatório.";
    if (!form.phone.trim()) newErrors.phone = "Telefone obrigatório.";

    if (!form.email.trim()) {
      newErrors.email = "E-mail obrigatório.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "E-mail inválido.";
    }

    if (!form.address.trim()) newErrors.address = "Endereço obrigatório.";
    if (!form.role.trim()) newErrors.role = "Função obrigatória.";
    if (!form.availability.trim())
      newErrors.availability = "Disponibilidade obrigatória.";

    return newErrors;
  };

  // ===============================
  // HANDLE CHANGE
  // ===============================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ===============================
  // SUBMIT
  // ===============================
  const handleSubmit = (e) => {
    e.preventDefault();
    if (readOnly) return;

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    onSubmit(form);
  };

  // ===============================
  // CLASSES PADRÃO
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
        max-w-3xl
      "
    >
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="
            btn
            btn-ghost
            btn-sm
            focus:outline-none
            focus:ring-0
          "
        >
          ← Voltar
        </button>
      </div>

      {/* INFORMAÇÕES PESSOAIS */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Informações Pessoais</h3>

        <div className="form-control">
          <input
            name="name"
            placeholder="Nome completo"
            value={form.name}
            onChange={handleChange}
            disabled={readOnly}
            className={`${inputBase} ${readOnly ? readOnlyClass : ""} ${
              errors.name ? "input-error" : ""
            }`}
          />
          {errors.name && (
            <span className="text-xs text-error mt-1">{errors.name}</span>
          )}
        </div>

        <div className="form-control">
          <input
            name="phone"
            placeholder="Telefone"
            value={form.phone}
            onChange={handleChange}
            disabled={readOnly}
            className={`${inputBase} ${readOnly ? readOnlyClass : ""} ${
              errors.phone ? "input-error" : ""
            }`}
          />
          {errors.phone && (
            <span className="text-xs text-error mt-1">{errors.phone}</span>
          )}
        </div>

        <div className="form-control">
          <input
            name="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            disabled={readOnly}
            className={`${inputBase} ${readOnly ? readOnlyClass : ""} ${
              errors.email ? "input-error" : ""
            }`}
          />
          {errors.email && (
            <span className="text-xs text-error mt-1">{errors.email}</span>
          )}
        </div>

        <div className="form-control">
          <input
            name="address"
            placeholder="Endereço"
            value={form.address}
            onChange={handleChange}
            disabled={readOnly}
            className={`${inputBase} ${readOnly ? readOnlyClass : ""} ${
              errors.address ? "input-error" : ""
            }`}
          />
          {errors.address && (
            <span className="text-xs text-error mt-1">{errors.address}</span>
          )}
        </div>

        <input
          type="date"
          name="birthDate"
          value={form.birthDate}
          onChange={handleChange}
          disabled={readOnly}
          className={`${inputBase} ${readOnly ? readOnlyClass : ""}`}
        />
      </div>

      {/* INFORMAÇÕES MINISTERIAIS */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Informações Ministeriais</h3>

        <div className="form-control">
          <input
            name="role"
            placeholder="Função no ministério"
            value={form.role}
            onChange={handleChange}
            disabled={readOnly}
            className={`${inputBase} ${readOnly ? readOnlyClass : ""} ${
              errors.role ? "input-error" : ""
            }`}
          />
          {errors.role && (
            <span className="text-xs text-error mt-1">{errors.role}</span>
          )}
        </div>

        <div className="form-control">
          <input
            name="availability"
            placeholder="Disponibilidade (ex: Domingos)"
            value={form.availability}
            onChange={handleChange}
            disabled={readOnly}
            className={`${inputBase} ${readOnly ? readOnlyClass : ""} ${
              errors.availability ? "input-error" : ""
            }`}
          />
          {errors.availability && (
            <span className="text-xs text-error mt-1">
              {errors.availability}
            </span>
          )}
        </div>

        <select
          value={form.isActive ? "true" : "false"}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              isActive: e.target.value === "true",
            }))
          }
          disabled={readOnly}
          className={`${selectBase} ${readOnly ? readOnlyClass : ""}`}
        >
          <option value="true">Ativo</option>
          <option value="false">Inativo</option>
        </select>
      </div>

      {/* TERMO */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="termSigned"
          checked={form.termSigned}
          onChange={handleChange}
          disabled={readOnly}
          className="checkbox checkbox-sm"
        />
        <label className="text-sm">O membro assinou o termo?</label>
      </div>

      {/* OBSERVAÇÕES (EDITÁVEL, SEM RESIZE) */}
      <textarea
        name="notes"
        placeholder="Observações"
        value={form.notes}
        onChange={handleChange}
        disabled={readOnly}
        rows={4}
        className={`${textareaBase} ${readOnly ? readOnlyClass : ""}`}
      />

      {/* AÇÕES */}
      {!readOnly && (
        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="
              btn
              btn-outline
              btn-sm
              bg-base-200
              hover:bg-base-300
              focus:outline-none
              focus:ring-0
            "
          >
            Salvar
          </button>
        </div>
      )}
    </form>
  );
}
