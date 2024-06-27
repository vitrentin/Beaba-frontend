import styled from "styled-components";
// import { Link } from "react-router-dom";
import "../../styles/styled-components.d.ts";
import { DEVICE_BREAKPOINTS } from "../../styles/deviceBreakpoints.js";
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

  padding: 0 8rem;

  @media (max-width: ${DEVICE_BREAKPOINTS.MD}) {
    font-size: 1.6rem;
  }
`;
export const Profile = styled.div`
  display: flex;
  align-items: center;

  > img {
    width: 5.6rem;
    height: 5.6rem;
    border-radius: 50%;
  }
  > div {
    display: flex;
    flex-direction: column;
    margin-left: 1.6rem;
    line-height: 2.4rem;
    color: ${({ theme }) => theme.COLORS.LABEL};
    span {
      font-size: 1.4rem;
    }
    strong {
      font-size: 1.8rem;
      color: ${({ theme }) => theme.COLORS.INPUT_TEXT};
    }
  }
`;

export const Logout = styled.button`
  border: none;
  background: none;

  > svg {
    color: ${({ theme }) => theme.COLORS.INPUT_TEXT};
    font-size: 3.6rem;
  }
  @media (max-width: ${DEVICE_BREAKPOINTS.MD}) {
    font-size: 1.6rem;
  }
`;
