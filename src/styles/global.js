import { createGlobalStyle } from "styled-components";
import "./styled-components.d.ts";
export default createGlobalStyle`
  :root {
  font-size: 62.5%;
  }

  *,
  *::before,
  *::after {
  border: none;
  box-sizing: border-box;
  }

  * {
  margin: 0;
  padding: 0;

   
  }
 :focus{
      outline: 0;
      box-shadow: 0 0 0 2px ${({ theme }) => theme.COLORS.BACKGROUND};
    }
  body,
  input,
  button,
  textarea {
    font-size: 1.6rem;
    font-family: 'Roboto Slab', sans-serif;
    outline: none;
    -webkit-font-smoothing: antialiased; /* deixa o contorno da fonte mais suave */
    -moz-osx-font-smoothing: grayscale;
  }
  body{
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
    color: ${({ theme }) => theme.COLORS.LABEL};
  }
  border-style, input, button, textarea {
    font-family: "Inter", serif;
    font-size: 1.6rem;
    outline: none;
    @media(max-width: ${({ theme }) => theme.DEVICE_BREAKPOINTS.MD}){
      font-size: 1.2rem;
    }
  }
  a{
    text-decoration: none;
  }
  button{
    cursor: pointer;
    transition: filter 0.2s;
  }
  button:hover, a:hover{
    filter: brightness(0.9);
  }
  
  ::-webkit-scrollbar {
    width: 0.5rem;
  }
  
  ::-webkit-scrollbar-track {
    background-color: #202024;
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: #09090A;
  }
`;
