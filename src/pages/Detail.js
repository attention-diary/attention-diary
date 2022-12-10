import { useEffect, useState } from "react";
// import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
// import { getDetail, getComment } from "../redux/queries/queries";
import {
  __deleteTodos,
  __updateTodos,
  __postComment,
  __getTodos,
  __getDetail,
} from "../redux/thunk/thunk";
import "./write.css";

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { todos, isLoading, error } = useSelector((state) => state.todos);

  //댓글을 map함수돌면서 표시할 comments배열
  let comments = state.comment;

  const [inputs, setInputs] = useState({
    title: state.title,
    content: state.content,
  });

  useEffect(() => {
    dispatch(__getTodos());
  }, [dispatch]);

  const [comment, setComment] = useState("");

  const { title, content } = inputs;

  const onChangeTodo = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  if (isLoading) {
    return <div>로딩 중....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }
  if (todos) {
    // console.log(todos);
    const find = todos.find((todo) => {
      return todo.id === state.id;
    });
    if (find === undefined) return;
    comments = find.comment;
  }

  const deleteHandler = () => {
    if (!window.confirm("정말 해당글을 삭제하시겠습니까?")) return;
    dispatch(__deleteTodos(state));
    navigate(-1);
  };

  const updateHandler = () => {
    if (!window.confirm("정말 해당글을 수정하시겠습니까?")) return;
    const newContent = {
      id: state.id,
      title: title,
      content: content,
      comment: [...state.comment],
    };
    dispatch(__updateTodos(newContent));
    navigate(-1);
  };

  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  const commnetHandler = (e) => {
    const newComment = {
      id: state.id,
      comment: comment,
    };
    setComment("    ");
    dispatch(__postComment(newComment));
  };

  return (
    <div className="inner">
      <div className="writeBox">
        <div>글 번호: {state.id}</div>
        <label>
          제목:
          <input
            type="text"
            name="title"
            value={title}
            onChange={onChangeTodo}
          />
        </label>
        <label>내용:</label>
        <textarea
          name="content"
          value={content}
          onChange={onChangeTodo}
        ></textarea>
      </div>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        이전으로
      </button>
      <button onClick={deleteHandler}>삭제하기</button>
      <button onClick={updateHandler}>수정하기</button>
      <div className="comment">
        <div className="comment_box">
          <label>댓글</label>
          <textarea
            className="comment_text"
            onChange={onChangeComment}
          ></textarea>
          <button onClick={commnetHandler} className="commentBtn">
            확인
          </button>
        </div>
        <ul>
          {comments &&
            comments.map((ele) => {
              return (
                <li key={ele.commentId}>
                  {ele.commentId} : {ele.comment}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Detail;
