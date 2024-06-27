import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../hooks/auth";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import { axeAcessibilityReporter } from "../utils/axesAcessibilityReporter";
axeAcessibilityReporter();
export function Routes() {
  const { token } = useAuth();
  return (
    <BrowserRouter>{token ? <AppRoutes /> : <AuthRoutes />}</BrowserRouter>
  );
}
