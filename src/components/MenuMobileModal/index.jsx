import * as Dialog from "@radix-ui/react-dialog";
import { RiCloseFill } from "react-icons/ri";
import { CloseButton, Content, Overlay } from "./styles";
import home from "../../assets/Home.svg";
import users from "../../assets/Gestao_de_usuario.svg";
import perfis from "../../assets/Gestao_de_perfis.svg";
import modulos from "../../assets/Gestao_de_modulos.svg";
import transacoes from "../../assets/Gestao_de_transacoes.svg";
import funcoes from "../../assets/Gestao_de_funcoes.svg";
import logout from "../../assets/Logout.svg";
import { useAuth } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";
export function MenuMobileModal() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const handleLogout = () => {
    signOut();
  };
  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Menu:</Dialog.Title>
        <Dialog.Description></Dialog.Description>
        <CloseButton>
          <RiCloseFill size={24} />
        </CloseButton>
        <div id="mobile">
          <button onClick={() => navigate("/")}>
            <img src={home} alt="" />
            Home
          </button>
          <button onClick={() => navigate("/user")}>
            <img src={users} alt="" />
            Gestão de usuários
          </button>
          <button onClick={() => navigate("/profile")}>
            <img src={perfis} alt="" />
            Gestão de perfis
          </button>
          <button onClick={() => navigate("/module")}>
            <img src={modulos} alt="" />
            Gestão de módulos
          </button>
          <button onClick={() => navigate("/transaction")}>
            <img src={transacoes} alt="" />
            Gestão de transações
          </button>
          <button onClick={() => navigate("/function")}>
            <img src={funcoes} alt="" />
            Gestão de funcões
          </button>
          <button id="logout" onClick={handleLogout}>
            <img src={logout} alt="" />
            Logout
          </button>
        </div>
      </Content>
    </Dialog.Portal>
  );
}
