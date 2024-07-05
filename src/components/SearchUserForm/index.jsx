/* eslint-disable react/prop-types */
import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useState } from "react";
import { searchUsers } from "../../services/api";
import { toast } from "sonner";

export function SearchUserForm({ onSearchResults, fetchUsers }) {
  const [searchUser, setSearchUser] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      if (searchUser.trim() === "") {
        fetchUsers();
        onSearchResults([]);
      } else {
        const results = await searchUsers({
          nome_usuario: searchUser,
          email: searchUser,
        });
        onSearchResults(results);

        if (results.length === 0) {
          toast.error("Nenhum usuário encontrado com esse nome ou email.");
          onSearchResults([]);
        }
      }
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      toast.error(
        "Erro ao buscar usuários. Por favor, tente novamente mais tarde."
      );
    }
  };

  return (
    <SearchFormContainer>
      <input
        type="text"
        placeholder="Busque por usuários"
        value={searchUser}
        onChange={(event) => setSearchUser(event.target.value)}
      />

      <button type="submit" onClick={handleSearch}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}
