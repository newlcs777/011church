import MinistryPageWrapper from "../../components/MinistryPageWrapper";
import TaskForm from "../../components/TaskForm";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editTask, fetchTasks } from "../../store/tasksSlice";
import { fetchMembers } from "../../store/membersSlice";
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

  const tasks = useSelector((state) => state.tasks.audio);
  const members = useSelector((state) => state.members.audio);

  useEffect(() => {
    dispatch(fetchTasks("audio"));
    dispatch(fetchMembers("audio"));
  }, [dispatch]);

  const task = tasks.find((t) => t.id === id);

  if (!task) return <p>Carregando...</p>;

  const handleSubmit = async (data) => {
    if (!canEdit) return;

    await dispatch(editTask({ ministry: "audio", id, data }));
    navigate(-1);
  };

  return (
    <MinistryPageWrapper title="Editar Tarefa – Áudio">
      <TaskForm
        onSubmit={handleSubmit}
        initialData={task}
        members={members}
      />
    </MinistryPageWrapper>
  );
}
