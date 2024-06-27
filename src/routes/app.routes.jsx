import { Routes, Route, Navigate } from "react-router-dom";

import { Home } from "../pages/Home";
import { User } from "../pages/User";
import { Profile } from "../pages/Profile";
import { Module } from "../pages/Module";
import { Transaction } from "../pages/Transaction";
import { Function } from "../pages/Function";
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<User />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/module" element={<Module />} />
      <Route path="/transaction" element={<Transaction />} />
      <Route path="/function" element={<Function />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
