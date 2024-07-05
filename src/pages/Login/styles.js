import styled from "styled-components";
import "../../styles/styled-components.d.ts";

export const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 0 20rem;
  @media (max-width: ${({ theme }) => theme.DEVICE_BREAKPOINTS.LG}) {
    padding: 0 10rem;
  }
  @media (max-width: ${({ theme }) => theme.DEVICE_BREAKPOINTS.MD}) {
    padding: 0 6rem;
  }
  @media (max-width: ${({ theme }) => theme.DEVICE_BREAKPOINTS.P}) {
    padding: 0 1rem;
  }
  padding-bottom: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  #modal1 {
    display: inline-flex;
    padding-left: 2rem;
    border: none;
    background-color: transparent;
    color: ${({ theme }) => theme.COLORS.LABEL};
    font-size: 2rem;
  }
`;
export const Form = styled.form`
  display: flex;
  padding: 0 6rem;

  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  align-self: stretch;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  color: ${({ theme }) => theme.COLORS.LABEL};
  img {
    width: 38rem;
    height: 18rem;
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
