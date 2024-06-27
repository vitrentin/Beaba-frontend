import styled from "styled-components";
import "../../styles/styled-components.d.ts";
import { DEVICE_BREAKPOINTS } from "../../styles/deviceBreakpoints.js";
export const Container = styled.span`
  font-size: 1.6rem;
  padding: 0.5rem 1.4rem;
  border-radius: 0.5rem 0.4rem;
  margin-right: 0.6rem;
  color: ${({ theme }) => theme.COLORS.INPUT_TEXT};
  background-color: ${({ theme }) => theme.COLORS.BGBUTTON};
  @media (max-width: ${DEVICE_BREAKPOINTS.MD}) {
    font-size: 1.2rem;
  }
`;
