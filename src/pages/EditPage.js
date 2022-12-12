import "./write.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { __updatePosts } from "../redux/thunk/thunk";

const EditPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [inputs, setInputs] = useState({
    title: state.title,
    content: state.content,
    name: state.name,
  });
  const { title, content, name } = inputs;

  const onChnage = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const updateHandler = (e) => {
    if (title.trim() === "" || content.trim() === "") {
      alert("내용과 제목을 입력해주세요");
      return;
    }
    const newContent = {
      id: state.id,
      title: title,
      content: content,
      name: name,
      comment: state.comment,
    };
    dispatch(__updatePosts(newContent));
    navigate(`/detailPage/:${state.id}`, { state: newContent });
  };

  return (
    <div className="inner">
      <div className="writeBox">
        <label>
          제목:
          <input type="text" name="title" value={title} onChange={onChnage} />
          이름:
          <input type="text" name="name" value={name} onChange={onChnage} />
        </label>
        <label>
          내용:
          <textarea
            name="content"
            value={content}
            onChange={onChnage}
          ></textarea>
        </label>
      </div>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        이전으로
      </button>
      <button onClick={updateHandler}>확인</button>
    </div>
  );
};

export default EditPage;
