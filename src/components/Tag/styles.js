import styled from "styled-components";
import "../../styles/styled-components.d.ts";
export const Container = styled.div`
  display: inline-block;
  font-size: 1.6rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  margin: 0 0.5rem;
  color: ${({ theme }) => theme.COLORS.BACKGROUND_STRONG};
  background-color: ${({ theme }) => theme.COLORS.BGBUTTON};
  button {
    margin-left: 0.5rem;
    background-color: transparent;
    border: "none";
    cursor: "pointer";
  }
  @media (max-width: ${({ theme }) => theme.DEVICE_BREAKPOINTS.MD}) {
    font-size: 1.2rem;
  }
`;
