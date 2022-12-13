import "./write.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import EditForm from '../components/EditForm';
import EditButton from '../components/EditButton';

const EditPage = () => {
  const navigate = useNavigate();

  const { state } = useLocation();
  const editedPost = useSelector(state => state.indiaReducer);

  return (
    <div className="inner">
      <div className="writeBox">
        <EditForm />
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
