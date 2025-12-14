import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MinistryPageWrapper from "../../components/MinistryPageWrapper";
import { createSchedule } from "../../services/scheduleService";
import { fetchMembers } from "../../store/membersSlice";
import { fetchSchedules } from "../../store/scheduleSlice";

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

  const members = useSelector((state) => state.members.audio || []);

  /* ===============================
     DATA VINDO DO CALENDÁRIO
  ================================ */
  const params = new URLSearchParams(location.search);
  const presetDate = params.get("date");

  const [date, setDate] = useState(presetDate || "");
  const [cult, setCult] = useState("");
  const [role, setRole] = useState("");
  const [memberId, setMemberId] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  /* ===============================
     BUSCA MEMBROS
  ================================ */
  useEffect(() => {
    dispatch(fetchMembers("audio"));
  }, [dispatch]);

  /* ===============================
     SUBMIT
  ================================ */
  async function handleSubmit(e) {
    e.preventDefault();
    if (!canEdit || saving) return;

    if (!date || !cult || !role || !memberId) {
      alert("Preencha data, culto, função e membro.");
      return;
    }

    setSaving(true);

    try {
      const safeDate = date;
      const dateObj = new Date(`${safeDate}T00:00:00`);
      const month = safeDate.slice(0, 7);
      const year = dateObj.getFullYear();

      const payload = {
        date: safeDate,
        month,
        year,
        cult,
        role,
        memberId,
        notes,
        status: "active",
      };

      await createSchedule("audio", payload);

      await dispatch(
        fetchSchedules({
          ministry: "audio",
          month,
        })
      ).unwrap();

      navigate("/ministerios/audio/schedule", { replace: true });
    } catch (err) {
      console.error("Erro ao criar escala:", err);
      alert("Erro ao salvar a escala. Tente novamente.");
    } finally {
      setSaving(false);
    }
  }

  /* ===============================
     RENDER
  ================================ */
  return (
    <MinistryPageWrapper>
      {/* HEADER CENTRALIZADO */}
      <div className="mb-8 flex items-center justify-center relative">
        <button
          onClick={() => navigate(-1)}
          className="
            absolute
            left-0
            h-9
            w-9
            flex
            items-center
            justify-center
            rounded-full
            border
            border-base-300
            bg-base-100
            text-base-content/60
            hover:bg-base-200
            transition
          "
          aria-label="Voltar"
        >
          ←
        </button>

        <div className="text-center">
          <h1 className="text-lg font-semibold">
            Criar Escala
          </h1>
          <p className="text-sm text-base-content/60">
            Ministério de Áudio
          </p>
        </div>
      </div>

      {/* FORM (SEM CARD INTERNO) */}
      <form
        onSubmit={handleSubmit}
        className="
          max-w-xl
          mx-auto
          space-y-4
        "
      >
        {!canEdit && (
          <p className="text-sm text-base-content/60">
            Visualização somente leitura
          </p>
        )}

        {/* DATA */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Data
          </label>
          <input
            type="date"
            className="input input-bordered w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            disabled={!canEdit}
          />
        </div>

        {/* CULTO */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Culto
          </label>
          <select
            className="select select-bordered w-full"
            value={cult}
            onChange={(e) => setCult(e.target.value)}
            required
            disabled={!canEdit}
          >
            <option value="">Selecione o culto</option>
            <option value="manha">Manhã</option>
            <option value="noite">Noite</option>
          </select>
        </div>

        {/* FUNÇÃO */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Função
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            disabled={!canEdit}
          />
        </div>

        {/* MEMBRO */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Membro
          </label>
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

        {/* OBSERVAÇÕES */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Observações
          </label>
          <textarea
            className="textarea textarea-bordered w-full"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={!canEdit}
          />
        </div>

        {/* AÇÕES PADRONIZADAS */}
        <div className="pt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              h-9
              px-4
              rounded-lg
              border
              border-base-300
              bg-base-100
              text-sm
              hover:bg-base-200
              transition
            "
          >
            Cancelar
          </button>

          {canEdit && (
            <button
              type="submit"
              disabled={saving}
              className="
                h-9
                px-4
                rounded-lg
                border
                border-base-300
                bg-base-200
                text-sm
                hover:bg-base-300
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {saving ? "Salvando..." : "Salvar escala"}
            </button>
          )}
        </div>
      </form>
    </MinistryPageWrapper>
  );
}
