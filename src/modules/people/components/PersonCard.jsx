import { useState } from "react";
import { useNearestDna } from "../hooks/useNearestDna";

import PersonCardView from "./PersonCardView";
import PersonCardEdit from "./PersonCardEdit";

export default function PersonCard({
  person,
  onUpdate,
  onDelete,
}) {
  const [editing, setEditing] = useState(false);

  const nearestDna = useNearestDna(person);

  const whatsappLink =
    person.telefone &&
    `https://wa.me/55${person.telefone.replace(/\D/g, "")}`;

  return (
    <div
      className="
        group
        relative
        rounded-2xl
        border
        border-base-300
        bg-base-100
        p-4
        sm:p-6
        shadow-sm
        transition
        hover:shadow-md
      "
    >
      {/* VIEW */}
      {!editing && (
        <PersonCardView
          person={person}
          nearestDna={nearestDna}
          whatsappLink={whatsappLink}
          onEdit={() => setEditing(true)}
        />
      )}

      {/* EDIT */}
      {editing && (
        <PersonCardEdit
          person={person}
          onSave={(payload) => {
            onUpdate(payload); // ✅ mantém { id, data }
            setEditing(false);
          }}
          onDelete={() => onDelete(person.id)}
          onCancel={() => setEditing(false)}
        />
      )}
    </div>
  );
}
