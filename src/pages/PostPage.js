import "../india.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

import Form from '../components/Form';
import PostButton from '../components/PostButton';

const PostPage = () => {
  // useEffect로 success가 true일때 홈으로 보내기
  const navigate = useNavigate();

  const { state } = useLocation();
  const editedPost = useSelector(state => state.indiaReducer);

  return (
    <div className='form-wrapper'>
      <h2>관심이 필요한 오늘을 기록해주세요</h2>
      <Form />
      <button
        className='btn-secondary'
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
