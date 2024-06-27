/* eslint-disable react/prop-types */
import * as Dialog from "@radix-ui/react-dialog";
import { RiCloseFill } from "react-icons/ri";
import { CloseButton, Content, Overlay } from "./styles";
import { api } from "../../services/api";
export function DeleteUserModal({ user, onDelete }) {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("@beaba:token");
      await api.delete(`/users/${user.id_usuario}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      onDelete(user.id_usuario);
      alert("Usuário excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      alert("Erro ao excluir usuário");
    }
  };
  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Deletar usuário:</Dialog.Title>
        <Dialog.Description>
          Esse usuário será excluído, mas, caso necessário, poderá criá-lo
          novamente.
        </Dialog.Description>
        <Dialog.Close asChild>
          <div>
            <button className="button" id="deletar" onClick={handleDelete}>
              Deletar
            </button>
            <button className="button" id="cancelar">
              Cancelar
            </button>
          </div>
        </Dialog.Close>
        <CloseButton>
          <RiCloseFill size={24} />
        </CloseButton>
      </Content>
    </Dialog.Portal>
  );
}
