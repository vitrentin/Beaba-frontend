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
  #mobile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 2rem;
    gap: 2rem;
    button {
      display: flex;
      align-items: center;
      background-color: transparent;
      color: ${({ theme }) => theme.COLORS.BGBUTTON};
      font-weight: 900;

      font-size: 2.4rem;
      flex-direction: row;
      gap: 2rem;
      font-size: 2rem;
      border: none;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
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
