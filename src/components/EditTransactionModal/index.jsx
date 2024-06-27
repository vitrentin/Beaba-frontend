/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as Dialog from "@radix-ui/react-dialog";
import { RiCloseFill } from "react-icons/ri";
import { CloseButton, Content, Overlay } from "./styles";
import { Button } from "../Button";
import { Input } from "../Input";
import { useState } from "react";
import { api } from "../../services/api";

export function EditTransactionModal({ transaction, onEdit }) {
  const [nomeTransacao, setNomeTransacao] = useState(
    transaction.nome_transacao
  );
  const [descricaoTransacao, setDescricaoTransacao] = useState(
    transaction.descricao_transacao
  );
  // const [nomeModuloAssociado, setNomeModuloAssociado] = useState(
  //   transaction.nome_modulo_associado
  // );
  const [errorMessage, setErrorMessage] = useState("");
  const handleEdit = async () => {
    setErrorMessage("");
    const updatedFields = {};
    if (nomeTransacao !== transaction.nome_transacao) {
      updatedFields.nome_transacao = nomeTransacao;
    }
    if (descricaoTransacao !== transaction.descricao_transacao) {
      updatedFields.descricao_transacao = descricaoTransacao;
    }
    // if (nomeModuloAssociado !== transaction.nome_modulo_associado) {
    //   updatedFields.nome_modulo_associado = nomeModuloAssociado;
    // }
    try {
      const token = localStorage.getItem("@beaba:token");
      const response = await api.put(
        `/transactions/${transaction.id_transacao}`,
        updatedFields,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response: ", response);
      onEdit(transaction.id_transacao, updatedFields);
      alert("Transação editada com sucesso!");
    } catch (error) {
      console.error("Erro ao editar transação:", error);
      if (error.response) {
        if (
          error.response.status === 400 &&
          error.response.data.error === "Transaction already in use"
        ) {
          alert("Transação já está em uso. Por favor, use um nome diferente.");
        } else {
          alert("Erro ao editar transação.");
        }
      } else {
        alert("Erro ao editar transação.");
      }
    }
  };

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Editar transação:</Dialog.Title>
        <Dialog.Description>
          Preencha o dado que deseja editar
        </Dialog.Description>
        <CloseButton>
          <RiCloseFill size={24} />
        </CloseButton>

        <form>
          <label>Nome da transação:</label>
          <Input
            type="text"
            placeholder="Editar nome:"
            value={nomeTransacao}
            onChange={(event) => setNomeTransacao(event.target.value)}
          />
          <label>Descrição da transação:</label>
          <Input
            type="text"
            placeholder="Editar descrição:"
            value={descricaoTransacao}
            onChange={(event) => setDescricaoTransacao(event.target.value)}
          />
          <label>Nome do módulo associado:</label>
          <Input
            type="text"
            placeholder="Editar módulo associado:"
            // value={nomeModuloAssociado}
            // onChange={(event) => setNomeModuloAssociado(event.target.value)}
          />
          <Dialog.Close asChild>
            <Button title="Editar" type="submit" onClick={handleEdit} />
          </Dialog.Close>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
