// import { RiShutDownLine } from "react-icons/ri";
// import { useAuth } from "../../hooks/auth";
// import { api } from "../../../../rocketnotes-back/src/services/api";
// import avatarPlaceholder from "../../assets/avatar.svg";
import { Container } from "./styles";
// import { useNavigate } from "react-router-dom";
export function Header() {
  // const { signOut, user } = useAuth();
  // const navigation = useNavigate();
  // function handleSignOut() {
  //   navigation("/");
  //   signOut();
  // }
  // const avatarUrl = user.avatar
  //   ? `${api.defaults.baseURL}/files/${user.avatar}`
  //   : avatarPlaceholder;
  return (
    <Container>
      <div>Home</div>
      <div>Gestão de Usuários</div>
      <div>Gestão de perfis</div>
      <div>Gestão de módulos</div>
      <div>Gestão de transações</div>
      <div>Gestão de funções</div>
      <div>Associação de perfis</div>
      <div>Logout</div>
    </Container>
  );
}
