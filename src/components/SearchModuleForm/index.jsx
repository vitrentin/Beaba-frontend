/* eslint-disable react/prop-types */
import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useState } from "react";
import { searchModules } from "../../services/api";
import { toast } from "sonner";

export function SearchModuleForm({ onSearchResults, fetchModules }) {
  const [searchModule, setSearchModule] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      if (searchModule.trim() === "") {
        fetchModules();
        onSearchResults([]);
      } else {
        const results = await searchModules({
          search_term: searchModule,
        });
        onSearchResults(results);

        if (results.length === 0) {
          toast.error("Nenhum módulo encontrado com esse nome ou descrição.");
          onSearchResults([]);
        }
      }
    } catch (error) {
      console.error("Erro ao buscar módulo:", error);
      toast.error(
        "Erro ao buscar módulos. Por favor, tente novamente mais tarde."
      );
    }
  };

  return (
    <SearchFormContainer>
      <input
        type="text"
        placeholder="Busque por módulos"
        value={searchModule}
        onChange={(event) => setSearchModule(event.target.value)}
      />

      <button type="submit" onClick={handleSearch}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}
