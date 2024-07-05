import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Container } from "./styles";
import { useEffect } from "react";
export function Home() {
  useEffect(() => {
    document.title = `Home`;
  }, []);
  return (
    <Container>
      <Header />
      <h1>Sistema de Gerenciamento de Acesso</h1>
      <div id="buttons">
        <Button title="Gestão de Usuários" to="/user" />
        <Button title="Gestão de Perfis" to="/profile" />
        <Button title="Gestão de Módulos" to="/module" />
        <Button title="Gestão de Transações" to="/transaction" />
        <Button title="Gestão de Funções" to="/function" />
        <Button title="Relatórios" to="/reports" />
      </div>
    </Container>
  );
}
