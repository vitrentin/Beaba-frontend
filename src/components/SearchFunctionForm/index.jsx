/* eslint-disable react/prop-types */
import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useState } from "react";
import { searchFunctons } from "../../services/api";

export function SearchFunctionForm({ onSearchResults, fetchFunctions }) {
  const [searchFunction, setSearchFunction] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      if (searchFunction.trim() === "") {
        fetchFunctions();
        onSearchResults([]);
      } else {
        const results = await searchFunctons({
          search_term: searchFunction,
        });
        onSearchResults(results);

        if (results.length === 0) {
          alert("Nenhuma função encontrada com esse nome ou descrição.");
          onSearchResults([]);
        }
      }
    } catch (error) {
      console.error("Erro ao buscar função:", error);
      alert("Erro ao buscar funções. Por favor, tente novamente mais tarde.");
    }
  };

  return (
    <SearchFormContainer>
      <input
        type="text"
        placeholder="Busque por funções"
        value={searchFunction}
        onChange={(event) => setSearchFunction(event.target.value)}
      />

      <button type="submit" onClick={handleSearch}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}
