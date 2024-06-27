import styled from "styled-components";
import "../../styles/styled-components.d.ts";
export const Container = styled.div`
  display: flex;
  align-items: center;

  background-color: ${({ theme, isNew }) =>
    isNew ? "transparent" : theme.COLORS.BGBUTTON};
  color: ${({ theme }) => theme.COLORS.INPUT_TEXT};

  border: ${({ theme, isNew }) =>
    isNew ? `1px dashed ${theme.COLORS.BLACK}` : "none"};

  border-radius: 2.5rem;
  padding-right: 1.6rem;

  > button {
    border: none;
    background: none;
  }

  .button-delete {
    color: ${({ theme }) => theme.COLORS.MESSAGE};
  }

  .button-add {
    color: ${({ theme }) => theme.COLORS.INPUT_TEXT};
  }

  > input {
    width: 100%;

    padding: 1.2rem;

    color: ${({ theme }) => theme.COLORS.BACKGROUND};
    background: transparent;

    border: none;

    &::placeholder {
      color: ${({ theme }) => theme.COLORS.BACKGROUND_STRONG};
    }
  }
`;
