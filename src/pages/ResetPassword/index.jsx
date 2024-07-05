import { useState, useEffect } from "react";
import { FiLock } from "react-icons/fi";
import { RiArrowLeftLine } from "react-icons/ri";
import { Input } from "../../components/Input";
import { Container, Form } from "./styles";
import Logo from "../../assets/verdeCardImage.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "../../services/api";
import { toast } from "sonner";

export function ResetPassword() {
  useEffect(() => {
    document.title = `Redefinir senha`;
  }, []);
  const navigate = useNavigate();
  const location = useLocation();
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const email = queryParams.get("email");

  const handleResetPassword = async (event) => {
    event.preventDefault();

    if (senha !== confirmarSenha) {
      toast.error(
        "As senhas não coincidem. Por favor, verifique e tente novamente."
      );
      return;
    }

    try {
      const response = await api.post("/reset-password", {
        token,
        email,
        novaSenha: senha,
      });

      if (response.status === 200) {
        toast.success("Senha redefinida com sucesso!");
        navigate("/");
      } else {
        toast.error(`Erro ao redefinir senha: ${response.data.error}`);
      }
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
      toast.error(
        "Erro ao redefinir senha. Por favor, tente novamente mais tarde."
      );
    }
  };

  return (
    <Container>
      <button className="voltar" onClick={() => navigate("/")}>
        <RiArrowLeftLine size={48} />
        Voltar
      </button>

      <img src={Logo} alt="Logo da Verdecard" />
      <Form onSubmit={handleResetPassword}>
        <h2>Nova senha:</h2>
        <Input
          placeholder="Senha"
          type="password"
          icon={FiLock}
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
        />
        <h2>Confirmar nova senha:</h2>
        <Input
          placeholder="Confirmar Senha"
          type="password"
          icon={FiLock}
          value={confirmarSenha}
          onChange={(event) => setConfirmarSenha(event.target.value)}
        />
        <button id="space" type="submit">
          Confirmar
        </button>
      </Form>
    </Container>
  );
}
