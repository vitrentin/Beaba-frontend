import styled from "styled-components";
import "../../styles/styled-components.d.ts";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  #spaceU {
    margin-top: 1rem;
    margin-left: 2rem;
  }
  #spaceP {
    margin-top: 1rem;
    margin-left: 6.4rem;
  }
  #spaceM {
    margin-top: 1rem;
    margin-left: 3rem;
  }
  #spaceT {
    margin-top: 1rem;
  }
  #spaceF {
    margin-top: 1rem;
    margin-left: 3.2rem;
  }
  .relatorios {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    justify-content: start;
    align-items: center;
  }

  @media (min-width: ${({ theme }) => theme.DEVICE_BREAKPOINTS.MD}) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .quantidade {
    display: flex;
    flex-direction: column;
    gap: 2rem;
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
  p {
    font-size: 2.4rem;
  }
`;
