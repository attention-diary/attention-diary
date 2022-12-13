import "./write.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

import Form from '../components/Form';
import PostButton from '../components/PostButton';

const PostPage = () => {
  const navigate = useNavigate();

  const { state } = useLocation();
  const editedPost = useSelector(state => state.indiaReducer);

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
      <PostButton
        editedPost={editedPost}
        currPost={state}
      />
    </div>
  );
};

export default PostPage;
