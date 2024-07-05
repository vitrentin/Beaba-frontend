import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/global";
import theme from "./styles/theme";
import { Routes } from "./routes";
import { AuthProvider } from "./hooks/auth";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Toaster
        richColors
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick={true}
        toastOptions={{
          style: {
            padding: "2rem",
            fontSize: "2rem",
            borderRadius: "2.5rem",
            gap: "2rem",
          },
          className: "toast",
        }}
      />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
