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
    ministries: [],
    isActive: true,
    termSigned: false,
    notes: "",
  });

  const [errors, setErrors] = useState({});

  // ===============================
  // LOAD EDIT DATA
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
      ministries: initialData.ministries || [],
      isActive: initialData.isActive ?? true,
      termSigned: initialData.termSigned ?? false,
      notes: initialData.notes || "",
    });

    isInitialized.current = true;
  }, [initialData]);

  // ===============================
  // VALIDATION
  // ===============================
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Informe o nome.";
    if (!form.phone.trim()) newErrors.phone = "Informe o telefone.";
    if (!form.email.trim()) newErrors.email = "Informe o e-mail.";
    if (!form.address.trim()) newErrors.address = "Informe o endereço.";
    if (!form.role.trim()) newErrors.role = "Informe a função.";
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
  // MINISTÉRIOS
  // ===============================
  const MINISTRIES = [
    { id: "presbiterio", label: "Presbitério" },
    { id: "louvor", label: "Louvor" },
    { id: "audio", label: "Áudio" },
    { id: "impacto", label: "Impacto" },
    { id: "intercessao", label: "Intercessão" },
    { id: "zelo", label: "Zelo" },
    { id: "guardiao", label: "Guardião" },
    { id: "boas_vindas", label: "Boas-vindas" },
    { id: "kids", label: "Kids" },
    { id: "diaconia", label: "Diaconia" },
    { id: "base", label: "Base" },
  ];

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
        <h3 className="text-sm font-medium">
          Informações pessoais
        </h3>

        <input
          name="name"
          placeholder="Nome completo"
          value={form.name}
          onChange={handleChange}
          disabled={readOnly}
          className={`${inputBase} ${
            readOnly ? readOnlyClass : ""
          } ${errors.name ? "input-error" : ""}`}
        />

        <input
          name="phone"
          placeholder="Telefone"
          value={form.phone}
          onChange={handleChange}
          disabled={readOnly}
          className={`${inputBase} ${
            readOnly ? readOnlyClass : ""
          } ${errors.phone ? "input-error" : ""}`}
        />

        <input
          name="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
          disabled={readOnly}
          className={`${inputBase} ${
            readOnly ? readOnlyClass : ""
          } ${errors.email ? "input-error" : ""}`}
        />

        <input
          name="address"
          placeholder="Endereço"
          value={form.address}
          onChange={handleChange}
          disabled={readOnly}
          className={`${inputBase} ${
            readOnly ? readOnlyClass : ""
          } ${errors.address ? "input-error" : ""}`}
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
        <h3 className="text-sm font-medium">
          Informações ministeriais
        </h3>

        <input
          name="role"
          placeholder="Função"
          value={form.role}
          onChange={handleChange}
          disabled={readOnly}
          className={`${inputBase} ${
            readOnly ? readOnlyClass : ""
          } ${errors.role ? "input-error" : ""}`}
        />

        <input
          name="availability"
          placeholder="Disponibilidade"
          value={form.availability}
          onChange={handleChange}
          disabled={readOnly}
          className={`${inputBase} ${
            readOnly ? readOnlyClass : ""
          } ${errors.availability ? "input-error" : ""}`}
        />

        {/* MINISTÉRIOS */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">
            Ministérios
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {MINISTRIES.map((min) => {
              const checked = form.ministries.includes(min.id);

              return (
                <label
                  key={min.id}
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                  "
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={readOnly}
                    onChange={() =>
                      setForm((prev) => ({
                        ...prev,
                        ministries: checked
                          ? prev.ministries.filter(
                              (m) => m !== min.id
                            )
                          : [...prev.ministries, min.id],
                      }))
                    }
                    className="checkbox checkbox-sm"
                  />
                  {min.label}
                </label>
              );
            })}
          </div>
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
          <option value="true">Em atividade</option>
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
        <span className="text-sm">
          Termo aceito
        </span>
      </div>

      {/* OBSERVAÇÕES */}
      <textarea
        name="notes"
        placeholder="Observações"
        value={form.notes}
        onChange={handleChange}
        disabled={readOnly}
        rows={4}
        className={`${textareaBase} ${
          readOnly ? readOnlyClass : ""
        }`}
      />

      {/* AÇÃO MOBILE */}
      {!readOnly && (
        <div
          className="
            sticky
            bottom-0
            bg-base-100
            pt-4
            pb-3
            border-t
            border-base-200
            flex
            justify-center
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
