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
import { EditModuleModal } from "../../components/EditModuleModal";
import { DeleteModuleModal } from "../../components/DeleteModuleModal";
import * as Dialog from "@radix-ui/react-dialog";

const MODULES_PER_PAGE = 5;

export function Module() {
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

  const [nome_modulo, setNomeModulo] = useState("");
  const [descricao_modulo, setDescricaoModulo] = useState("");

  const [modules, setModules] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  function handleSignUp() {
    if (!nome_modulo) {
      return alert("Preencha pelo menos o nome do módulo!");
    }

    const token = localStorage.getItem("@beaba:token");
    if (!token) {
      return alert("Token não encontrado. Faça login novamente.");
    }

    const moduleData = { nome_modulo, descricao_modulo };
    console.log("Enviando dados:", moduleData);

    api
      .post("/modules", moduleData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        alert("Módulo cadastrado com sucesso!");
        fetchModules();
        setNomeModulo("");
        setDescricaoModulo("");
      })
      .catch((error) => {
        if (error.response) {
          console.error("Erro na resposta do servidor:", error.response.data);
          alert(error.response.data.message || "Erro ao cadastrar módulo");
        } else {
          console.error("Erro na requisição:", error.message);
          alert("Não foi possível cadastrar");
        }
      });
  }
  useEffect(() => {
    fetchModules();
  }, []);
  const fetchModules = async () => {
    try {
      const token = localStorage.getItem("@beaba:token");
      const response = await api.get("/modules", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setModules(response.data);
    } catch (error) {
      console.error("Erro ao buscar módulos:", error);
    }
  };
  const offset = currentPage * MODULES_PER_PAGE;
  const currentPageModules = modules.slice(offset, offset + MODULES_PER_PAGE);
  const pageCount = Math.ceil(modules.length / MODULES_PER_PAGE);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  const handleDeleteModule = (deletedModuleId) => {
    setModules(
      modules.filter((module) => module.id_modulo !== deletedModuleId)
    );
  };
  const handleEditModule = (editModuleId, updatedModule) => {
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id_modulo === editModuleId
          ? { ...module, ...updatedModule }
          : module
      )
    );
  };

  return (
    <Container>
      <Navigation title="Gestão de módulos" />
      <Section title="Gestão de módulos:">
        <Button
          title="Cadastrar novos módulos"
          id="newModules"
          onClick={handleFormOpen}
        />
        {isFormOpen && (
          <Form
            ref={modalRef}
            role="dialog"
            aria-label="Cadastrar Módulos"
            tabIndex={-1}
          >
            <div>
              <h3>Nome do módulo:</h3>
              <Input
                placeholder="Digite um nome:"
                type="text"
                value={nome_modulo}
                onChange={(event) => setNomeModulo(event.target.value)}
              />
            </div>
            <div>
              <h3>Descrição do módulo:</h3>
              <Input
                placeholder="Digite a descrição do módulo:"
                type="text"
                value={descricao_modulo}
                onChange={(event) => setDescricaoModulo(event.target.value)}
              />
            </div>
            <Button id="space" title="Cadastrar" onClick={handleSignUp} />
          </Form>
        )}

        <h4>Módulos existentes:</h4>
        <div className="tabela">
          <table>
            <thead>
              <tr>
                <th className="maior">Módulo</th>
                <th className="maior">Descrição</th>
                <th className="menor">Editar</th>
                <th className="menor">Excluir</th>
              </tr>
            </thead>
            <tbody>
              {currentPageModules.map((module) => (
                <tr key={module.id_modulo}>
                  <td>{module.nome_modulo}</td>
                  <td>{module.descricao_modulo}</td>
                  <td>
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <button>
                          <img src={editar} alt="Editar" />
                          Editar
                        </button>
                      </Dialog.Trigger>
                      <EditModuleModal
                        module={module}
                        onEdit={handleEditModule}
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
                      <DeleteModuleModal
                        module={module}
                        onDelete={handleDeleteModule}
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
