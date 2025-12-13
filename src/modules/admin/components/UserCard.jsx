
export default function UserCard({ user, onRoleChange }) {
  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title">{user.nome}</h2>
        <p>
          <b>Email:</b> {user.email}
        </p>

        <label className="font-bold mt-2">Permissão:</label>
        <select
          className="select select-bordered w-full"
          value={user.role}
          onChange={(e) => onRoleChange(user.id, e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="pastor">Pastor</option>
          <option value="lider">Líder</option>
          <option value="obreiro">Obreiro</option>
          <option value="membro">Membro</option>
        </select>
      </div>
    </div>
  );
}
