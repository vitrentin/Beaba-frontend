/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as Dialog from "@radix-ui/react-dialog";
import { RiCloseFill } from "react-icons/ri";
import { CloseButton, Content, Overlay } from "./styles";
import { Button } from "../Button";
import { Input } from "../Input";
import { useState } from "react";
import { api } from "../../services/api";

export function EditProfileModal({ profile, onEdit }) {
  const [nomePerfil, setNomePerfil] = useState(profile.nome_perfil);
  // const [nomeModulo, setNomeModulo] = useState(profile.nome_modulo);
  const [errorMessage, setErrorMessage] = useState("");
  const handleEdit = async () => {
    setErrorMessage("");
    const updatedFields = {};
    if (nomePerfil !== profile.nome_perfil) {
      updatedFields.nome_perfil = nomePerfil;
    }
    // if (nomeModulo !== profile.nome_modulo) {
    //   updatedFields.nome_modulo = nomeModulo;
    // }

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
      console.log("Response: ", response);
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

          <label>Nome do módulo:</label>
          <Input
            type="text"
            placeholder="Editar módulo:"
            // value={nomeModulo}
            // onChange={(event) => setNomeModulo(event.target.value)}
          />

          <Dialog.Close asChild>
            <Button title="Editar" type="submit" onClick={handleEdit} />
          </Dialog.Close>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
