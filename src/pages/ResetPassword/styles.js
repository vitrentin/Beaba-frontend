import styled from "styled-components";
import "../../styles/styled-components.d.ts";

export const Container = styled.div`
  display: flex;
  width: 100%;
  /* min-width: 500px;
  min-height: 412px; */
  padding-bottom: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Form = styled.form`
  display: flex;
  padding: 0 6rem;

  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  align-self: stretch;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  color: ${({ theme }) => theme.COLORS.LABEL};
  img {
    width: 38rem;
    height: 18rem;
  }
  #space {
    margin-top: 2rem;
  }
  > h2 {
    font-size: 3.6rem;
    display: flex;
    align-self: stretch;
    @media (max-width: ${({ theme }) => theme.DEVICE_BREAKPOINTS.MD}) {
      font-size: 2.4rem;
    }
  }
  @media (max-width: ${({ theme }) => theme.DEVICE_BREAKPOINTS.MD}) {
    font-size: 1.6rem;
  }
`;
