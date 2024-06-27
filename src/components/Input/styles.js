import styled from "styled-components";
import "../../styles/styled-components.d.ts";
export const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 1.6rem 3.2rem;
  @media (max-width: ${({ theme }) => theme.DEVICE_BREAKPOINTS.MD}) {
    padding: 0.8rem 1.6rem;
  }
  align-items: center;
  gap: 1rem;
  align-self: stretch;

  background-color: ${({ theme }) => theme.COLORS.BGBUTTON};
  color: ${({ theme }) => theme.COLORS.IMAGE_INPUT};

  border-radius: 2.5rem;

  > input {
    border-radius: 2.5rem;
    outline: none;
    width: 100%;

    &::placeholder {
      padding-left: 1rem;
      color: ${({ theme }) => theme.COLORS.BACKGROUND_STRONG};
    }
    background-color: transparent;

    font-size: 2.4rem;
    @media (max-width: ${({ theme }) => theme.DEVICE_BREAKPOINTS.MD}) {
      font-size: 2rem;
    }
  }
`;
