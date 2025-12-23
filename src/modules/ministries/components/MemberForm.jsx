import { useState, useEffect, useRef } from "react";

export default function MemberForm({
  onSubmit,
  initialData = null,
  readOnly = false,
}) {
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
  // CARREGAR DADOS (EDIT)
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
    if (!form.name.trim()) newErrors.name = "Informe o nome do membro.";
    if (!form.phone.trim()) newErrors.phone = "Informe um telefone para contato.";
    if (!form.email.trim()) {
      newErrors.email = "Informe um e-mail.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "E-mail inválido.";
    }
    if (!form.address.trim()) newErrors.address = "Informe o endereço.";
    if (!form.role.trim()) newErrors.role = "Informe a função no ministério.";
    if (!form.availability.trim())
      newErrors.availability = "Informe a disponibilidade.";
    return newErrors;
  };

  // ===============================
  // HANDLERS
  // ===============================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (readOnly) return;

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;
    onSubmit(form);
  };

  // ===============================
  // CLASSES
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
      {/* INFORMAÇÕES PESSOAIS */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm sm:text-base font-medium">
          Informações pessoais
        </h3>

        <p className="text-sm text-base-content/60">
          Dados básicos para cuidado e contato com o membro.
        </p>

        <input
          name="name"
          placeholder="Nome completo do membro"
          value={form.name}
          onChange={handleChange}
          disabled={readOnly}
          className={`${inputBase} ${readOnly ? readOnlyClass : ""} ${
            errors.name ? "input-error" : ""
          }`}
        />

        <input
          name="phone"
          placeholder="Telefone para contato"
          value={form.phone}
          onChange={handleChange}
          disabled={readOnly}
          className={`${inputBase} ${readOnly ? readOnlyClass : ""} ${
            errors.phone ? "input-error" : ""
          }`}
        />

        <input
          name="email"
          placeholder="E-mail do membro"
          value={form.email}
          onChange={handleChange}
          disabled={readOnly}
          className={`${inputBase} ${readOnly ? readOnlyClass : ""} ${
            errors.email ? "input-error" : ""
          }`}
        />

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
        <h3 className="text-sm sm:text-base font-medium">
          Informações ministeriais
        </h3>

        <p className="text-sm text-base-content/60">
          Dados relacionados ao serviço e disponibilidade no ministério.
        </p>

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
          <option value="true">Em atividade</option>
          <option value="false">Temporariamente inativo</option>
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
        <span className="text-sm text-base-content/70">
          O membro confirmou ciência e compromisso com o ministério
        </span>
      </div>

      {/* OBSERVAÇÕES */}
      <textarea
        name="notes"
        placeholder="Observações pastorais ou informações importantes"
        value={form.notes}
        onChange={handleChange}
        disabled={readOnly}
        rows={4}
        className={`${textareaBase} ${readOnly ? readOnlyClass : ""}`}
      />

      {/* AÇÃO — VISÍVEL NO MOBILE */}
      {!readOnly && (
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
