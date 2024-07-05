import { Section } from "../../components/Section";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Container, Form, Pages } from "./styles";
import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";
import { Navigation } from "../../components/Navigation";
import { useEffect, useState, useRef } from "react";
import { api } from "../../services/api";
import { EditModuleModal } from "../../components/EditModuleModal";
import { DeleteModuleModal } from "../../components/DeleteModuleModal";
import { SearchModuleForm } from "../../components/SearchModuleForm";
import * as Dialog from "@radix-ui/react-dialog";
import { toast } from "sonner";

const MODULES_PER_PAGE = 5;

export function Module() {
  useEffect(() => {
    document.title = `Gestão de módulos`;
  }, []);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const modalRef = useRef(null);

  function handleFormOpen() {
    setIsFormOpen(!isFormOpen);
  }

  useEffect(() => {
    if (isFormOpen) {
      modalRef?.current.focus();
      setNomeModulo("");
      setDescricaoModulo("");
    }
  }, [isFormOpen]);

  const [nome_modulo, setNomeModulo] = useState("");
  const [descricao_modulo, setDescricaoModulo] = useState("");

  const [modules, setModules] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchResults, setSearchResults] = useState([]);

  function handleSignUp() {
    if (!nome_modulo) {
      toast.error("Preencha pelo menos o nome do módulo!");
      return;
    }

    const token = localStorage.getItem("@beaba:token");
    if (!token) {
      toast.error("Token não encontrado. Faça login novamente.");
      return;
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
        toast.success("Módulo cadastrado com sucesso!");
        fetchModules();
        setNomeModulo("");
        setDescricaoModulo("");
      })
      .catch((error) => {
        if (error.response) {
          console.error("Erro na resposta do servidor:", error.response.data);
          toast.error(
            error.response.data.message || "Erro ao cadastrar módulo"
          );
        } else {
          console.error("Erro na requisição:", error.message);
          toast.error("Não foi possível cadastrar");
        }
      });
  }
  useEffect(() => {
    const storedPage = localStorage.getItem("currentPageModule");
    if (storedPage) {
      setCurrentPage(Number(storedPage));
    }
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
      setModules(response.data.modules);
    } catch (error) {
      console.error("Erro ao buscar módulos:", error);
    }
  };
  const offset = currentPage * MODULES_PER_PAGE;
  const currentPageModules =
    searchResults.length > 0
      ? searchResults.slice(offset, offset + MODULES_PER_PAGE)
      : modules.slice(offset, offset + MODULES_PER_PAGE);
  const pageCount = Math.ceil(
    (searchResults.length > 0 ? searchResults.length : modules.length) /
      MODULES_PER_PAGE
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    localStorage.setItem("currentPageModule", selected);
  };
  const handleDeleteModule = (deletedModuleId) => {
    setModules(
      modules.filter((module) => module.id_modulo !== deletedModuleId)
    );
    if (searchResults.length > 0) {
      setSearchResults(
        searchResults.filter((module) => module.id_modulo !== deletedModuleId)
      );
    }
  };
  const handleEditModule = (editModuleId, updatedModule) => {
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id_modulo === editModuleId
          ? { ...module, ...updatedModule }
          : module
      )
    );
    if (searchResults.length > 0) {
      setSearchResults((prevResults) =>
        prevResults.map((module) =>
          module.id_modulo === editModuleId
            ? { ...module, ...updatedModule }
            : module
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
      <Navigation title="Gestão de módulos" />
      <Section title="Gestão de módulos:">
        <Button
          title={isFormOpen ? "Fechar formulário" : "Cadastrar novos módulos"}
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
                required
              />
            </div>
            <div>
              <h3>Descrição do módulo:</h3>
              <Input
                placeholder="Opcional"
                type="text"
                value={descricao_modulo}
                onChange={(event) => setDescricaoModulo(event.target.value)}
              />
            </div>
            <Button
              id="space"
              title="Cadastrar"
              onClick={handleSignUp}
              aria-label="Cadastrar Módulo"
            />
          </Form>
        )}

        <h4>Módulos existentes:</h4>
        <SearchModuleForm
          onSearchResults={handleSearchResults}
          fetchModules={fetchModules}
        />
        <div className="tabela">
          <table id="responsivo">
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
                          <RiEdit2Line size={36} />
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
                          <RiDeleteBin5Line size={36} />
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
