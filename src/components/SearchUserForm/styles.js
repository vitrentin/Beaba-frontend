import styled from "styled-components";
import "../../styles/styled-components.d.ts";

export const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;
  input {
    flex: 1;
    border-radius: 2.5rem;
    font-size: 2.4rem;
    border: 0;
    background: ${({ theme }) => theme.COLORS.BGBUTTON};
    color: ${({ theme }) => theme.COLORS.BACKGROUND};
    padding: 1rem;
    &::placeholder {
      color: ${({ theme }) => theme.COLORS.BACKGROUND};
    }
  }
  button {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 15%;
    border: 0;
    padding: 1rem;
    background: transparent;
    border: 1px solid ${({ theme }) => theme.COLORS.BLACK};
    color: ${({ theme }) => theme.COLORS.BLACK};
    font-weight: bold;
    border-radius: 1rem;
    &:hover {
      background: ${({ theme }) => theme.COLORS.BACKGROUND_STRONG};
      border-color: ${({ theme }) => theme.COLORS.BLACK};
      color: ${({ theme }) => theme.COLORS.BLACK};
      transition:
        background-color 0.2s,
        color 0.2s,
        border-color 0.2s;
    }
  }
`;
