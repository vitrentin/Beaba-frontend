import styled from "styled-components";
import "../../styles/styled-components.d.ts";
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
  padding: 3.5rem 3rem;
  background: ${({ theme }) => theme.COLORS.BACKGROUND_STRONG};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  label {
    font-size: 2.4rem;
  }

  form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    > :nth-child(3) {
      margin-top: 1rem;
    }
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
