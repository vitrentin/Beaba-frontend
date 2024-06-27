import { Section } from "../../components/Section";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Container, Form, Pages } from "./styles";
// import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { Navigation } from "../../components/Navigation";
import { useEffect, useState, useRef } from "react";
import { api } from "../../services/api";
import editar from "../../assets/Editar.svg";
import excluir from "../../assets/Deletar.svg";
import { EditTransactionModal } from "../../components/EditTransactionModal";
import { DeleteTransactionModal } from "../../components/DeleteTransactionModal";

import * as Dialog from "@radix-ui/react-dialog";

const TRANSACTIONS_PER_PAGE = 5;

export function Transaction() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const modalRef = useRef(null);

  function handleFormOpen() {
    setIsFormOpen(!isFormOpen);
  }

  useEffect(() => {
    if (isFormOpen) {
      modalRef?.current.focus();
    }
  }, [isFormOpen]);

  const [nome_transacao, setNomeTransacao] = useState("");
  const [descricao_transacao, setDescricaoTransacao] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [nome_modulo_associado, setNomeModuloAssociado] = useState("");

  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  function handleSignUp() {
    if (!nome_transacao) {
      return alert("Preencha pelo menos o nome do módulo!");
    }

    const token = localStorage.getItem("@beaba:token");
    if (!token) {
      return alert("Token não encontrado. Faça login novamente.");
    }

    const transactionData = { nome_transacao, descricao_transacao };
    console.log("Enviando dados:", transactionData);

    api
      .post("/transactions", transactionData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        alert("Transação cadastrada com sucesso!");
        fetchTransactions();
        setNomeTransacao("");
        setDescricaoTransacao("");
        setNomeModuloAssociado("");
      })
      .catch((error) => {
        if (error.response) {
          console.error("Erro na resposta do servidor:", error.response.data);
          alert(error.response.data.message || "Erro ao cadastrar transação");
        } else {
          console.error("Erro na requisição:", error.message);
          alert("Não foi possível cadastrar");
        }
      });
  }

  useEffect(() => {
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
      setTransactions(response.data);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    }
  };

  const offset = currentPage * TRANSACTIONS_PER_PAGE;
  const currentPageTransactions = transactions.slice(
    offset,
    offset + TRANSACTIONS_PER_PAGE
  );
  const pageCount = Math.ceil(transactions.length / TRANSACTIONS_PER_PAGE);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  const handleDeleteTransaction = (deletedTransactionId) => {
    setTransactions(
      transactions.filter(
        (transaction) => transaction.id_transacao !== deletedTransactionId
      )
    );
  };
  const handleEditTransaction = (editTransactionId, updatedTransaction) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction.id_transacao === editTransactionId
          ? { ...transaction, ...updatedTransaction }
          : transaction
      )
    );
  };

  return (
    <Container>
      <Navigation title="Gestão de transações" />
      <Section title="Gestão de transações:">
        <Button
          title="Cadastrar novas transações"
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
              />
            </div>
            <div>
              <h3>Descrição da transação:</h3>
              <Input
                placeholder="Digite a descrição da transação:"
                type="text"
                value={descricao_transacao}
                onChange={(event) => setDescricaoTransacao(event.target.value)}
              />
            </div>
            <div>
              <h3>Nome do módulo associado:</h3>
              <Input
                placeholder="Digite o nome do módulo:"
                type="text"
                value={nome_modulo_associado}
                onChange={(event) => setNomeModuloAssociado(event.target.value)}
              />
            </div>
            <Button id="space" title="Cadastrar" onClick={handleSignUp} />
          </Form>
        )}

        <h4>Transações existentes:</h4>
        <div className="tabela">
          <table>
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
                  <td>{transaction.nome_modulo_associado}</td>
                  <td>
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <button>
                          <img src={editar} alt="Editar" />
                          Editar
                        </button>
                      </Dialog.Trigger>
                      <EditTransactionModal
                        transaction={transaction}
                        onEdit={handleEditTransaction}
                      />
                    </Dialog.Root>
                  </td>
                  <td>
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <button>
                          <img src={excluir} alt="Excluir" />
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
