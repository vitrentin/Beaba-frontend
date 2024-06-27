import styled from "styled-components";
import "../../styles/styled-components.d.ts";
export const Container = styled.textarea`
  width: 100%;

  background-color: ${({ theme }) => theme.COLORS.BGBUTTON};
  color: ${({ theme }) => theme.COLORS.BACKGROUND};

  border: none;
  resize: none;

  border-radius: 2.5rem;
  padding: 1.6rem;

  &::placeholder {
    color: ${({ theme }) => theme.COLORS.BACKGROUND_STRONG};
  }
`;
