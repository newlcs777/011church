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
  user?.role === "lider" ||
  user?.role === "obreiro";



  const members = useSelector((state) => state.members.audio || []);

  /* DATA VINDO DO CALENDÁRIO */
  const params = new URLSearchParams(location.search);
  const presetDate = params.get("date");

  const [date, setDate] = useState(presetDate || "");
  const [cult, setCult] = useState("");
  const [role, setRole] = useState("");
  const [memberId, setMemberId] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchMembers("audio"));
  }, [dispatch]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canEdit || saving) return;

    if (!date || !cult || !role || !memberId) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    setSaving(true);

    try {
      const dateObj = new Date(`${date}T00:00:00`);
      const month = date.slice(0, 7);

      const payload = {
        date,
        month,
        year: dateObj.getFullYear(),
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
      console.error(err);
      alert("Não foi possível salvar a escala. Tente novamente.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <MinistryPageWrapper>
      {/* TÍTULO */}
      <div className="mb-6 text-center">
        <h1 className="text-lg sm:text-xl font-semibold">
          Criar escala
        </h1>
        <p className="mt-1 text-sm text-base-content/60">
          Ministério de Áudio
        </p>
      </div>

      {/* FORMULÁRIO (SEM BORDA / SEM CARD) */}
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto flex flex-col gap-4"
      >
        {!canEdit && (
          <p className="text-xs text-center text-base-content/60">
            Você está visualizando esta escala em modo leitura.
          </p>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">
            Data da escala
          </label>
          <input
            type="date"
            className="input input-bordered w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            disabled={!canEdit}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Culto
          </label>
          <select
            className="select select-bordered w-full"
            value={cult}
            onChange={(e) => setCult(e.target.value)}
            disabled={!canEdit}
            required
          >
            <option value="">Selecione o culto</option>
            <option value="manha">Manhã</option>
            <option value="noite">Noite</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Função na escala
          </label>
          <input
            type="text"
            placeholder="Ex: Operador de som"
            className="input input-bordered w-full"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={!canEdit}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Membro escalado
          </label>
          <select
            className="select select-bordered w-full"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            disabled={!canEdit}
            required
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
          <label className="block text-sm font-medium mb-1">
            Observações (opcional)
          </label>
          <textarea
  rows={3}
  placeholder="Alguma observação importante para este dia?"
  className="
    textarea
    textarea-bordered
    w-full
    resize-none
  "
  value={notes}
  onChange={(e) => setNotes(e.target.value)}
  disabled={!canEdit}
/>

        </div>

        {/* AÇÕES – PADRÃO DO APP */}
        <div className="pt-4 flex flex-col-reverse sm:flex-row justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-lg
              px-4
              py-2.5
              text-sm
              font-medium
              transition
              text-neutral/70
              hover:bg-base-200/70
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
  text-sm
  font-medium
  text-neutral/70
  transition
  hover:bg-base-200/70
  active:scale-[0.98]
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
