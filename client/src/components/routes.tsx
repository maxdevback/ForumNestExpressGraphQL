import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./auth/login";
import { RegisterPage } from "./auth/register";
import { Posts } from "./posts";

export const Navigation = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
};
