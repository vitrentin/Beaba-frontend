import * as Dialog from "@radix-ui/react-dialog";
import { RiCloseFill } from "react-icons/ri";
import { CloseButton, Content, Overlay } from "./styles";
import { Button } from "../Button";
import { Input } from "../Input";
export function EsqueciMinhaSenha() {
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
          <Input placeholder="Insira seu email:" type="email" />
          <Dialog.Close asChild>
            <Button title="Enviar" type="submit" />
          </Dialog.Close>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
