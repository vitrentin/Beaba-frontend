import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`;

export const Content = styled(Dialog.Content)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 32rem;
  border-radius: 2.5rem;
  padding: 2.5rem 3rem;
  background: ${({ theme }) => theme.COLORS.BACKGROUND};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  div {
    display: flex;
    width: 100%;
    margin-top: 2rem;
    margin-right: 4rem;
    gap: 2rem;
    justify-content: space-between;
  }
  .button {
    display: flex;
    align-items: center;
    align-self: stretch;
    padding: 1rem;
    border-radius: 2.5rem;
    text-align: center;
    justify-content: center;
    font-size: 3.2rem;
    &:disabled {
      opacity: 0.5;
    }
  }
  #deletar {
    background-color: red;
  }
  #cancelar {
    background-color: blue;
  }
`;

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.COLORS.MESSAGE};
`;
