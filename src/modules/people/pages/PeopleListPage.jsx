import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
  const { list, loading } = useSelector(
    (state) => state.people
  );

  useEffect(() => {
    dispatch(fetchPeople());
  }, [dispatch]);

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
      {!loading && list.length === 0 && (
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
      {!loading && list.length > 0 && (
        <section
          className="
            flex
            flex-col
            gap-3
          "
          aria-label="Lista de pessoas"
        >
          {list.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </section>
      )}
    </div>
  );
}
