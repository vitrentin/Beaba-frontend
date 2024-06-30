/* eslint-disable react/prop-types */
import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useState } from "react";
import { searchTransactions } from "../../services/api";

export function SearchTransactionForm({ onSearchResults, fetchTransactions }) {
  const [searchTransaction, setSearchTransaction] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      if (searchTransaction.trim() === "") {
        fetchTransactions();
        onSearchResults([]);
      } else {
        const results = await searchTransactions({
          search_term: searchTransaction,
        });
        onSearchResults(results);

        if (results.length === 0) {
          alert("Nenhuma transação encontrada com esse nome ou descrição.");
          onSearchResults([]);
        }
      }
    } catch (error) {
      console.error("Erro ao buscar transação:", error);
      alert(
        "Erro ao buscar transações. Por favor, tente novamente mais tarde."
      );
    }
  };

  return (
    <SearchFormContainer>
      <input
        type="text"
        placeholder="Busque por transações"
        value={searchTransaction}
        onChange={(event) => setSearchTransaction(event.target.value)}
      />

      <button type="submit" onClick={handleSearch}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}
