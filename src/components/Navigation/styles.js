import styled from "styled-components";
import "../../styles/styled-components.d.ts";
export const Container = styled.header`
  display: flex;
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme }) => theme.COLORS.BLACK};
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_STRONG};

  header {
    width: 100%;
  }
  .web {
    display: flex;
    flex-direction: row;
    justify-content: start;
    width: 100%;
    justify-content: space-between;
    > button {
      display: flex;
      flex-direction: column;
      justify-content: start;
      gap: 1rem;
      font-size: 2rem;
      font-weight: 900;

      color: ${({ theme }) => theme.COLORS.BGBUTTON};
    }
  }

  img {
    width: 4.8rem;
  }
  .mobile {
    display: none;
  }

  @media (max-width: ${({ theme }) => theme.DEVICE_BREAKPOINTS.MD}) {
    .web {
      display: none;
    }
    header {
      width: 100%;
    }
    .mobile {
      display: flex;
      gap: 2rem;
      width: 100vw;
      justify-content: space-between;
      padding: 0 6rem;
      button {
        display: flex;
        justify-content: center;
        padding: 0;
        margin: 0;
        width: 5rem;
        border: none;
        background: none;
        color: ${({ theme }) => theme.COLORS.BGBUTTON};
        > img {
          width: 100%;
        }
      }
    }
  }
`;
