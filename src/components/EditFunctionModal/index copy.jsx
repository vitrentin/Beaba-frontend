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
import { toast } from "sonner";

export function EditFunctionModal({ functions, onEdit }) {
  const [nomeFuncao, setNomeFuncao] = useState("");
  const [descricaoFuncao, setDescricaoFuncao] = useState("");
  const [modules, setModules] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (functions) {
      setNomeFuncao(functions.nome_funcao || "");
      setDescricaoFuncao(functions.descricao_funcao || "");
      setModules(functions.funcao_modulo || []);
    }
  }, [functions]);

  const handleEdit = async () => {
    setErrorMessage("");
    const updatedFields = {};
    if (nomeFuncao !== functions.nome_funcao) {
      updatedFields.nome_funcao = nomeFuncao;
    }
    if (descricaoFuncao !== functions.descricao_funcao) {
      updatedFields.descricao_funcao = descricaoFuncao;
    }

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
      toast.success("Função editada com sucesso!");
    } catch (error) {
      console.error("Erro ao editar função:", error);
      if (error.response) {
        if (
          error.response.status === 400 &&
          error.response.data.error === "Function already in use"
        ) {
          toast.error(
            "Função já está em uso. Por favor, use um nome diferente."
          );
          setNomeFuncao(functions.nome_funcao);
        } else {
          toast.error("Erro ao editar função.");
          setNomeFuncao(functions.nome_funcao);
        }
      } else {
        toast.error("Erro ao editar função.");
        setNomeFuncao(functions.nome_funcao);
      }
    }
  };
  const handleRemoveModule = async (moduleId) => {
    try {
      const token = localStorage.getItem("@beaba:token");
      await api.delete(
        `/functions/${functions.id_funcao}/modules/${moduleId}`,
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
      toast.error("Erro ao remover módulo.");
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
