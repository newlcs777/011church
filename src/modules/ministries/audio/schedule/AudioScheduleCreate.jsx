import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MinistryPageWrapper from "../../components/MinistryPageWrapper";
import { createSchedule } from "../../services/scheduleService";
import { fetchMembers } from "../../store/membersSlice";

import { useAuthContext } from "../../../auth/context/AuthContext";

export default function AudioScheduleCreate() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user } = useAuthContext();

  const canEdit =
    user?.role === "admin" ||
    user?.role === "pastor" ||
    user?.role === "lider";

  const members = useSelector((state) => state.members.audio);

  const params = new URLSearchParams(location.search);
  const presetDate = params.get("date");

  const [date, setDate] = useState(presetDate || "");
  const [cult, setCult] = useState("");
  const [role, setRole] = useState("");
  const [memberId, setMemberId] = useState("");
  const [notes, setNotes] = useState("");

  const month = date ? date.slice(0, 7) : "";

  useEffect(() => {
    dispatch(fetchMembers("audio"));
  }, [dispatch]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!canEdit) return;

    if (!date || !cult || !role || !memberId) {
      alert("Preencha data, culto, função e membro.");
      return;
    }

    await createSchedule("audio", {
      date,
      month,
      cult,
      role,
      memberId,
      notes,
      status: "pending",
    });

    navigate("/ministerios/audio/schedule");
  }

  return (
    <MinistryPageWrapper title="Criar Escala — Ministério de Áudio">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl bg-white rounded shadow p-6 space-y-4"
      >
        {!canEdit && (
          <p className="text-sm text-gray-500">
            Visualização somente leitura
          </p>
        )}

        <div>
          <label className="block text-sm font-medium">Data</label>
          <input
            type="date"
            className="input input-bordered w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            disabled={!canEdit}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Culto</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={cult}
            onChange={(e) => setCult(e.target.value)}
            required
            disabled={!canEdit}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Função</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            disabled={!canEdit}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Membro</label>
          <select
            className="select select-bordered w-full"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            required
            disabled={!canEdit}
          >
            <option value="">Selecione um membro</option>
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Observações</label>
          <textarea
            className="textarea textarea-bordered w-full"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={!canEdit}
          />
        </div>

        <div className="flex gap-3">
          {canEdit && (
            <button type="submit" className="btn btn-primary">
              Salvar Escala
            </button>
          )}

          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </MinistryPageWrapper>
  );
}
