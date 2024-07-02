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
  font-size: 2.4rem;
  select {
    padding: 0.8rem 1.2rem;
    font-size: 1.6rem;
    border-radius: 2.5rem;
    background-color: ${({ theme }) => theme.COLORS.BGBUTTON};
    cursor: pointer;
  }

  option {
    background-color: ${({ theme }) => theme.COLORS.BGBUTTON};
    color: ${({ theme }) => theme.COLORS.BACKGROUND_STRONG};
  }

  select:focus {
    outline: none;
    border-color: ${({ theme }) => theme.COLORS.BACKGROUND_STRONG};
  }
  input {
    font-size: 2rem;
  }
  form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  #space {
    margin-top: 1rem;
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
