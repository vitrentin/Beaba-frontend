import styled from "styled-components";
import "../../styles/styled-components.d.ts";
export const Container = styled.header`
  grid-area: header;

  height: 10.5rem;
  width: 100%;

  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme }) => theme.COLORS.BLACK};
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_STRONG};
  display: flex;
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.DEVICE_BREAKPOINTS.MD}) {
    padding: 0 2rem;
  }
  @media (min-width: ${({ theme }) => theme.DEVICE_BREAKPOINTS.LG}) {
    padding: 0 6rem;
  }
`;
export const Profile = styled.div`
  display: flex;
  align-items: center;

  > img {
    width: 20rem;
    height: 20rem;
  }
  @media (max-width: ${({ theme }) => theme.DEVICE_BREAKPOINTS.MD}) {
    img {
      display: none;
    }
  }
  > div {
    display: flex;
    flex-direction: column;
    margin-left: 1.6rem;
    line-height: 2.4rem;
    color: ${({ theme }) => theme.COLORS.LABEL};
    span {
      font-size: 3.2rem;
      margin-bottom: 2rem;
    }
    strong {
      margin-left: 2rem;
      font-size: 3rem;
      color: ${({ theme }) => theme.COLORS.INPUT_TEXT};
    }
  }
`;

export const Logout = styled.button`
  border: none;
  background: none;
  margin-right: 2rem;

  > svg {
    color: ${({ theme }) => theme.COLORS.INPUT_TEXT};
    font-size: 3.6rem;
  }
  @media (max-width: ${({ theme }) => theme.DEVICE_BREAKPOINTS.MD}) {
    font-size: 1.6rem;
  }
`;
