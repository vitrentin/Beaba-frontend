/* eslint-disable react/prop-types */
import * as Dialog from "@radix-ui/react-dialog";
import { RiCloseFill } from "react-icons/ri";
import { CloseButton, Content, Overlay } from "./styles";
import { api } from "../../services/api";
export function DeleteTransactionModal({ transaction, onDelete }) {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("@beaba:token");
      await api.delete(`/transactions/${transaction.id_transacao}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      onDelete(transaction.id_transacao);
      alert("Transação excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar transação:", error);
      alert("Erro ao excluir transação");
    }
  };
  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Deletar transação:</Dialog.Title>
        <Dialog.Description>
          Essa transação será excluída, mas, caso necessária, poderá criá-la
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
