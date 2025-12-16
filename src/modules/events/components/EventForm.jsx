import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

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
      className="flex flex-col gap-6"
    >
      {/* TÍTULO */}
      <Input
        label="Título"
        name="titulo"
        placeholder="Ex: Culto de Domingo"
        value={values.titulo}
        onChange={onChange}
      />

      {/* DESCRIÇÃO */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-base-content/70">
          Descrição
        </label>

        <textarea
          name="descricao"
          placeholder="Detalhes sobre o evento"
          value={values.descricao}
          onChange={onChange}
          className="
            w-full
            h-28
            rounded-lg
            border
            border-base-300
            bg-base-100
            p-3
            text-sm
            leading-relaxed
            resize-none
            focus:outline-none
            focus:ring-1
            focus:ring-base-300
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
        />

        <Input
          label="Horário"
          name="horario"
          type="time"
          value={values.horario}
          onChange={onChange}
        />
      </div>

      {/* LOCAL */}
      <Input
        label="Local"
        name="local"
        placeholder="Ex: 011 Church - Santo Amaro"
        value={values.local}
        onChange={onChange}
      />

      {/* AÇÕES */}
      <div className="flex justify-between pt-2">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
        >
          Cancelar
        </Button>

        <Button
          type="submit"
          variant="ghost"
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
