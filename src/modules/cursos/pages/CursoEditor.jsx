import useCursoEditorController from "../ui/useCursoEditorController";

import CursoForm from "../components/CursoForm";
import PageHeader from "@/components/ui/PageHeader";
import { Navigate } from "react-router-dom";

export default function CursoEditor() {
  const {
    editing,
    loading,
    permissions,
    form,
    changeField,
    submit,
    remove,
    cancel,
  } = useCursoEditorController();

  // 🔒 A UI apenas reage à decisão do controller
  if (!permissions.canAccess) {
    return <Navigate to="/cursos" replace />;
  }

  if (loading && editing) {
    return (
      <p className="text-sm text-base-content/60 text-center py-8">
        Carregando curso…
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6 pb-6">
      <PageHeader
        title={editing ? "Editar curso" : "Novo curso"}
        subtitle={
          editing
            ? "Atualize as informações deste curso"
            : "Cadastre um novo curso para organização do ensino"
        }
        align="center"
      />

      <CursoForm
        values={form}
        onChange={(e) =>
          changeField(e.target.name, e.target.value)
        }
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        onCancel={cancel}
        onDelete={editing ? remove : undefined}
        canDelete={editing && permissions.canDelete}
      />
    </div>
  );
}
