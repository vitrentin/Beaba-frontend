import { useAuth } from "../../hooks/auth";
import { Container } from "./styles";
import { useNavigate } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { MenuMobileModal } from "../MenuMobileModal";
import {
  RiFileExcel2Line,
  RiHome3Line,
  RiUser3Line,
  RiUserSettingsLine,
  RiToolsFill,
  RiFolderSettingsLine,
  RiFileSettingsLine,
  RiLogoutBoxLine,
  RiMenuLine,
} from "react-icons/ri";
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
            <RiHome3Line size={48} />
            <span>Home</span>
          </button>
          <button onClick={() => navigate("/user")}>
            <RiUser3Line size={48} />
            <span>Gestão de usuários</span>
          </button>
          <button onClick={() => navigate("/profile")}>
            <RiUserSettingsLine size={48} />
            <span>Gestão de perfis</span>
          </button>
          <button onClick={() => navigate("/module")}>
            <RiToolsFill size={48} />
            <span>Gestão de módulos</span>
          </button>
          <button onClick={() => navigate("/transaction")}>
            <RiFolderSettingsLine size={48} />
            <span>Gestão de transações</span>
          </button>
          <button onClick={() => navigate("/function")}>
            <RiFileSettingsLine size={48} />
            <span>Gestão de funcões</span>
          </button>
          <button onClick={() => navigate("/reports")}>
            <RiFileExcel2Line size={48} />
            <span>Relatórios</span>
          </button>
          <button onClick={handleLogout}>
            <RiLogoutBoxLine size={48} />
            <span>Logout</span>
          </button>
        </div>

        <div className="mobile">
          <h1>{title}</h1>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button>
                <RiMenuLine size={48} />
              </button>
            </Dialog.Trigger>
            <MenuMobileModal />
          </Dialog.Root>
        </div>
      </header>
    </Container>
  );
}
