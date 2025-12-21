import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchPeople,
  updatePerson,
  deletePerson,
} from "../store/peopleThunks";

import PageHeader from "@/components/ui/PageHeader";
import PersonCard from "../components/PersonCard";

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
    <div className="flex flex-col gap-6 pb-6">
      <PageHeader
        title="Pessoas cadastradas"
        subtitle="Visitantes e membros registrados no sistema."
      />

      {loading && (
        <p className="text-sm text-base-content/60">
          Carregando pessoas...
        </p>
      )}

      {!loading && list.length === 0 && (
        <p className="text-sm text-base-content/60">
          Nenhuma pessoa cadastrada até o momento.
        </p>
      )}

      {!loading && list.length > 0 && (
        <div className="flex flex-col gap-3">
          {list.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
