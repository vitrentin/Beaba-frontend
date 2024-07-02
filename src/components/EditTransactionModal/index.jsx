/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as Dialog from "@radix-ui/react-dialog";
import { RiCloseFill } from "react-icons/ri";
import { CloseButton, Content, Overlay } from "./styles";
import { Button } from "../Button";
import { Input } from "../Input";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { Tag } from "../Tag";

export function EditTransactionModal({ transaction, onEdit }) {
  const [nomeTransacao, setNomeTransacao] = useState("");
  const [descricaoTransacao, setDescricaoTransacao] = useState("");
  const [modules, setModules] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (transaction) {
      setNomeTransacao(transaction.nome_transacao || "");
      setDescricaoTransacao(transaction.descricao_transacao || "");
      setModules(transaction.transacao_modulo || []);
    }
  }, [transaction]);

  const handleEdit = async () => {
    setErrorMessage("");
    const updatedFields = {};
    if (nomeTransacao !== transaction.nome_transacao) {
      updatedFields.nome_transacao = nomeTransacao;
    }
    if (descricaoTransacao !== transaction.descricao_transacao) {
      updatedFields.descricao_transacao = descricaoTransacao;
    }

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
      console.log("Response: ", response.data);
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
  const handleRemoveModule = async (moduleId) => {
    try {
      const token = localStorage.getItem("@beaba:token");
      await api.delete(
        `/transactions/${transaction.id_transacao}/modules/${moduleId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setModules(modules.filter((mod) => mod.modulo.id_modulo !== moduleId));
    } catch (error) {
      console.error("Erro ao remover módulo:", error);
      alert("Erro ao remover módulo.");
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
          <label>Módulos associados:</label>
          <div>
            {modules.map((mod) => (
              <Tag
                key={mod.modulo.id_modulo}
                onRemove={() => handleRemoveModule(mod.modulo.id_modulo)}
              >
                {mod.modulo.nome_modulo}
              </Tag>
            ))}
          </div>
          <Dialog.Close asChild>
            <Button title="Editar" type="submit" onClick={handleEdit} />
          </Dialog.Close>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
