import styled from "styled-components";
import "../../styles/styled-components.d.ts";
export const Container = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};

  border: none;
  border-radius: 2.5rem;

  padding: 2.2rem;

  > h1 {
    flex: 1;
    text-align: left;
    font-weight: 700;
    font-size: 2.4rem;
    color: ${({ theme }) => theme.COLORS.INPUT_TEXT};
  }

  > footer {
    width: 100%;
    display: flex;
  }
`;
