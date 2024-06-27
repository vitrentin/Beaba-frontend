import styled from "styled-components";
import "../../styles/styled-components.d.ts";
export const Container = styled.section`
  display: flex;
  flex-direction: column;
  margin: 2.8rem 0;

  > h2 {
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: ${({ theme }) => theme.COLORS.BLACK};

    padding-bottom: 1.6rem;
    margin-bottom: 2.4rem;

    color: ${({ theme }) => theme.COLORS.LABEL};
    font-size: 2.4rem;
    font-weight: 400;
  }

  @media (max-width: ${({ theme }) => theme.DEVICE_BREAKPOINTS.MD}) {
    h2 {
      display: none;
    }
    font-size: 1.6rem;
  }
`;
