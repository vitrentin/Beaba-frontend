import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages/Login";
import { ResetPassword } from "../pages/ResetPassword";

export function AuthRoutes() {
  const user = localStorage.getItem("@beaba:user");
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {!user && <Route path="*" element={<Navigate to="/" />} />}
    </Routes>
  );
}
