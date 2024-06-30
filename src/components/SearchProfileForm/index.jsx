/* eslint-disable react/prop-types */
import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useState } from "react";
import { searchProfiles } from "../../services/api";

export function SearchProfileForm({ onSearchResults, fetchProfiles }) {
  const [searchProfile, setSearchProfile] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      if (searchProfile.trim() === "") {
        fetchProfiles();
        onSearchResults([]);
      } else {
        const results = await searchProfiles({
          nome_perfil: searchProfile,
        });
        onSearchResults(results);

        if (results.length === 0) {
          alert("Nenhum perfil encontrado com esse nome.");
          onSearchResults([]);
        }
      }
    } catch (error) {
      console.error("Erro ao buscar perfis:", error);
      alert("Erro ao buscar perfis. Por favor, tente novamente mais tarde.");
    }
  };

  return (
    <SearchFormContainer>
      <input
        type="text"
        placeholder="Busque por perfis"
        value={searchProfile}
        onChange={(event) => setSearchProfile(event.target.value)}
      />

      <button type="submit" onClick={handleSearch}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}
