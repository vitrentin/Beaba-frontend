import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages/Login";

export function AuthRoutes() {
  const user = localStorage.getItem("@beaba:user");
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {!user && <Route path="*" element={<Navigate to="/" />} />}
    </Routes>
  );
}
