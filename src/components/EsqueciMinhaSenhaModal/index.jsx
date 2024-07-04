import * as Dialog from "@radix-ui/react-dialog";
import { RiCloseFill } from "react-icons/ri";
import { CloseButton, Content, Overlay } from "./styles";
import { Button } from "../Button";
import { Input } from "../Input";
import { useState } from "react";
import { api } from "../../services/api";

export function EsqueciMinhaSenha() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const checkEmailExists = async () => {
    try {
      const response = await api.post("/emails", { email });
      const result = response.data;

      return result.exists;
    } catch (error) {
      console.error("Falha ao verificar o email:", error);
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    const emailExists = await checkEmailExists();

    if (!emailExists) {
      setError("Email não encontrado");
      return;
    }

    const response = await fetch("http://localhost:5000/api/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      setSuccessMessage("Email enviado com sucesso");
      console.log("Email enviado com sucesso");
    } else {
      console.error("Falha ao enviar o email");
    }
  };

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Email para redefinir a senha:</Dialog.Title>

        <CloseButton>
          <RiCloseFill size={24} />
        </CloseButton>

        <form>
          <Dialog.Description>Email:</Dialog.Description>
          <Input
            placeholder="Insira seu email:"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          {error && <p style={{ color: "white" }}>{error}</p>}
          {successMessage && <p style={{ color: "white" }}>{successMessage}</p>}
          <Dialog.Close asChild>
            <Button title="Enviar" type="submit" onClick={handleSubmit} />
          </Dialog.Close>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
