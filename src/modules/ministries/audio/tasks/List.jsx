import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchTasks, removeTask } from "../../store/tasksSlice";
import { fetchMembers } from "../../store/membersSlice";

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

  const tasks = useSelector((state) => state.tasks.audio);

  useEffect(() => {
    dispatch(fetchTasks("audio"));
    dispatch(fetchMembers("audio"));
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (!canEdit) return;

    if (!confirm("Deseja realmente excluir esta tarefa?")) return;

    await dispatch(removeTask({ ministry: "audio", id }));
    dispatch(fetchTasks("audio"));
  };

  return (
    <MinistryPageWrapper title="Tarefas – Ministério de Áudio">
      {/* HEADER AÇÕES */}
      <div className="flex items-center justify-between mb-4">
        {/* 🔙 VOLTAR */}
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

        {/* ➕ NOVA TAREFA (SÓ GESTÃO) */}
        {canEdit && (
          <button
            onClick={() => navigate("create")}
            className="
              btn
              btn-ghost
              btn-sm
              focus:outline-none
              focus:ring-0
            "
          >
            + Nova Tarefa
          </button>
        )}
      </div>

      <TasksTable
        tasks={tasks}
        onEdit={(id) => {
          if (!canEdit) return;
          navigate(`edit/${id}`);
        }}
        onDelete={handleDelete}
      />
    </MinistryPageWrapper>
  );
}
