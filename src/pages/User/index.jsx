import { Section } from "../../components/Section";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Container, Form, Pages } from "./styles";
import { Navigation } from "../../components/Navigation";
import { useEffect, useState, useRef } from "react";
import { api } from "../../services/api";
import {
  RiDeleteBin5Line,
  RiEdit2Line,
  RiMailLine,
  RiLock2Line,
  RiUser3Line,
} from "react-icons/ri";
import { EditUserModal } from "../../components/EditUserModal";
import { DeleteUserModal } from "../../components/DeleteUserModal";
import { SearchUserForm } from "../../components/SearchUserForm";
import * as Dialog from "@radix-ui/react-dialog";
import { toast } from "sonner";

const USERS_PER_PAGE = 5;

export function User() {
  useEffect(() => {
    document.title = `Gestão de usuários`;
  }, []);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const modalRef = useRef(null);

  function handleFormOpen() {
    setIsFormOpen(!isFormOpen);
  }

  useEffect(() => {
    if (isFormOpen) {
      modalRef?.current.focus();
      setNomeUsuario("");
      setEmail("");
      setSenha("");
      setPerfilId(2);
    }
  }, [isFormOpen]);

  const [nome_usuario, setNomeUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [perfil_id, setPerfilId] = useState(2);
  const [perfis, setPerfis] = useState([]);

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchResults, setSearchResults] = useState([]);

  function handleSignUp() {
    if (!nome_usuario || !email || !senha) {
      toast.error("Preencha todos os campos!");
      return;
    }

    const token = localStorage.getItem("@beaba:token");
    if (!token) {
      toast.error("Token não encontrado. Faça login novamente.");
      return;
    }

    const userData = { nome_usuario, email, senha, perfil_id };
    console.log("Enviando dados:", userData);

    api
      .post("/users", userData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        toast.success("Usuário cadastrado com sucesso!");
        fetchUsers();
        setNomeUsuario("");
        setEmail("");
        setSenha("");
        setPerfilId(2);
      })
      .catch((error) => {
        if (error.response) {
          console.error("Erro na resposta do servidor:", error.response.data);
          toast.error(
            error.response.data.message || "Erro ao cadastrar usuário"
          );
        } else {
          console.error("Erro na requisição:", error.message);
          toast.error("Não foi possível cadastrar");
        }
      });
  }

  useEffect(() => {
    const storedPage = localStorage.getItem("currentPageUser");
    if (storedPage) {
      setCurrentPage(Number(storedPage));
    }
    fetchPerfis();
    fetchUsers();
  }, []);
  const fetchPerfis = async () => {
    try {
      const token = localStorage.getItem("@beaba:token");
      const response = await api.get("/profiles", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setPerfis(response.data.profilesWithModules);
    } catch (error) {
      console.error("Erro ao buscar perfis:", error);
    }
  };
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("@beaba:token");
      const response = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setUsers(response.data.users);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const offset = currentPage * USERS_PER_PAGE;
  const currentPageUsers =
    searchResults.length > 0
      ? searchResults.slice(offset, offset + USERS_PER_PAGE)
      : users.slice(offset, offset + USERS_PER_PAGE);
  const pageCount = Math.ceil(
    (searchResults.length > 0 ? searchResults.length : users.length) /
      USERS_PER_PAGE
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    localStorage.setItem("currentPageUser", selected);
  };
  const handleDeleteUser = (deletedUserId) => {
    setUsers(users.filter((user) => user.id_usuario !== deletedUserId));
    if (searchResults.length > 0) {
      setSearchResults(
        searchResults.filter((user) => user.id_usuario !== deletedUserId)
      );
    }
  };
  const handleEditUser = (editUserId, updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id_usuario === editUserId ? { ...user, ...updatedUser } : user
      )
    );

    if (searchResults.length > 0) {
      setSearchResults((prevResults) =>
        prevResults.map((user) =>
          user.id_usuario === editUserId ? { ...user, ...updatedUser } : user
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
      <Navigation title="Gestão de usuários" />
      <Section title="Gestão de usuários:">
        <Button
          title={isFormOpen ? "Fechar formulário" : "Cadastrar novos usuários"}
          id="newUsers"
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
              <h3>Nome:</h3>
              <Input
                placeholder="Digite um nome:"
                type="text"
                icon={RiUser3Line}
                value={nome_usuario}
                onChange={(event) => setNomeUsuario(event.target.value)}
                required
              />
            </div>
            <div>
              <h3>Email:</h3>
              <Input
                placeholder="Digite um email:"
                type="email"
                icon={RiMailLine}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div>
              <h3>Senha:</h3>
              <Input
                placeholder="Digite uma senha:"
                type="password"
                icon={RiLock2Line}
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                required
              />
            </div>
            <div>
              <h3>Perfil:</h3>
              <select
                value={perfil_id}
                onChange={(event) => setPerfilId(parseInt(event.target.value))}
              >
                {perfis.map((perfil) => (
                  <option key={perfil.id_perfil} value={perfil.id_perfil}>
                    {perfil.nome_perfil}
                  </option>
                ))}
              </select>
            </div>
            <Button
              id="space"
              title="Cadastrar"
              onClick={handleSignUp}
              aria-label="Cadastrar Usuário"
            />
          </Form>
        )}

        <h4>Usuários existentes:</h4>
        <SearchUserForm
          onSearchResults={handleSearchResults}
          fetchUsers={fetchUsers}
        />

        <div className="tabela">
          <table id="responsivo">
            <thead>
              <tr>
                <th className="maior">Nome</th>
                <th className="maior">Email</th>
                <th className="maior">Perfil</th>
                <th className="menor">Editar</th>
                <th className="menor">Excluir</th>
              </tr>
            </thead>
            <tbody>
              {currentPageUsers.map((user) => (
                <tr key={user.id_usuario}>
                  <td>{user.nome_usuario}</td>
                  <td>{user.email}</td>
                  <td>
                    {perfis.find(
                      (perfil) => perfil.id_perfil === user.perfil_id
                    )?.nome_perfil || ""}
                  </td>
                  <td>
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <button>
                          <RiEdit2Line size={36} />
                          Editar
                        </button>
                      </Dialog.Trigger>
                      <EditUserModal user={user} onEdit={handleEditUser} />
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
                      <DeleteUserModal
                        user={user}
                        onDelete={handleDeleteUser}
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
