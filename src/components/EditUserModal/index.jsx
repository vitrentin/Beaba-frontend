/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as Dialog from "@radix-ui/react-dialog";
import { RiCloseFill } from "react-icons/ri";
import { CloseButton, Content, Overlay } from "./styles";
import { Button } from "../Button";
import { Input } from "../Input";
import { useState } from "react";
import { api } from "../../services/api";

export function EditUserModal({ user, onEdit }) {
  const [nomeUsuario, setNomeUsuario] = useState(user.nome_usuario);
  const [email, setEmail] = useState(user.email);
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleEdit = async () => {
    setErrorMessage("");
    const updatedFields = {};
    if (nomeUsuario !== user.nome_usuario) {
      updatedFields.nome_usuario = nomeUsuario;
    }
    if (email !== user.email) {
      updatedFields.email = email;
    }
    if (senha) {
      updatedFields.senha = senha;
    }
    try {
      const token = localStorage.getItem("@beaba:token");
      const response = await api.put(
        `/users/${user.id_usuario}`,
        updatedFields,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response: ", response);
      onEdit(user.id_usuario, updatedFields);
      alert("Usuário editado com sucesso!");
    } catch (error) {
      console.error("Erro ao editar usuário:", error);
      if (error.response) {
        if (
          error.response.status === 400 &&
          error.response.data.error === "Email already in use"
        ) {
          alert("Email já está em uso. Por favor, use um email diferente.");
        } else {
          alert("Erro ao editar usuário.");
        }
      } else {
        alert("Erro ao editar usuário.");
      }
    }
  };

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Editar usuário:</Dialog.Title>
        <Dialog.Description>
          Preencha o dado que deseja editar
        </Dialog.Description>
        <CloseButton>
          <RiCloseFill size={24} />
        </CloseButton>

        <form>
          <label>Nome:</label>
          <Input
            type="text"
            placeholder="Editar nome:"
            value={nomeUsuario}
            onChange={(event) => setNomeUsuario(event.target.value)}
          />

          <label>Email:</label>
          <Input
            type="email"
            placeholder="Editar email:"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label>Senha:</label>
          <Input
            type="password"
            placeholder="Editar senha:"
            onChange={(event) => setSenha(event.target.value)}
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
