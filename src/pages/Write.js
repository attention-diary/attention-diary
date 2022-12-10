import "./write.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { __postTodos } from "../redux/thunk/thunk";

const Write = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    title: "",
    content: "",
  });
  const { title, content } = inputs;

  // const fetchTodos = async () => {
  //   console.log(await axios.get("http://localhost:3100/todos"));
  // };
  // fetchTodos();

  const onChnage = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const insetHander = () => {
    const newContent = {
      title: title,
      content: content,
      isDone: false,
      comment: [],
    };
    dispatch(__postTodos(newContent));
    navigate(-1);
  };

  return (
    <div className="inner">
      <div className="writeBox">
        <label>
          제목:
          <input type="text" name="title" value={title} onChange={onChnage} />
        </label>
        <label>내용:</label>
        <textarea name="content" value={content} onChange={onChnage}></textarea>
      </div>
      <button onClick={insetHander}>확인</button>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        이전으로
      </button>
    </div>
  );
};

export default Write;
