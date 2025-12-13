
import { Link } from "react-router-dom";

export default function MinisterioCard({ ministerio }) {
  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title">{ministerio.nome}</h2>
        <p>
          <b>Líder:</b> {ministerio.lider}
        </p>
        <p>
          <b>Membros:</b> {ministerio.membros.length}
        </p>

        <Link to={`/escalas/${ministerio.id}`} className="btn btn-primary mt-3">
          Ver Escala
        </Link>
      </div>
    </div>
  );
}
