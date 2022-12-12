import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import EditPage from "../pages/EditPage";
import DetailPage from "../pages/DetailPage";
import PostPage from "../pages/PostPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/postPage" element={<PostPage />} />
      <Route path="/editPage" element={<EditPage />} />
      <Route path="/detailPage/:id" element={<DetailPage />} />
      <Route path="*" element={<div>이거 404 페이지요</div>} />
    </Routes>
  );
};

export default Router;
