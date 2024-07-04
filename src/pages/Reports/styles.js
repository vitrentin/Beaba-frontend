import styled from "styled-components";
import "../../styles/styled-components.d.ts";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  .tabela {
    width: 100%;
    margin: 2rem 0;
    border-collapse: collapse;
    font-size: 2.4rem;
  }

  .responsivo {
    width: 100%;
    border-collapse: collapse;
    font-size: 2.4rem;
  }

  .responsivo th,
  .responsivo td {
    border: 1px solid ${({ theme }) => theme.COLORS.BACKGROUND_STRONG};
    padding: 8px;
  }

  .responsivo th {
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_STRONG};
    color: ${({ theme }) => theme.COLORS.LABEL};
    text-align: left;
  }

  .responsivo tr:hover {
    background-color: #${({ theme }) => theme.COLORS.BACKGROUND_STRONG};
  }

  button {
    background-color: transparent;
    color: ${({ theme }) => theme.COLORS.LABEL};
    padding: 1rem 2rem;
    margin: 4px 2px;
    font-size: 2.4rem;
    border: none;
    border-radius: 2.5rem;
    cursor: pointer;
  }

  button:hover {
    background-color: #${({ theme }) => theme.COLORS.BACKGROUND_STRONG};
  }
  @media (min-width: ${({ theme }) => theme.DEVICE_BREAKPOINTS.MD}) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  > header {
    width: 100%;
    height: 14.5rem;

    background: ${({ theme }) => theme.COLORS.BACKGROUND_STRONG};

    display: flex;
    align-items: center;

    button {
      display: flex;
      justify-content: start;
      background: none;
      border: none;
      margin-top: 2rem;
    }
  }

  button {
    width: 100%;
    padding: 0.5rem 1rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2px;
    background-color: transparent;
  }
`;
