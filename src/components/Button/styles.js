import styled from "styled-components";
import "../../styles/styled-components.d.ts";
import { Link } from "react-router-dom";

export const Container = styled(Link)`
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
`;
