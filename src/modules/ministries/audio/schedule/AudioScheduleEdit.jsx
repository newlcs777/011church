import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import MinistryPageWrapper from "../../components/MinistryPageWrapper";
import {
  createSchedule,
  getSchedulesByMonth,
} from "../../services/scheduleService";

import {
  fetchMembersByMinistry,
} from "@/modules/members/store/membersSlice";

import { useAuthContext } from "../../../auth/context/AuthContext";

export default function AudioScheduleCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useAuthContext();

  const canEdit =
    user?.role === "admin" ||
    user?.role === "pastor" ||
    user?.role === "lider";

  // ✅ CORREÇÃO: membros vêm do vínculo real do áudio
  const members = useSelector(
    (state) => state.membersGlobal.byMinistry.audio || []
  );

  const [date, setDate] = useState("");
  const [cult, setCult] = useState("");
  const [role, setRole] = useState("");
  const [memberId, setMemberId] = useState("");
  const [notes, setNotes] = useState("");

  const [saving, setSaving] = useState(false);

  const month = date ? date.slice(0, 7) : "";

  // ✅ CORREÇÃO: busca membros vinculados ao áudio
  useEffect(() => {
    dispatch(fetchMembersByMinistry("audio"));
  }, [dispatch]);

  // ===============================
  // SUBMIT
  // ===============================
  async function handleSubmit(e) {
    e.preventDefault();

    if (!canEdit) return;

    if (!date || !cult || !role || !memberId) {
      alert("Preencha data, culto, função e membro.");
      return;
    }

    setSaving(true);

    // 🔒 REGRA: impedir duplicidade da mesma pessoa no mesmo dia
    const existing = await getSchedulesByMonth("audio", month);
    const duplicated = existing.find(
      (s) => s.date === date && s.memberId === memberId
    );

    if (duplicated) {
      alert("Este membro já está escalado para esta data.");
      setSaving(false);
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
      ministry: "audio",
    });

    setSaving(false);
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
          <label>Data</label>
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
          <label>Culto</label>
          <input
            className="input input-bordered w-full"
            value={cult}
            onChange={(e) => setCult(e.target.value)}
            required
            disabled={!canEdit}
          />
        </div>

        <div>
          <label>Função</label>
          <input
            className="input input-bordered w-full"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            disabled={!canEdit}
          />
        </div>

        <div>
          <label>Membro</label>
          <select
            className="select select-bordered w-full"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            required
            disabled={!canEdit}
          >
            <option value="">Selecione</option>
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Observações</label>
          <textarea
            className="textarea textarea-bordered w-full"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={!canEdit}
          />
        </div>

        <div className="flex gap-3">
          {canEdit && (
            <button
              className="btn btn-primary"
              disabled={saving}
            >
              {saving ? "Salvando..." : "Salvar"}
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
