import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Write from "../pages/Write";
import Detail from "../pages/Detail";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      {/* <Route path="/detail" element={<Detail />} />
        <Route path="cart" element={<Cart />} /> */}
      <Route path="/write" element={<Write />} />
      <Route path="/detail" element={<Detail />} />
      <Route path="*" element={<div>이거 404 페이지요</div>} />
    </Routes>
  );
};

export default Router;
