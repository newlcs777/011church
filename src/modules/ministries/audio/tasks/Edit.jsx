import MinistryPageWrapper from "../../components/MinistryPageWrapper";
import TaskForm from "../../components/TaskForm";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editTask,
  fetchTasks,
  removeTask, // ✅ CORRETO
} from "../../store/tasksSlice";
import {
  fetchMembersByMinistry,
} from "@/modules/members/store/membersSlice";
import { useEffect } from "react";

import { useAuthContext } from "../../../auth/context/AuthContext";

export default function AudioTaskEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useAuthContext();

  const canEdit =
    user?.role === "admin" ||
    user?.role === "pastor" ||
    user?.role === "lider";

  const tasks = useSelector((state) => state.tasks.audio || []);

  // ✅ MEMBROS VINCULADOS AO ÁUDIO
  const members = useSelector(
    (state) => state.membersGlobal.byMinistry.audio || []
  );

  useEffect(() => {
    dispatch(fetchTasks("audio"));
    dispatch(fetchMembersByMinistry("audio"));
  }, [dispatch]);

  const task = tasks.find((t) => t.id === id);

  if (!task) return <p>Carregando...</p>;

  // ===============================
  // SALVAR
  // ===============================
  const handleSubmit = async (data) => {
    if (!canEdit) return;

    await dispatch(editTask({ ministry: "audio", id, data }));
    navigate(-1);
  };

  // ===============================
  // EXCLUIR
  // ===============================
  const handleDelete = async () => {
    if (!canEdit) return;

    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este serviço?"
    );

    if (!confirmDelete) return;

    await dispatch(removeTask({ ministry: "audio", id })); // ✅ CORRETO
    navigate(-1);
  };

  return (
    <MinistryPageWrapper title="Editar Tarefa – Áudio">
      <TaskForm
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        initialData={task}
        members={members}
      />
    </MinistryPageWrapper>
  );
}
