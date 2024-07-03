/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as Dialog from "@radix-ui/react-dialog";
import { RiCloseFill } from "react-icons/ri";
import { CloseButton, Content, Overlay } from "./styles";
import { Button } from "../Button";
import { Input } from "../Input";
import { useState } from "react";
import { api } from "../../services/api";

export function EditModuleModal({ module, onEdit }) {
  const [nomeModulo, setNomeModulo] = useState(module.nome_modulo);
  const [descricaoModulo, setDescricaoModulo] = useState(
    module.descricao_modulo
  );
  const [errorMessage, setErrorMessage] = useState("");
  const handleEdit = async () => {
    setErrorMessage("");
    const updatedFields = {};
    if (nomeModulo !== module.nome_modulo) {
      updatedFields.nome_modulo = nomeModulo;
    }
    if (descricaoModulo !== module.descricao_modulo) {
      updatedFields.descricao_modulo = descricaoModulo;
    }

    try {
      const token = localStorage.getItem("@beaba:token");
      const response = await api.put(
        `/modules/${module.id_modulo}`,
        updatedFields,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response: ", response);
      onEdit(module.id_modulo, updatedFields);
      alert("Módulo editado com sucesso!");
    } catch (error) {
      console.error("Erro ao editar módulo:", error);
      if (error.response) {
        if (
          error.response.status === 400 &&
          error.response.data.error === "Module already in use"
        ) {
          alert("Módulo já está em uso. Por favor, use um nome diferente.");
          setNomeModulo(module.nome_modulo);
          setDescricaoModulo(module.descricao_modulo);
        } else {
          alert("Erro ao editar módulo.");
          setNomeModulo(module.nome_modulo);
          setDescricaoModulo(module.descricao_modulo);
        }
      } else {
        alert("Erro ao editar módulo.");
        setNomeModulo(module.nome_modulo);
        setDescricaoModulo(module.descricao_modulo);
      }
    }
  };

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Editar módulo:</Dialog.Title>
        <Dialog.Description>
          Preencha o dado que deseja editar
        </Dialog.Description>
        <CloseButton
          onClick={() => {
            setNomeModulo(module.nome_modulo);
            setDescricaoModulo(module.descricao_modulo);
          }}
        >
          <RiCloseFill size={24} />
        </CloseButton>

        <form>
          <label>Nome do módulo:</label>
          <Input
            type="text"
            placeholder="Editar nome:"
            value={nomeModulo}
            onChange={(event) => setNomeModulo(event.target.value)}
          />
          <label>Descrição do módulo:</label>
          <Input
            type="text"
            placeholder="Editar descrição:"
            value={descricaoModulo}
            onChange={(event) => setDescricaoModulo(event.target.value)}
          />
          <Dialog.Close asChild>
            <Button title="Editar" type="submit" onClick={handleEdit} />
          </Dialog.Close>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
