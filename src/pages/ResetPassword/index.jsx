/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { FiLock } from "react-icons/fi";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Container, Form } from "./styles";
import Logo from "../../assets/verdeCardImage.svg";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
document.title = `Reset Password`;
export function ResetPassword() {
  const navigate = useNavigate();
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const email = queryParams.get("email");
    setToken(token);
  }, []);

  const handleResetPassword = async (event) => {
    event.preventDefault();
    if (senha !== confirmarSenha) {
      alert("As senhas não são iguais");
      return;
    }
    try {
      const response = await api.put("/reset-password", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: token.email,
          senha: senha,
          confirmarSenha: confirmarSenha,
          token: token,
        }),
      });

      if (response.ok) {
        alert("Senha redefinida com sucesso!");
        navigate("/");
      } else {
        const data = await response.json();
        alert(`Erro ao redefinir senha: ${data.error}`);
      }
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
      alert("Erro ao redefinir senha. Por favor, tente novamente mais tarde.");
    }
  };
  return (
    <Container>
      <img src={Logo} alt="Logo da Verdecard" />
      <Form>
        <h2>Nova senha:</h2>
        <Input
          placeholder="Senha"
          type="password"
          icon={FiLock}
          onChange={(event) => setSenha(event.target.value)}
        />
        <h2>Confirmar senha:</h2>
        <Input
          placeholder="Confirmar senha"
          type="password"
          icon={FiLock}
          onChange={(event) => setConfirmarSenha(event.target.value)}
        />

        <Button
          id="space"
          role="button"
          title="Confirmar"
          onClick={() => {
            // handleResetPassword();
            navigate("/");
          }}
        />
      </Form>
    </Container>
  );
}
