import styled from "styled-components";
import "../../styles/styled-components.d.ts";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 2rem;
  justify-content: center;
  align-items: center;
  .voltar {
    cursor: pointer;
    position: absolute;
    top: 4rem;
    left: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: transparent;
    color: ${({ theme }) => theme.COLORS.INPUT_TEXT};
    border: none;
    padding: 0;
    font-weight: 900;
  }
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 20rem;
  @media (max-width: ${({ theme }) => theme.DEVICE_BREAKPOINTS.MD}) {
    padding: 0 6rem;
  }
  justify-content: center;
  gap: 1rem;

  align-self: stretch;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  color: ${({ theme }) => theme.COLORS.LABEL};
  img {
    width: 38rem;
    height: 18rem;
  }
  #space {
    margin-top: 2rem;
  }
  button {
    background-color: ${({ theme }) => theme.COLORS.BGBUTTON};
    color: ${({ theme }) => theme.COLORS.BACKGROUND};
    display: flex;
    padding: 0.8rem 1.6rem;
    align-items: center;
    align-self: stretch;
    border-radius: 2.5rem;
    text-align: center;
    justify-content: center;
    font-size: 3.2rem;
    &:disabled {
      opacity: 0.5;
    }
    @media (max-width: ${({ theme }) => theme.DEVICE_BREAKPOINTS.MD}) {
      font-size: 2.4rem;
    }
  }
  > h2 {
    font-size: 3.6rem;
    display: flex;
    align-self: stretch;
    @media (max-width: ${({ theme }) => theme.DEVICE_BREAKPOINTS.MD}) {
      font-size: 2.4rem;
    }
  }
  @media (max-width: ${({ theme }) => theme.DEVICE_BREAKPOINTS.MD}) {
    font-size: 1.6rem;
  }
`;
