import { Section } from "../../components/Section";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Container, Form, Pages } from "./styles";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { Navigation } from "../../components/Navigation";
import { useEffect, useState, useRef } from "react";
import { api } from "../../services/api";
import editar from "../../assets/Editar.svg";
import excluir from "../../assets/Deletar.svg";
import { EditUserModal } from "../../components/EditUserModal";
import { DeleteUserModal } from "../../components/DeleteUserModal";
import * as Dialog from "@radix-ui/react-dialog";

const USERS_PER_PAGE = 5;

export function User() {
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

  const [nome_usuario, setNomeUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  function handleSignUp() {
    if (!nome_usuario || !email || !senha) {
      return alert("Preencha todos os campos!");
    }

    const token = localStorage.getItem("@beaba:token");
    if (!token) {
      return alert("Token não encontrado. Faça login novamente.");
    }

    const userData = { nome_usuario, email, senha };
    console.log("Enviando dados:", userData);

    api
      .post("/users", userData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        alert("Usuário cadastrado com sucesso!");
        fetchUsers();
        setNomeUsuario("");
        setEmail("");
        setSenha("");
      })
      .catch((error) => {
        if (error.response) {
          console.error("Erro na resposta do servidor:", error.response.data);
          alert(error.response.data.message || "Erro ao cadastrar usuário");
        } else {
          console.error("Erro na requisição:", error.message);
          alert("Não foi possível cadastrar");
        }
      });
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("@beaba:token");
      const response = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const offset = currentPage * USERS_PER_PAGE;
  const currentPageUsers = users.slice(offset, offset + USERS_PER_PAGE);
  const pageCount = Math.ceil(users.length / USERS_PER_PAGE);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  const handleDeleteUser = (deletedUserId) => {
    setUsers(users.filter((user) => user.id_usuario !== deletedUserId));
  };
  const handleEditUser = (editUserId, updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id_usuario === editUserId ? { ...user, ...updatedUser } : user
      )
    );
  };

  return (
    <Container>
      <Navigation title="Gestão de usuários" />
      <Section title="Gestão de usuários:">
        <Button
          title="Cadastrar novos usuários"
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
                icon={FiUser}
                value={nome_usuario}
                onChange={(event) => setNomeUsuario(event.target.value)}
              />
            </div>
            <div>
              <h3>Email:</h3>
              <Input
                placeholder="Digite um email:"
                type="email"
                icon={FiMail}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              <h3>Senha:</h3>
              <Input
                placeholder="Digite uma senha:"
                type="password"
                icon={FiLock}
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
              />
            </div>
            <Button id="space" title="Cadastrar" onClick={handleSignUp} />
          </Form>
        )}

        <h4>Usuários existentes:</h4>
        <div className="tabela">
          <table>
            <thead>
              <tr>
                <th className="maior">Nome</th>
                <th className="maior">Email</th>
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
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <button>
                          <img src={editar} alt="Editar" />
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
                          <img src={excluir} alt="Excluir" />
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
