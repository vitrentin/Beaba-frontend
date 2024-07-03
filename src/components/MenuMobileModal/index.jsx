import * as Dialog from "@radix-ui/react-dialog";
import { RiCloseFill } from "react-icons/ri";
import { CloseButton, Content, Overlay } from "./styles";

import {
  RiFileExcel2Line,
  RiHome3Line,
  RiUser3Line,
  RiUserSettingsLine,
  RiToolsFill,
  RiFolderSettingsLine,
  RiFileSettingsLine,
  RiLogoutBoxLine,
} from "react-icons/ri";
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
            <RiHome3Line size={48} />
            Home
          </button>
          <button onClick={() => navigate("/user")}>
            <RiUser3Line size={48} />
            Gestão de usuários
          </button>
          <button onClick={() => navigate("/profile")}>
            <RiUserSettingsLine size={48} />
            Gestão de perfis
          </button>
          <button onClick={() => navigate("/module")}>
            <RiToolsFill size={48} />
            Gestão de módulos
          </button>
          <button onClick={() => navigate("/transaction")}>
            <RiFolderSettingsLine size={48} />
            Gestão de transações
          </button>
          <button onClick={() => navigate("/function")}>
            <RiFileSettingsLine size={48} />
            Gestão de funcões
          </button>
          <button onClick={() => navigate("/reports")}>
            <RiFileExcel2Line size={48} />
            Relatórios
          </button>
          <button onClick={handleLogout}>
            <RiLogoutBoxLine size={48} />
            Logout
          </button>
        </div>
      </Content>
    </Dialog.Portal>
  );
}
