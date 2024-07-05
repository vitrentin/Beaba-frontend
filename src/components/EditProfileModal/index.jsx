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

export function EditProfileModal({ profile, onEdit, onModulesUpdate }) {
  const [nomePerfil, setNomePerfil] = useState("");
  const [modules, setModules] = useState([]);
  const [removedModules, setRemovedModules] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (profile) {
      setNomePerfil(profile.nome_perfil || "");
      setModules(profile.perfil_modulo || []);
      setRemovedModules([]);
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
      // Update profile name if changed
      if (nomePerfil !== profile.nome_perfil) {
        await api.put(`/profiles/${profile.id_perfil}`, updatedFields, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }

      // Remove modules
      await Promise.all(
        removedModules.map((moduleId) =>
          api.delete(`/profiles/${profile.id_perfil}/modules/${moduleId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
        )
      );

      onEdit(profile.id_perfil, updatedFields);
      onModulesUpdate(profile.id_perfil, modules);
      toast.success("Perfil editado com sucesso!");

      // Clear removed modules list after successful edit
      setRemovedModules([]);
    } catch (error) {
      console.error("Erro ao editar perfil:", error);
      if (error.response) {
        if (
          error.response.status === 400 &&
          error.response.data.error === "Profile already in use"
        ) {
          toast.error(
            "Perfil já está em uso. Por favor, use um nome diferente."
          );
          setNomePerfil(profile.nome_perfil);
        } else {
          toast.error("Erro ao editar perfil.");
          setNomePerfil(profile.nome_perfil);
        }
      } else {
        toast.error("Erro ao editar perfil.");
        setNomePerfil(profile.nome_perfil);
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
        <Dialog.Title>Editar perfil:</Dialog.Title>
        <Dialog.Description>
          Preencha o dado que deseja editar
        </Dialog.Description>
        <CloseButton
          onClick={() => {
            setNomePerfil(profile.nome_perfil);
          }}
        >
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
