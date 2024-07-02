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
import { EditFunctionModal } from "../../components/EditFunctionModal";
import { DeleteFunctionModal } from "../../components/DeleteFunctionModal";
import { SearchFunctionForm } from "../../components/SearchFunctionForm";
import * as Dialog from "@radix-ui/react-dialog";

const FUNCTIONS_PER_PAGE = 5;

export function Function() {
  document.title = `Gestão de funções`;

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

  const [nome_funcao, setNomeFuncao] = useState("");
  const [descricao_funcao, setDescricaoFuncao] = useState("");
  const [nome_modulo_associado, setNomeModuloAssociado] = useState("");

  const [functions, setFunctions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchResults, setSearchResults] = useState([]);

  function handleSignUp() {
    if (!nome_funcao) {
      return alert("Preencha pelo menos o nome da função!");
    }

    const token = localStorage.getItem("@beaba:token");
    if (!token) {
      return alert("Token não encontrado. Faça login novamente.");
    }

    const functionData = {
      nome_funcao,
      descricao_funcao,
      nome_modulo: nome_modulo_associado || undefined,
    };
    console.log("Enviando dados:", functionData);

    api
      .post("/function", functionData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        alert("Função cadastrada e/ou módulo associado com sucesso!");
        fetchFunctions();
        // setNomeFuncao("");
        // setDescricaoFuncao("");
        setNomeModuloAssociado("");
      })
      .catch((error) => {
        if (error.response) {
          console.error("Erro na resposta do servidor:", error.response.data);
          alert(
            error.response.data.message ||
              "Erro ao cadastrar função e/ou associar módulo"
          );
        } else {
          console.error("Erro na requisição:", error.message);
          alert("Não foi possível cadastrar e/ou associar");
        }
      });
  }

  useEffect(() => {
    fetchFunctions();
  }, []);

  const fetchFunctions = async () => {
    try {
      const token = localStorage.getItem("@beaba:token");
      const response = await api.get("/functions", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setFunctions(response.data);
    } catch (error) {
      console.error("Erro ao buscar funções:", error);
    }
  };

  const offset = currentPage * FUNCTIONS_PER_PAGE;
  const currentPageFunctions = functions.slice(
    offset,
    offset + FUNCTIONS_PER_PAGE
  );
  const pageCount = Math.ceil(functions.length / FUNCTIONS_PER_PAGE);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  const handleDeleteFunction = (deletedFunctionId) => {
    setFunctions(
      functions.filter((functions) => functions.id_funcao !== deletedFunctionId)
    );
  };
  const handleEditFunction = (editFunctionId, updatedFunction) => {
    setFunctions((prevFunctions) =>
      prevFunctions.map((functions) =>
        functions.id_funcao === editFunctionId
          ? { ...functions, ...updatedFunction }
          : functions
      )
    );
  };
  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <Container>
      <Navigation title="Gestão de funções" />
      <Section title="Gestão de funções:">
        <Button
          title="Cadastrar novas funções"
          id="newFunctions"
          onClick={handleFormOpen}
        />
        {isFormOpen && (
          <Form
            ref={modalRef}
            role="dialog"
            aria-label="Cadastrar Função"
            tabIndex={-1}
          >
            <div>
              <h3>Nome da função:</h3>
              <Input
                placeholder="Digite um nome:"
                type="text"
                value={nome_funcao}
                onChange={(event) => setNomeFuncao(event.target.value)}
              />
            </div>
            <div>
              <h3>Descrição da função:</h3>
              <Input
                placeholder="Digite a descrição da função:"
                type="text"
                value={descricao_funcao}
                onChange={(event) => setDescricaoFuncao(event.target.value)}
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

        <h4>Funções existentes:</h4>
        <SearchFunctionForm
          onSearchResults={handleSearchResults}
          fetchFunctions={fetchFunctions}
        />
        <div className="tabela">
          <table id="responsivo">
            <thead>
              <tr>
                <th className="maior">Função</th>
                <th className="maior">Descrição</th>
                <th className="maior">Módulo</th>
                <th className="menor">Editar</th>
                <th className="menor">Excluir</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.length > 0
                ? searchResults.map((functions) => (
                    <tr key={functions.id_funcao}>
                      <td>{functions.nome_funcao}</td>
                      <td>{functions.descricao_funcao}</td>

                      <td>
                        {functions.funcao_modulo
                          .map((modulo) => modulo.modulo.nome_modulo)
                          .join(", ")}
                      </td>
                      <td>
                        <Dialog.Root>
                          <Dialog.Trigger asChild>
                            <button>
                              <img src={editar} alt="Editar" />
                              Editar
                            </button>
                          </Dialog.Trigger>
                          <EditFunctionModal
                            functions={functions}
                            onEdit={handleEditFunction}
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
                          <DeleteFunctionModal
                            functions={functions}
                            onDelete={handleDeleteFunction}
                          />
                        </Dialog.Root>
                      </td>
                    </tr>
                  ))
                : currentPageFunctions.map((functions) => (
                    <tr key={functions.id_funcao}>
                      <td>{functions.nome_funcao}</td>
                      <td>{functions.descricao_funcao}</td>
                      <td>{functions.modules}</td>
                      <td>
                        <Dialog.Root>
                          <Dialog.Trigger asChild>
                            <button>
                              <img src={editar} alt="Editar" />
                              Editar
                            </button>
                          </Dialog.Trigger>
                          <EditFunctionModal
                            functions={functions}
                            onEdit={handleEditFunction}
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
                          <DeleteFunctionModal
                            functions={functions}
                            onDelete={handleDeleteFunction}
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
