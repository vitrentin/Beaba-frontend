/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";

export const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  const [data, setData] = useState({
    token: localStorage.getItem("@beaba:token"),
  });

  async function signIn({ email, senha }) {
    try {
      const response = await api.post("/sessions", { email, senha });
      const { token } = response.data;

      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("@beaba:token", token);
        setData({ token });
        console.log("Resposta do servidor:", response.data);
        console.log("Token:", token);
      } else {
        console.error("Resposta do servidor inválida", response.data);
        alert("Resposta do servidor inválida");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível entrar");
      }
    }
  }

  function signOut() {
    localStorage.removeItem("@beaba:token");
    setData({ token: null });
    delete api.defaults.headers.common["Authorization"];
  }

  useEffect(() => {
    const token = localStorage.getItem("@beaba:token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setData({ token });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, token: data.token }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
