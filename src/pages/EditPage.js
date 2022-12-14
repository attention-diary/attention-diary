
import "../india.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Form from '../components/Form';
import EditButton from '../components/EditButton';

// 훅스가져와서, 반환하는 함수와 객체를 하위컴포넌트에 내려주기
// 라우팅같이 가져가면 PostPage이랑 합쳐도됨
const EditPage = () => {
  const navigate = useNavigate();

  const { state } = useLocation();
  const editedPost = useSelector(state => state.indiaReducer);
  console.log(state)

  return (
    <div className='form-wrapper'>
      <h2 className='form-title'>
        관심이 필요한 오늘을 수정해주세요
      </h2>
      <Form state={state} />
      <button
        className='btn-secondary'
        onClick={() => {
          navigate(-1);
        }}
      >
        이전으로
      </button>
      <EditButton
        editedPost={editedPost}
        currPost={state}
      />
    </div>
  );
};

export default EditPage;
