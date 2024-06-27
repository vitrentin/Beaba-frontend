import styled from "styled-components";
import "../../styles/styled-components.d.ts";
export const Container = styled.div`
  width: 100%;

  display: flex;
  padding-bottom: 2rem;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  color: ${({ theme }) => theme.COLORS.LABEL};
  #buttons {
    display: flex;
    padding: 0 8rem;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    align-self: stretch;
  }
  h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    text-align: center;
    padding: 0 2rem;
    font-size: 4rem;
  }
  @media (max-width: ${({ theme }) => theme.DEVICE_BREAKPOINTS.MD}) {
    h1 {
      font-size: 2.4rem;
    }
    #buttons {
      padding: 0 4rem;
      font-size: 1.6rem;
    }
  }
`;
