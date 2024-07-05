import { Section } from "../../components/Section";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Container, Form, Pages } from "./styles";
import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";
import { Navigation } from "../../components/Navigation";
import { useEffect, useState, useRef } from "react";
import { api } from "../../services/api";
import { EditTransactionModal } from "../../components/EditTransactionModal";
import { DeleteTransactionModal } from "../../components/DeleteTransactionModal";
import { SearchTransactionForm } from "../../components/SearchTransactionForm";
import * as Dialog from "@radix-ui/react-dialog";
import { toast } from "sonner";

const TRANSACTIONS_PER_PAGE = 5;

export function Transaction() {
  useEffect(() => {
    document.title = `Gestão de transações`;
  }, []);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const modalRef = useRef(null);
  const [nome_transacao, setNomeTransacao] = useState("");
  const [descricao_transacao, setDescricaoTransacao] = useState("");
  const [nome_modulo_associado, setNomeModuloAssociado] = useState("");

  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchResults, setSearchResults] = useState([]);

  function handleFormOpen() {
    setIsFormOpen(!isFormOpen);
  }

  useEffect(() => {
    if (isFormOpen) {
      modalRef?.current.focus();
      setNomeTransacao("");
      setDescricaoTransacao("");
      setNomeModuloAssociado("");
    }
  }, [isFormOpen]);

  function handleSignUp() {
    if (!nome_transacao) {
      toast.error("Preencha pelo menos o nome da transação!");
      return;
    }

    const token = localStorage.getItem("@beaba:token");
    if (!token) {
      toast.error("Token não encontrado. Faça login novamente.");
      return;
    }

    const transactionData = {
      nome_transacao,
      descricao_transacao,
      nome_modulo: nome_modulo_associado || undefined,
    };
    console.log("Enviando dados:", transactionData);

    api
      .post("/transaction", transactionData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        toast.success(
          "Transação cadastrada com sucesso e/ou módulo associado com sucesso!"
        );

        fetchTransactions();
        // setNomeTransacao("");
        setDescricaoTransacao("");
        setNomeModuloAssociado("");
      })
      .catch((error) => {
        if (error.response) {
          console.error("Erro na resposta do servidor:", error.response.data);
          toast.error(
            error.response.data.message ||
              "Erro ao cadastrar transação e/ou associar módulo"
          );
        } else {
          console.error("Erro na requisição:", error.message);
          toast.error("Não foi possível cadastrar e/ou associar");
        }
      });
  }

  useEffect(() => {
    const storedPage = localStorage.getItem("currentPageTransaction");
    if (storedPage) {
      setCurrentPage(Number(storedPage));
    }
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("@beaba:token");
      const response = await api.get("/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setTransactions(response.data.transactionsWithModules);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    }
  };

  const offset = currentPage * TRANSACTIONS_PER_PAGE;
  const currentPageTransactions =
    searchResults.length > 0
      ? searchResults.slice(offset, offset + TRANSACTIONS_PER_PAGE)
      : transactions.slice(offset, offset + TRANSACTIONS_PER_PAGE);
  const pageCount = Math.ceil(
    (searchResults.length > 0 ? searchResults.length : transactions.length) /
      TRANSACTIONS_PER_PAGE
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    localStorage.setItem("currentPageTransaction", selected);
  };
  const handleDeleteTransaction = (deletedTransactionId) => {
    setTransactions(
      transactions.filter(
        (transaction) => transaction.id_transacao !== deletedTransactionId
      )
    );
    if (searchResults.length > 0) {
      setSearchResults(
        searchResults.filter(
          (transaction) => transaction.id_transacao !== deletedTransactionId
        )
      );
    }
  };
  const handleEditTransaction = (editTransactionId, updatedTransaction) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction.id_transacao === editTransactionId
          ? { ...transaction, ...updatedTransaction }
          : transaction
      )
    );
    if (searchResults.length > 0) {
      setSearchResults((prevResults) =>
        prevResults.map((transaction) =>
          transaction.id_transacao === editTransactionId
            ? { ...transaction, ...updatedTransaction }
            : transaction
        )
      );
    }
  };
  const handleModulesUpdate = (transactionId, updatedModules) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction.id_transacao === transactionId
          ? { ...transaction, transacao_modulo: updatedModules }
          : transaction
      )
    );
    if (searchResults.length > 0) {
      setSearchResults((prevResults) =>
        prevResults.map((transaction) =>
          transaction.id_transacao === transactionId
            ? { ...transaction, transacao_modulo: updatedModules }
            : transaction
        )
      );
    }
  };
  const handleSearchResults = (results) => {
    setSearchResults(results);
    setCurrentPage(0);
  };

  return (
    <Container>
      <Navigation title="Gestão de transações" />
      <Section title="Gestão de transações:">
        <Button
          title={
            isFormOpen ? "Fechar formulário" : "Cadastrar novas transações"
          }
          id="newTransactions"
          onClick={handleFormOpen}
        />
        {isFormOpen && (
          <Form
            ref={modalRef}
            role="dialog"
            aria-label="Cadastrar Transação"
            tabIndex={-1}
          >
            <div>
              <h3>Nome da transação:</h3>
              <Input
                placeholder="Digite um nome:"
                type="text"
                value={nome_transacao}
                onChange={(event) => setNomeTransacao(event.target.value)}
                required
              />
            </div>
            <div>
              <h3>Descrição da transação:</h3>
              <Input
                placeholder="Opcional"
                type="text"
                value={descricao_transacao}
                onChange={(event) => setDescricaoTransacao(event.target.value)}
              />
            </div>
            <div>
              <h3>Nome do módulo associado:</h3>
              <Input
                placeholder="Opcional"
                type="text"
                value={nome_modulo_associado}
                onChange={(event) => setNomeModuloAssociado(event.target.value)}
              />
            </div>
            <Button
              id="space"
              title="Cadastrar"
              onClick={handleSignUp}
              aria-label="Cadastrar Transação"
            />
          </Form>
        )}

        <h4>Transações existentes:</h4>
        <SearchTransactionForm
          onSearchResults={handleSearchResults}
          fetchTransactions={fetchTransactions}
        />
        <div className="tabela">
          <table id="responsivo">
            <thead>
              <tr>
                <th className="maior">Transação</th>
                <th className="maior">Descrição</th>
                <th className="menor">Módulo</th>
                <th className="menor">Editar</th>
                <th className="menor">Excluir</th>
              </tr>
            </thead>
            <tbody>
              {currentPageTransactions.map((transaction) => (
                <tr key={transaction.id_transacao}>
                  <td>{transaction.nome_transacao}</td>
                  <td>{transaction.descricao_transacao}</td>

                  <td>
                    {transaction.transacao_modulo
                      .map((modulo) => modulo.modulo.nome_modulo)
                      .join(", ")}
                  </td>
                  <td>
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <button>
                          <RiEdit2Line size={36} />
                          Editar
                        </button>
                      </Dialog.Trigger>
                      <EditTransactionModal
                        transaction={transaction}
                        onEdit={handleEditTransaction}
                        onModulesUpdate={handleModulesUpdate}
                      />
                    </Dialog.Root>
                  </td>
                  <td>
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <button>
                          <RiDeleteBin5Line size={36} />
                          Excluir
                        </button>
                      </Dialog.Trigger>
                      <DeleteTransactionModal
                        transaction={transaction}
                        onDelete={handleDeleteTransaction}
                      />
                    </Dialog.Root>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pages
          previousLabel={"Anterior"}
          nextLabel={"Próximo"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </Section>
    </Container>
  );
}
