import * as Dialog from "@radix-ui/react-dialog";
import { RiCloseFill } from "react-icons/ri";
import { CloseButton, Content, Overlay } from "./styles";
import { Button } from "../Button";
import { Input } from "../Input";
import { useState } from "react";

export function EsqueciMinhaSenha() {
  const [email, setEmail] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/api/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
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
          <Dialog.Close asChild>
            <Button title="Enviar" type="submit" onClick={handleSubmit} />
          </Dialog.Close>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
