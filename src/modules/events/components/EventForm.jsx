import Input from "../../../components/ui/Input";

export default function EventForm({
  values,
  onChange,
  onSubmit,
  onCancel,
  submitLabel = "Salvar",
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="
        flex
        flex-col
        gap-6
      "
    >
      {/* TÍTULO */}
      <Input
        label="Título"
        name="titulo"
        placeholder="Ex: Culto de Domingo"
        value={values.titulo}
        onChange={onChange}
        required
      />

      {/* DESCRIÇÃO */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="descricao"
          className="text-sm text-base-content/70"
        >
          Descrição
        </label>

        <textarea
          id="descricao"
          name="descricao"
          placeholder="Detalhes sobre o evento"
          value={values.descricao}
          onChange={onChange}
          required
          className="
            w-full
            min-h-[120px]
            rounded-xl
            border
            border-base-300
            bg-base-100
            p-3
            text-sm
            leading-relaxed
            resize-none
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-primary
          "
        />
      </div>

      {/* DATA / HORÁRIO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Data"
          name="data"
          type="date"
          value={values.data}
          onChange={onChange}
          required
        />

        <Input
          label="Horário"
          name="horario"
          type="time"
          value={values.horario}
          onChange={onChange}
          required
        />
      </div>

      {/* LOCAL */}
      <Input
        label="Local"
        name="local"
        placeholder="Ex: 011 Church - Santo Amaro"
        value={values.local}
        onChange={onChange}
        required
      />

      {/* AÇÕES */}
      <div className="flex justify-end gap-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              px-3
              py-1.5
              text-xs
              font-medium
              tracking-wide
              transition-all
              duration-200
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-primary
              disabled:cursor-not-allowed
              disabled:opacity-60
              text-neutral/70
              hover:bg-base-200/70
            "
          >
            Cancelar
          </button>
        )}

        <button
          type="submit"
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            px-3
            py-1.5
            text-xs
            font-medium
            tracking-wide
            transition-all
            duration-200
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-primary
            disabled:cursor-not-allowed
            disabled:opacity-60
            text-neutral/70
            hover:bg-base-200/70
          "
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
