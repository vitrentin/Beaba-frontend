/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as Dialog from "@radix-ui/react-dialog";
import { RiCloseFill } from "react-icons/ri";
import { CloseButton, Content, Overlay } from "./styles";
import { Button } from "../Button";
import { Input } from "../Input";
import { useState } from "react";
import { api } from "../../services/api";

export function EditFunctionModal({ functions, onEdit }) {
  const [nomeFuncao, setNomeFuncao] = useState(functions.nome_funcao);
  const [descricaoFuncao, setDescricaoFuncao] = useState(
    functions.descricao_funcao
  );
  // const [nomeModuloAssociado, setNomeModuloAssociado] = useState(
  //   transaction.nome_modulo_associado
  // );
  const [errorMessage, setErrorMessage] = useState("");
  const handleEdit = async () => {
    setErrorMessage("");
    const updatedFields = {};
    if (nomeFuncao !== functions.nome_funcao) {
      updatedFields.nome_funcao = nomeFuncao;
    }
    if (descricaoFuncao !== functions.descricao_funcao) {
      updatedFields.descricao_funcao = descricaoFuncao;
    }
    // if (nomeModuloAssociado !== transaction.nome_modulo_associado) {
    //   updatedFields.nome_modulo_associado = nomeModuloAssociado;
    // }
    try {
      const token = localStorage.getItem("@beaba:token");
      const response = await api.put(
        `/functions/${functions.id_funcao}`,
        updatedFields,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response: ", response);
      onEdit(functions.id_funcao, updatedFields);
      alert("Função editada com sucesso!");
    } catch (error) {
      console.error("Erro ao editar função:", error);
      if (error.response) {
        if (
          error.response.status === 400 &&
          error.response.data.error === "Function already in use"
        ) {
          alert("Função já está em uso. Por favor, use um nome diferente.");
        } else {
          alert("Erro ao editar função.");
        }
      } else {
        alert("Erro ao editar função.");
      }
    }
  };

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Editar função:</Dialog.Title>
        <Dialog.Description>
          Preencha o dado que deseja editar
        </Dialog.Description>
        <CloseButton>
          <RiCloseFill size={24} />
        </CloseButton>

        <form>
          <label>Nome da função:</label>
          <Input
            type="text"
            placeholder="Editar nome:"
            value={nomeFuncao}
            onChange={(event) => setNomeFuncao(event.target.value)}
          />
          <label>Descrição da função:</label>
          <Input
            type="text"
            placeholder="Editar descrição:"
            value={descricaoFuncao}
            onChange={(event) => setDescricaoFuncao(event.target.value)}
          />
          <label>Nome do módulo associado:</label>
          <Input
            type="text"
            placeholder="Editar módulo associado:"
            // value={nomeModuloAssociado}
            // onChange={(event) => setNomeModuloAssociado(event.target.value)}
          />
          <Dialog.Close asChild>
            <Button
              id="space"
              title="Editar"
              type="submit"
              onClick={handleEdit}
            />
          </Dialog.Close>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
