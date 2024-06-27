import styled from "styled-components";
import "../../styles/styled-components.d.ts";
export const Container = styled.button`
  background: none;
  color: ${({ theme, isactive }) =>
    isactive ? theme.COLORS.LABEL : theme.COLORS.INPUT_TEXT};
  border: none;
  font-size: 3.2rem;

  display: flex;
  align-items: center;
  align-self: stretch;
  .message.hidden {
    display: none;
  }
  @media (max-width: ${({ theme }) => theme.DEVICE_BREAKPOINTS.MD}) {
    font-size: 2rem;
  }
`;
