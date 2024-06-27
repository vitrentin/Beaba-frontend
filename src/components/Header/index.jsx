import { useState, useEffect } from "react";
import { RiShutDownLine } from "react-icons/ri";
import { Container, Profile, Logout } from "./styles";
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";
import logoVerdeCard from "../../assets/verdeCardImage.svg";
export function Header() {
  const { signOut, token } = useAuth();
  const handleLogout = () => {
    signOut();
  };
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function loadUserData() {
      try {
        const response = await api.get("/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data.user);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    }

    loadUserData();
  }, [token]);

  return (
    <Container>
      <Profile>
        <img src={logoVerdeCard} alt="Logo VerdCard" />
        <div>
          {userData ? (
            <>
              <span>Bem-vindo</span>
              <strong>{userData.nome_usuario}</strong>
            </>
          ) : (
            <span>Carregando...</span>
          )}
        </div>
      </Profile>
      <Logout onClick={handleLogout}>
        <RiShutDownLine aria-label="Logout" />
      </Logout>
    </Container>
  );
}
