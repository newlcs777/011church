// src/modules/bible/components/SearchVerse.jsx
import { useState } from "react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

export default function SearchVerse({ onSearch }) {
  const [query, setQuery] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (query.trim().length < 3) return;
    onSearch(query);
  };

  return (
    <form
      onSubmit={submit}
      className="
        w-full
        flex
        flex-col
        gap-3
        md:flex-row
        md:items-end
      "
    >
      <div className="flex-1 w-full">
        <Input
          label="Buscar passagem"
          placeholder="Ex: João 3:16"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <Button
        type="submit"
        className="
          w-full        /* mobile */
          md:w-32       /* desktop */
        "
      >
        Buscar
      </Button>
    </form>
  );
}
