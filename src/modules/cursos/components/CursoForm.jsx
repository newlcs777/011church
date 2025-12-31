import { FaTrash } from "react-icons/fa";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function CursoForm({
  values = {},
  onChange,
  onSubmit,
  onCancel,
  onDelete,
  isSubmitting = false,
  canDelete = false,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 md:gap-6"
    >
      <section
        className="
          bg-base-100
          border
          border-base-200
          rounded-2xl
          p-4
          md:p-6
          flex
          flex-col
          gap-5
        "
      >
        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-base font-semibold">
            Cadastro de Curso
          </h2>
          <p className="text-sm text-base-content/70">
            Organize os cursos (módulos) de ensino da igreja.
          </p>
        </div>

        {/* ORDEM DO CURSO */}
        <div className="flex flex-col gap-1">
          <Input
            label="Ordem do curso"
            name="ordem"
            type="number"
            min={1}
            step={1}
            value={values.ordem ?? ""}
            onChange={onChange}
            required
          />
          <span className="text-xs text-base-content/60">
            Define a ordem de exibição do curso (Curso 01, 02, 03…)
          </span>
        </div>

        {/* TÍTULO */}
        <Input
          label="Título do curso"
          name="titulo"
          value={values.titulo ?? ""}
          onChange={onChange}
          required
        />

        {/* DESCRIÇÃO */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-base-content/70">
            Descrição do curso
          </label>
          <textarea
            name="descricao"
            value={values.descricao ?? ""}
            onChange={onChange}
            rows={4}
            className="
              w-full
              bg-base-100
              border
              border-base-300
              rounded-lg
              px-3
              py-2
              text-sm
              resize-none
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-base-300
            "
          />
        </div>

        <div className="h-px bg-base-200" />

        {/* AÇÕES */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancelar
          </Button>

          <Button type="submit" variant="ghost" disabled={isSubmitting}>
            {isSubmitting ? "Salvando…" : "Salvar curso"}
          </Button>
        </div>

        {canDelete && (
          <>
            <div className="h-px bg-base-200" />
            <Button
              type="button"
              variant="ghost"
              onClick={onDelete}
              className="text-error flex items-center gap-2"
            >
              <FaTrash />
              Excluir curso
            </Button>
          </>
        )}
      </section>
    </form>
  );
}
