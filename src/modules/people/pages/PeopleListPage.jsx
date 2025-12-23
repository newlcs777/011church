import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
  fetchPeople,
  updatePerson,
  deletePerson,
} from "../store/peopleThunks";

import PageHeader from "@/components/ui/PageHeader";
import PersonCard from "../components/PersonCard";
import PersonCardSkeleton from "../components/PersonCardSkeleton";

export default function PeopleListPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { list, loading } = useSelector(
    (state) => state.people
  );

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    dispatch(fetchPeople());
  }, [dispatch]);

  /**
   * 🔔 Recebe mensagem de sucesso vinda do redirect
   */
  useEffect(() => {
    if (location.state?.successMessage) {
      setSuccessMessage(location.state.successMessage);

      // limpa o state da rota para não repetir
      navigate(location.pathname, { replace: true });

      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  function handleUpdate(payload) {
    dispatch(updatePerson(payload));
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir esta pessoa?"
    );

    if (confirmed) {
      dispatch(deletePerson(id));
    }
  }

  /**
   * Lista ordenada: último criado no topo
   */
  const orderedList = useMemo(() => {
    return [...list].sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return b.createdAt.seconds - a.createdAt.seconds;
    });
  }, [list]);

  return (
    <div
      className="
        flex
        flex-col
        gap-6
        pb-6
      "
    >
      <PageHeader
        title="Pessoas cadastradas"
        subtitle="Visitantes e membros registrados no sistema."
      />

      {/* 🎉 FEEDBACK DE SUCESSO */}
{successMessage && (
  <div
    className="
      bg-base-100
      border
      border-base-300
      rounded-2xl
      px-4
      py-3
      text-sm
      text-base-content
      flex
      items-center
      gap-2
      shadow-sm
    "
  >
    <span className="text-primary text-xs">
      ✔
    </span>

    <span>
      {successMessage}
    </span>
  </div>
)}


      {/* LOADING */}
      {loading && (
        <section
          className="
            bg-base-100
            rounded-2xl
            border
            border-base-300
            p-4
            sm:p-6
            flex
            flex-col
            gap-3
          "
        >
          <PersonCardSkeleton />
          <PersonCardSkeleton />
          <PersonCardSkeleton />
        </section>
      )}

      {/* EMPTY STATE */}
      {!loading && orderedList.length === 0 && (
        <div
          className="
            bg-base-100
            rounded-2xl
            border
            border-base-300
            p-4
            sm:p-6
            text-sm
            text-base-content/60
          "
        >
          Nenhuma pessoa cadastrada até o momento.
        </div>
      )}

      {/* LISTA */}
      {!loading && orderedList.length > 0 && (
        <section
          className="
            flex
            flex-col
            gap-3
          "
          aria-label="Lista de pessoas"
        >
          {orderedList.map((person, index) => (
            <PersonCard
              key={person.id}
              person={person}
              isLatest={index === 0}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </section>
      )}
    </div>
  );
}
