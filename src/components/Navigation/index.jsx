import home from "../../assets/Home.svg";
import users from "../../assets/Gestao_de_usuario.svg";
import perfis from "../../assets/Gestao_de_perfis.svg";
import modulos from "../../assets/Gestao_de_modulos.svg";
import transacoes from "../../assets/Gestao_de_transacoes.svg";
import funcoes from "../../assets/Gestao_de_funcoes.svg";
import logout from "../../assets/Logout.svg";
import { useAuth } from "../../hooks/auth";
import { Container } from "./styles";
import { useNavigate } from "react-router-dom";
import menuButton from "../../assets/Menu.svg";
import * as Dialog from "@radix-ui/react-dialog";
import { MenuMobileModal } from "../MenuMobileModal";
// eslint-disable-next-line react/prop-types
export function Navigation({ title }) {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const handleLogout = () => {
    signOut();
  };
  return (
    <Container>
      <header>
        <div className="web">
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
          <button onClick={handleLogout}>
            <img src={logout} alt="" />
            Logout
          </button>
        </div>

        <div className="mobile">
          <h1>{title}</h1>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button>
                <img src={menuButton} alt="Menu" />
              </button>
            </Dialog.Trigger>
            <MenuMobileModal />
          </Dialog.Root>
        </div>
      </header>
    </Container>
  );
}
