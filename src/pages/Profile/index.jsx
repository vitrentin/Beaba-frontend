import { Section } from "../../components/Section";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Container, Form, Pages } from "./styles";
import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";
import { Navigation } from "../../components/Navigation";
import { useEffect, useState, useRef } from "react";
import { api } from "../../services/api";
import { EditProfileModal } from "../../components/EditProfileModal";
import { DeleteProfileModal } from "../../components/DeleteProfileModal";
import { SearchProfileForm } from "../../components/SearchProfileForm";
import * as Dialog from "@radix-ui/react-dialog";
import { toast } from "sonner";

const PROFILES_PER_PAGE = 5;

export function Profile() {
  useEffect(() => {
    document.title = `Gestão de perfis`;
  }, []);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const modalRef = useRef(null);
  const [nome_perfil, setNomePerfil] = useState("");
  const [nome_modulo, setNomeModulo] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchResults, setSearchResults] = useState([]);

  function handleFormOpen() {
    setIsFormOpen(!isFormOpen);
  }

  useEffect(() => {
    if (isFormOpen) {
      modalRef?.current.focus();
      setNomePerfil("");
      setNomeModulo("");
    }
  }, [isFormOpen]);

  function handleSignUp() {
    if (!nome_perfil) {
      toast.error("Preencha pelo menos o nome do perfil!");
      return;
    }

    const token = localStorage.getItem("@beaba:token");
    if (!token) {
      toast.error("Token não encontrado. Faça login novamente.");
      return;
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
        toast.success("Perfil cadastrado e/ou módulo associado com sucesso!");
        fetchProfiles();
        setNomeModulo("");
      })
      .catch((error) => {
        if (error.response) {
          console.error("Erro na resposta do servidor:", error.response.data);
          toast.error(
            error.response.data.message ||
              "Erro ao cadastrar perfil e/ou associar módulo"
          );
        } else {
          console.error("Erro na requisição:", error.message);
          toast.error("Não foi possível cadastrar e/ou associar");
        }
      });
  }

  useEffect(() => {
    const storedPage = localStorage.getItem("currentPageProfile");
    if (storedPage) {
      setCurrentPage(Number(storedPage));
    }
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
      setProfiles(response.data.profilesWithModules);
    } catch (error) {
      console.error("Erro ao buscar perfis:", error);
    }
  };

  const offset = currentPage * PROFILES_PER_PAGE;
  const currentPageProfiles =
    searchResults.length > 0
      ? searchResults.slice(offset, offset + PROFILES_PER_PAGE)
      : profiles.slice(offset, offset + PROFILES_PER_PAGE);
  const pageCount = Math.ceil(
    (searchResults.length > 0 ? searchResults.length : profiles.length) /
      PROFILES_PER_PAGE
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    localStorage.setItem("currentPageProfile", selected);
  };

  const handleDeleteProfile = (deletedProfileId) => {
    setProfiles(
      profiles.filter((profile) => profile.id_perfil !== deletedProfileId)
    );
    if (searchResults.length > 0) {
      setSearchResults(
        searchResults.filter(
          (profile) => profile.id_perfil !== deletedProfileId
        )
      );
    }
  };

  const handleEditProfile = (editProfileId, updatedProfile) => {
    setProfiles((prevProfiles) =>
      prevProfiles.map((profile) =>
        profile.id_perfil === editProfileId
          ? { ...profile, ...updatedProfile }
          : profile
      )
    );
    if (searchResults.length > 0) {
      setSearchResults((prevResults) =>
        prevResults.map((profile) =>
          profile.id_perfil === editProfileId
            ? { ...profile, ...updatedProfile }
            : profile
        )
      );
    }
  };

  const handleModulesUpdate = (profileId, updatedModules) => {
    setProfiles((prevProfiles) =>
      prevProfiles.map((profile) =>
        profile.id_perfil === profileId
          ? { ...profile, perfil_modulo: updatedModules }
          : profile
      )
    );
    if (searchResults.length > 0) {
      setSearchResults((prevResults) =>
        prevResults.map((profile) =>
          profile.id_perfil === profileId
            ? { ...profile, perfil_modulo: updatedModules }
            : profile
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
                required
              />
            </div>
            <div>
              <h3>Módulo que deseja associar:</h3>
              <Input
                placeholder="Opcional"
                type="text"
                value={nome_modulo}
                onChange={(event) => setNomeModulo(event.target.value)}
              />
            </div>
            <Button
              id="space"
              title="Cadastrar"
              onClick={handleSignUp}
              aria-label="Cadastrar Perfil"
            />
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
              {currentPageProfiles.map((profile) => (
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
                          <RiEdit2Line size={36} />
                          Editar
                        </button>
                      </Dialog.Trigger>
                      <EditProfileModal
                        profile={profile}
                        onEdit={handleEditProfile}
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
