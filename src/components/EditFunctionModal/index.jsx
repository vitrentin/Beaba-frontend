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

export function EditFunctionModal({ functions, onEdit, onModulesUpdate }) {
  const [nomeFuncao, setNomeFuncao] = useState("");
  const [descricaoFuncao, setDescricaoFuncao] = useState("");
  const [modules, setModules] = useState([]);
  const [removedModules, setRemovedModules] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (functions) {
      setNomeFuncao(functions.nome_funcao || "");
      setDescricaoFuncao(functions.descricao_funcao || "");
      setModules(functions.funcao_modulo || []);
      setRemovedModules([]);
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
      // Update function name if changed
      if (nomeFuncao !== functions.nome_funcao) {
        await api.put(`/functions/${functions.id_funcao}`, updatedFields, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }

      // Remove modules
      await Promise.all(
        removedModules.map((moduleId) =>
          api.delete(`/functions/${functions.id_funcao}/modules/${moduleId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
        )
      );

      onEdit(functions.id_funcao, updatedFields);
      onModulesUpdate(functions.id_funcao, modules);
      toast.success("Função editada com sucesso!");

      // Clear removed modules list after successful edit
      setRemovedModules([]);
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
          setDescricaoFuncao(functions.descricao_funcao);
        } else {
          toast.error("Erro ao editar função.");
          setNomeFuncao(functions.nome_funcao);
          setDescricaoFuncao(functions.descricao_funcao);
        }
      } else {
        toast.error("Erro ao editar função.");
        setNomeFuncao(functions.nome_funcao);
        setDescricaoFuncao(functions.descricao_funcao);
      }
    }
  };

  const handleRemoveModule = (moduleId) => {
    setRemovedModules((prev) => [...prev, moduleId]);
    setModules((prev) =>
      prev.filter((mod) => mod.modulo.id_modulo !== moduleId)
    );
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
