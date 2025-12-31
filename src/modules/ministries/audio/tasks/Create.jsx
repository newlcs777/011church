import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MinistryPageWrapper from "../../components/MinistryPageWrapper";
import TaskForm from "../../components/TaskForm";

import { addTask } from "../../store/tasksSlice";
import {
  fetchMembersByMinistry, // ✅ AJUSTE
} from "@/modules/members/store/membersSlice";

import { useAuthContext } from "../../../auth/context/AuthContext";

export default function AudioTaskCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useAuthContext();

  const canEdit =
    user?.role === "admin" ||
    user?.role === "pastor" ||
    user?.role === "lider";

  // ✅ MEMBROS VINCULADOS AO ÁUDIO (fonte correta)
  const members = useSelector(
    (state) => state.membersGlobal.byMinistry.audio || []
  );

  useEffect(() => {
    dispatch(fetchMembersByMinistry("audio"));
  }, [dispatch]);

  const handleSubmit = async (data) => {
    if (!canEdit) return;

    await dispatch(
      addTask({
        ministry: "audio",
        data: {
          ...data,
          responsibleId: data.responsibleId, // 🔥 garante que só o ID vai
        },
      })
    );

    navigate(-1);
  };

  return (
    <MinistryPageWrapper
      title="Adicionar Tarefa"
      subtitle="Ministério de Áudio"
    >
      <TaskForm
        onSubmit={handleSubmit}
        members={members}
      />
    </MinistryPageWrapper>
  );
}
