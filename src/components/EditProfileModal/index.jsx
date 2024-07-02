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

export function EditProfileModal({ profile, onEdit }) {
  const [nomePerfil, setNomePerfil] = useState("");
  const [modules, setModules] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (profile) {
      setNomePerfil(profile.nome_perfil || "");
      setModules(profile.perfil_modulo || []);
    }
  }, [profile]);

  const handleEdit = async () => {
    setErrorMessage("");
    const updatedFields = {};
    if (nomePerfil !== profile.nome_perfil) {
      updatedFields.nome_perfil = nomePerfil;
    }

    try {
      const token = localStorage.getItem("@beaba:token");
      const response = await api.put(
        `/profiles/${profile.id_perfil}`,
        updatedFields,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response: ", response.data);
      onEdit(profile.id_perfil, updatedFields);
      alert("Perfil editado com sucesso!");
    } catch (error) {
      console.error("Erro ao editar perfil:", error);
      if (error.response) {
        if (
          error.response.status === 400 &&
          error.response.data.error === "Profile already in use"
        ) {
          alert("Perfil já está em uso. Por favor, use um nome diferente.");
        } else {
          alert("Erro ao editar perfil.");
        }
      } else {
        alert("Erro ao editar perfil.");
      }
    }
  };
  const handleRemoveModule = async (moduleId) => {
    try {
      const token = localStorage.getItem("@beaba:token");
      await api.delete(`/profiles/${profile.id_perfil}/modules/${moduleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
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
        <Dialog.Title>Editar perfil:</Dialog.Title>
        <Dialog.Description>
          Preencha o dado que deseja editar
        </Dialog.Description>
        <CloseButton>
          <RiCloseFill size={24} />
        </CloseButton>

        <form>
          <label>Nome do perfil:</label>
          <Input
            type="text"
            placeholder="Editar nome:"
            value={nomePerfil}
            onChange={(event) => setNomePerfil(event.target.value)}
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
