import styled from "styled-components";
import "../../styles/styled-components.d.ts";
import ReactPaginate from "react-paginate";
export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  // Comentar o align itens e resolver as laterais
  align-items: center;
  > header {
    width: 100%;
    height: 14.5rem;

    background: ${({ theme }) => theme.COLORS.BACKGROUND_STRONG};

    display: flex;
    align-items: center;

    button {
      display: flex;
      justify-content: start;
      background: none;
      border: none;
      margin-top: 2rem;
    }
  }
  h3 {
    font-size: 2.4rem;
  }
  #newProfiles {
    margin: 0 4rem;
  }
  h4 {
    display: flex;
    margin-top: 2rem;
    margin-bottom: 1rem;
    margin-left: 6rem;
    font-size: 2.4rem;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
  }

  th,
  td {
    border: 1px solid ${({ theme }) => theme.COLORS.BACKGROUND_STRONG};
    padding: 1rem;
    text-align: left;
  }

  th {
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_STRONG};
  }

  .largura-maior {
    width: 40%;
  }

  .largura-menor {
    width: 10%;
  }

  button {
    width: 100%;
    padding: 0.5rem 1rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2px;
    background-color: transparent;
  }
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 6rem;
  > div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  #space {
    margin-top: 1rem;
  }
`;
export const Pages = styled(ReactPaginate)`
  display: flex;
  flex-direction: row;
  margin-left: 2rem;
  gap: 4rem;
  list-style: none;
`;
