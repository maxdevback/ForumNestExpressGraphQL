import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./auth/login";
import { RegisterPage } from "./auth/register";
import { Posts } from "./posts";
import { PostPage } from "./posts/post.page";
import { PostCreate } from "./posts/post.create";

export const Navigation = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/post/create" element={<PostCreate />} />
      </Routes>
    </>
  );
};
