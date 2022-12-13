import "./write.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Form from '../components/Form';
import EditButton from '../components/EditButton';

const EditPage = () => {
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
      <EditButton
        editedPost={editedPost}
        currPost={state}
      />
    </div>
  );
};

export default EditPage;
