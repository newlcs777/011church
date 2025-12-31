import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchAulasByCurso } from "../store/aulasThunks";
import AulaCard from "../components/AulaCard";

export default function AulaList({ canEdit = false, onEdit }) {
  // rota: /cursos/:id
  const { id: cursoId } = useParams();
  const dispatch = useDispatch();

  const { items = [], loading } = useSelector(
    (state) => state.aulas || {}
  );

  useEffect(() => {
    if (!cursoId) return;
    dispatch(fetchAulasByCurso(cursoId));
  }, [cursoId, dispatch]);

  if (loading) {
    return (
      <p
        className="
          text-sm
          text-base-content/60
          text-center
          py-4
        "
      >
        Carregando aulas…
      </p>
    );
  }

  if (!items.length) {
    return (
      <p
        className="
          text-sm
          text-base-content/60
          text-center
          py-4
        "
      >
        Nenhuma aula cadastrada.
      </p>
    );
  }

  return (
    <div
      className="
        flex
        flex-col
        gap-3
        sm:gap-4
      "
    >
      {[...items]
        .sort(
          (a, b) =>
            (Number(a.ordem) ?? 0) - (Number(b.ordem) ?? 0)
        )
        .map((aula) => (
          <AulaCard
            key={aula.id}
            aula={aula}
            canEdit={canEdit}
            onEdit={onEdit}
          />
        ))}
    </div>
  );
}
