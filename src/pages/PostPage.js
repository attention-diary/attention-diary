import "./write.css";
import { useNavigate } from "react-router-dom";

import Form from '../components/Form';
import PostButton from '../components/PostButton';

const PostPage = () => {
  const navigate = useNavigate();

  return (
    <div className="inner">
      <div className="writeBox">
        <Form />
      </div>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        이전으로
      </button>
      <PostButton />
    </div>
  );
};

export default PostPage;
