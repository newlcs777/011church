
import { useState } from "react";
import { getUsuarios, updateUserRole } from "../services/usersService";
import UserCard from "../components/UserCard";
import useAuth from "../../auth/hooks/useAuth";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [usuarios, setUsuarios] = useState(getUsuarios());

  if (user.role !== "admin")
    return <p className="p-4">Acesso negado. Apenas administradores.</p>;

  const handleRoleChange = (id, newRole) => {
    updateUserRole(id, newRole);
    setUsuarios([...getUsuarios()]);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Painel Administrativo</h1>
      <p className="opacity-70">Gerencie permissões de usuários</p>

      <div className="flex flex-col gap-4 mt-4">
        {usuarios.map((u) => (
          <UserCard key={u.id} user={u} onRoleChange={handleRoleChange} />
        ))}
      </div>
    </div>
  );
}
