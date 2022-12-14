import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { __postPosts } from "../redux/thunk/thunk";

const PostPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    name: "",
  });
  const { title, content, name } = inputs;

  const onChnage = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const postHandler = (e) => {
    if (title.trim() === "" || content.trim() === "") {
      alert("내용과 제목을 입력해주세요");
      return;
    }
    const newContent = {
      title: title,
      name: name,
      content: content,
      comment: [],
    };
    dispatch(__postPosts(newContent));
    navigate(-1);
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
      <button onClick={postHandler}>확인</button>
    </div>
  );
};

export default PostPage;
