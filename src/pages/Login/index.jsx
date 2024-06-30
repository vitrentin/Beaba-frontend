import { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";

import { useAuth } from "../../hooks/auth";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Container, Form } from "./styles";
import Logo from "../../assets/verdeCardImage.svg";
import { EsqueciMinhaSenha } from "../../components/EsqueciMinhaSenhaModal";
import * as Dialog from "@radix-ui/react-dialog";
document.title = `Login`;
export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const { signIn } = useAuth();

  function handleSignIn() {
    signIn({ email, senha });
  }

  return (
    <Container>
      <img src={Logo} alt="Logo da Verdecard" />
      <Form>
        <h2>Email:</h2>
        <Input
          placeholder="email"
          type="text"
          icon={FiMail}
          onChange={(event) => setEmail(event.target.value)}
        />
        {/* <div className="message hidden">Insira um email!</div> */}
        <h2>Senha:</h2>
        <Input
          placeholder="senha"
          type="password"
          icon={FiLock}
          onChange={(event) => setSenha(event.target.value)}
        />
        {/* <div className="message hidden">Insira uma senha!</div> */}
        {/* <div className="message hidden">Email ou senha incorretos!</div> */}
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button id="modal1">Esqueci minha senha</button>
          </Dialog.Trigger>
          <EsqueciMinhaSenha />
        </Dialog.Root>
        <Button role="button" title="Entrar" onClick={handleSignIn} />
      </Form>
    </Container>
  );
}
