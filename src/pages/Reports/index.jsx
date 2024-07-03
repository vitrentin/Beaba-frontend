/* eslint-disable no-unused-vars */
import { Section } from "../../components/Section";
import { Container } from "./styles";
import { Navigation } from "../../components/Navigation";
import { api } from "../../services/api";
import { useEffect, useState } from "react";
import { Button } from "../../components/Button";

export function Reports() {
  document.title = `Relatórios`;

  const [quantidadeUsuarios, setQuantidadeUsuarios] = useState(0);
  const [quantidadePerfis, setQuantidadePerfis] = useState(0);
  const [quantidadeModulos, setQuantidadeModulos] = useState(0);
  const [quantidadeTransacoes, setQuantidadeTransacoes] = useState(0);
  const [quantidadeFuncoes, setQuantidadeFuncoes] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    fetchQuantidadeUsuarios();
    fetchQuantidadePerfis();
    fetchQuantidadeModulos();
    fetchQuantidadeTransacoes();
    fetchQuantidadeFuncoes();
  }, []);

  const fetchQuantidadeUsuarios = async () => {
    try {
      const token = localStorage.getItem("@beaba:token");
      const response = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setQuantidadeUsuarios(response.data.countUsers);
    } catch (error) {
      console.error("Erro ao buscar quantidade de usuários:", error);
    }
  };

  const fetchQuantidadePerfis = async () => {
    try {
      const token = localStorage.getItem("@beaba:token");
      const response = await api.get("/profiles", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setQuantidadePerfis(response.data.countProfiles);
    } catch (error) {
      console.error("Erro ao buscar quantidade de perfis:", error);
    }
  };

  const fetchQuantidadeModulos = async () => {
    try {
      const token = localStorage.getItem("@beaba:token");
      const response = await api.get("/modules", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setQuantidadeModulos(response.data.countModules);
    } catch (error) {
      console.error("Erro ao buscar quantidade de módulos:", error);
    }
  };

  const fetchQuantidadeTransacoes = async () => {
    try {
      const token = localStorage.getItem("@beaba:token");
      const response = await api.get("/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setQuantidadeTransacoes(response.data.countTransactions);
    } catch (error) {
      console.error("Erro ao buscar quantidade de transações:", error);
    }
  };

  const fetchQuantidadeFuncoes = async () => {
    try {
      const token = localStorage.getItem("@beaba:token");
      const response = await api.get("/functions", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setQuantidadeFuncoes(response.data.countFunctions);
    } catch (error) {
      console.error("Erro ao buscar quantidade de funções:", error);
    }
  };
  const generateUserReport = async () => {
    try {
      const token = localStorage.getItem("@beaba:token");
      const response = await api.get("/users/report", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "relatorio_usuarios.xlsx";
      link.click();
    } catch (error) {
      console.error("Erro ao gerar relatório de usuários:", error);
    }
  };
  const generateProfileReport = async () => {
    try {
      const token = localStorage.getItem("@beaba:token");
      const response = await api.get("/profiles/report", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "relatorio_perfis.xlsx";
      link.click();
    } catch (error) {
      console.error("Erro ao gerar relatório de perfis:", error);
    }
  };
  const generateModuleReport = async () => {
    try {
      const token = localStorage.getItem("@beaba:token");
      const response = await api.get("/modules/report", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "relatorio_modulos.xlsx";
      link.click();
    } catch (error) {
      console.error("Erro ao gerar relatório de módulos:", error);
    }
  };
  const generateTransactionReport = async () => {
    try {
      const token = localStorage.getItem("@beaba:token");
      const response = await api.get("/transactions/report", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "relatorio_transacoes.xlsx";
      link.click();
    } catch (error) {
      console.error("Erro ao gerar relatório de transações:", error);
    }
  };
  const generateFunctionReport = async () => {
    try {
      const token = localStorage.getItem("@beaba:token");
      const response = await api.get("/functions/report", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "relatorio_funcoes.xlsx";
      link.click();
    } catch (error) {
      console.error("Erro ao gerar relatório de funções:", error);
    }
  };
  return (
    <Container>
      <Navigation title="Relatórios" />
      <Section title="Relatórios:">
        <div className="quantidade">
          <div className="relatorios">
            <p>Quantidade de Usuários: {quantidadeUsuarios}</p>
            <Button
              id="spaceU"
              title="Gerar Relatório de Usuários"
              onClick={generateUserReport}
            />
          </div>
          <div className="relatorios">
            <p>Quantidade de Perfis: {quantidadePerfis}</p>
            <Button
              id="spaceP"
              title="Gerar Relatório de Perfis"
              onClick={generateProfileReport}
            />
          </div>
          <div className="relatorios">
            <p>Quantidade de Módulos: {quantidadeModulos}</p>
            <Button
              id="spaceM"
              title="Gerar Relatório de Módulos"
              onClick={generateModuleReport}
            />
          </div>
          <div className="relatorios">
            <p>Quantidade de Transações: {quantidadeTransacoes}</p>
            <Button
              id="spaceT"
              title="Gerar Relatório de Transações"
              onClick={generateTransactionReport}
            />
          </div>
          <div className="relatorios">
            <p>Quantidade de Funções: {quantidadeFuncoes}</p>
            <Button
              id="spaceF"
              title="Gerar Relatório de Funções"
              onClick={generateFunctionReport}
            />
          </div>
        </div>
      </Section>
    </Container>
  );
}
