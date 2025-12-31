import { useSelector } from "react-redux";
import { useAuthContext } from "../../../auth/context/AuthContext";

export default function AudioScheduleList({ schedules, onEdit }) {
  // ✅ CORREÇÃO: usar membros vinculados ao ministério de áudio
  const members = useSelector(
    (state) => state.membersGlobal.byMinistry.audio || []
  );

  const { user } = useAuthContext();

  const canEdit =
    user?.role === "admin" ||
    user?.role === "pastor" ||
    user?.role === "lider";

  if (!schedules || schedules.length === 0) {
    return (
      <p className="p-4 text-gray-500">
        Nenhuma escala encontrada para este mês.
      </p>
    );
  }

  const getMemberName = (memberId) => {
    if (!memberId) return "—";
    const member = members.find((m) => m.id === memberId);
    return member ? member.name : "—";
  };

  const renderStatus = (status) => {
    if (status === "confirmed") {
      return (
        <span className="text-green-600 font-medium">
          ✅ Confirmado
        </span>
      );
    }

    if (status === "pending") {
      return (
        <span className="text-orange-600 font-medium">
          ⚠️ Pendente
        </span>
      );
    }

    return (
      <span className="text-red-600 font-medium">
        ❌ Não escalado
      </span>
    );
  };

  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border">Data</th>
            <th className="p-3 border">Culto</th>
            <th className="p-3 border">Função</th>
            <th className="p-3 border">Membro</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border text-center">Ações</th>
          </tr>
        </thead>

        <tbody>
          {schedules.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-gray-50 transition"
            >
              <td className="p-3 border">{item.date}</td>
              <td className="p-3 border">{item.cult}</td>
              <td className="p-3 border">{item.role}</td>
              <td className="p-3 border font-medium">
                {getMemberName(item.memberId)}
              </td>
              <td className="p-3 border">
                {renderStatus(item.status)}
              </td>

              <td className="p-3 border text-center">
                {canEdit ? (
                  <button
                    onClick={() => onEdit(item.id)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Editar
                  </button>
                ) : (
                  <span className="text-xs text-gray-400">
                    —
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
