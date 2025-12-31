import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchTasks, removeTask } from "../../store/tasksSlice";
import {
  fetchMembersByMinistry, // ✅ FONTE CORRETA
} from "@/modules/members/store/membersSlice";

import MinistryPageWrapper from "../../components/MinistryPageWrapper";
import TasksTable from "../../components/TasksTable";

import { useAuthContext } from "../../../auth/context/AuthContext";

export default function AudioTasksList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useAuthContext();

  const canEdit =
    user?.role === "admin" ||
    user?.role === "pastor" ||
    user?.role === "lider";

  const tasks = useSelector((state) => state.tasks.audio || []);

  // ✅ MEMBROS VINCULADOS AO ÁUDIO (usado pela TasksTable)
  const members = useSelector(
    (state) => state.membersGlobal.byMinistry.audio || []
  );

  useEffect(() => {
    dispatch(fetchTasks("audio"));
    dispatch(fetchMembersByMinistry("audio"));
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (!canEdit) return;

    if (!confirm("Deseja realmente remover este serviço?")) return;

    await dispatch(removeTask({ ministry: "audio", id }));
    dispatch(fetchTasks("audio"));
  };

  return (
    <MinistryPageWrapper
      title="Serviços do Ministério de Áudio"
      subtitle="Organização dos serviços e responsabilidades no ministério"
    >
      {canEdit && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate("create")}
            className="
              text-xs
              font-medium
              text-base-content/60
              hover:bg-base-200
              rounded-lg
              px-3
              py-1.5
              transition
              active:scale-[0.98]
            "
          >
            + Novo serviço
          </button>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <TasksTable
          tasks={tasks}
          members={members}
          onEdit={(id) => {
            if (!canEdit) return;
            navigate(`edit/${id}`);
          }}
          onDelete={handleDelete}
        />
      </div>
    </MinistryPageWrapper>
  );
}
