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
import { EditProfileModal } from "../../components/EditProfileModal";
import { DeleteProfileModal } from "../../components/DeleteProfileModal";
import { SearchProfileForm } from "../../components/SearchProfileForm";
import * as Dialog from "@radix-ui/react-dialog";

const PROFILES_PER_PAGE = 5;

export function Profile() {
  document.title = `Gestão de perfis`;

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

  const [nome_perfil, setNomePerfil] = useState("");
  const [nome_modulo, setNomeModulo] = useState("");

  const [profiles, setProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchResults, setSearchResults] = useState([]);

  function handleSignUp() {
    if (!nome_perfil) {
      return alert("Preencha pelo menos o nome do perfil!");
    }

    const token = localStorage.getItem("@beaba:token");
    if (!token) {
      return alert("Token não encontrado. Faça login novamente.");
    }

    const profileData = { nome_perfil, nome_modulo: nome_modulo || undefined };
    console.log("Enviando dados:", profileData);

    api
      .post("/profile", profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        alert("Perfil cadastrado e/ou módulo associado com sucesso!");
        fetchProfiles();
        setNomeModulo("");
      })
      .catch((error) => {
        if (error.response) {
          console.error("Erro na resposta do servidor:", error.response.data);
          alert(
            error.response.data.message ||
              "Erro ao cadastrar perfil e/ou associar módulo"
          );
        } else {
          console.error("Erro na requisição:", error.message);
          alert("Não foi possível cadastrar e/ou associar");
        }
      });
  }

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const token = localStorage.getItem("@beaba:token");
      const response = await api.get("/profiles", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setProfiles(response.data);
    } catch (error) {
      console.error("Erro ao buscar perfis:", error);
    }
  };

  const offset = currentPage * PROFILES_PER_PAGE;
  const currentPageProfiles = profiles.slice(
    offset,
    offset + PROFILES_PER_PAGE
  );
  const pageCount = Math.ceil(profiles.length / PROFILES_PER_PAGE);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  const handleDeleteProfile = (deletedProfileId) => {
    setProfiles(
      profiles.filter((profile) => profile.id_perfil !== deletedProfileId)
    );
  };
  const handleEditProfile = (editProfileId, updatedProfile) => {
    setProfiles((prevProfiles) =>
      prevProfiles.map((profile) =>
        profile.id_perfil === editProfileId
          ? { ...profile, ...updatedProfile }
          : profile
      )
    );
  };
  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <Container>
      <Navigation title="Gestão de perfis" />
      <Section title="Gestão de perfis:">
        <Button
          title={isFormOpen ? "Fechar formulário" : "Cadastrar novos perfis"}
          id="newProfiles"
          onClick={handleFormOpen}
        />
        {isFormOpen && (
          <Form
            ref={modalRef}
            role="dialog"
            aria-label="Cadastrar Usuários"
            tabIndex={-1}
          >
            <div>
              <h3>Nome do perfil:</h3>
              <Input
                placeholder="Digite um nome:"
                type="text"
                value={nome_perfil}
                onChange={(event) => setNomePerfil(event.target.value)}
              />
            </div>
            <div>
              <h3>Módulo que deseja associar:</h3>
              <Input
                placeholder="Digite o nome do módulo:"
                type="text"
                value={nome_modulo}
                onChange={(event) => setNomeModulo(event.target.value)}
              />
            </div>
            <Button id="space" title="Cadastrar" onClick={handleSignUp} />
          </Form>
        )}

        <h4>Perfis existentes:</h4>
        <SearchProfileForm
          onSearchResults={handleSearchResults}
          fetchProfiles={fetchProfiles}
        />
        <div className="tabela">
          <table id="responsivo">
            <thead>
              <tr>
                <th className="maior">Perfil</th>
                <th className="maior">Módulo associado</th>
                <th className="menor">Editar</th>
                <th className="menor">Excluir</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.length > 0
                ? searchResults.map((profile) => (
                    <tr key={profile.id_perfil}>
                      <td>{profile.nome_perfil}</td>
                      <td>
                        {profile.perfil_modulo
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
                          <EditProfileModal
                            profile={profile}
                            onEdit={handleEditProfile}
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
                          <DeleteProfileModal
                            profile={profile}
                            onDelete={handleDeleteProfile}
                          />
                        </Dialog.Root>
                      </td>
                    </tr>
                  ))
                : currentPageProfiles.map((profile) => (
                    <tr key={profile.id_perfil}>
                      <td>{profile.nome_perfil}</td>
                      <td>{profile.modules}</td>
                      <td>
                        <Dialog.Root>
                          <Dialog.Trigger asChild>
                            <button>
                              <img src={editar} alt="Editar" />
                              Editar
                            </button>
                          </Dialog.Trigger>
                          <EditProfileModal
                            profile={profile}
                            onEdit={handleEditProfile}
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
                          <DeleteProfileModal
                            profile={profile}
                            onDelete={handleDeleteProfile}
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
