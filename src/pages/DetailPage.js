import { useEffect, useState } from "react";
// import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { getDetail, getComment } from "../redux/queries/queries";
import {
  __deletePosts,
  __updatePosts,
  __postComment,
  __getPosts,
  __deleteComment,
} from "../redux/thunk/thunk";
import "./write.css";

const DetailPage = () => {
  // const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { post, isLoading, error } = useSelector((state) => state.post);
  const [comment, setComment] = useState("");
  //댓글을 map함수돌면서 표시할 comments배열
  let comments = state.comment;

  // india
  const editedPost = useSelector(state => state.post.post);
  const currPost = editedPost.find(post => post.id === state.id);

  const [inputs, setInputs] = useState({
    title: state.title,
    content: state.content,
    name: state.name,
  });

  const { title, content, name } = inputs;

  useEffect(() => {
    dispatch(__getPosts());
  }, [dispatch]);

  const onChangeTodo = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const deleteHandler = () => {
    if (!window.confirm("해당글을 삭제하시겠습니까?")) return;
    dispatch(__deletePosts(state));
    navigate("/");
  };

  const updateHandler = () => {
    if (!window.confirm("해당글을 수정하시겠습니까?")) return;
    const newContent = {
      id: state.id,
      title: title,
      name: name,
      content: content,
      comment: [...comments],
    };
    navigate("/editPage", { state: newContent });
  };

  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  const commnetHandler = (e) => {
    const newComment = {
      id: state.id,
      commentContent: comment,
    };
    dispatch(__postComment(newComment));
    setComment("");
  };

  const commentUpdateOrDeleteHandler =
    (currntPost, isUpdate = false) =>
      () => {
        if (isUpdate) {
          if (!window.confirm("해당 댓글을 수정하시겠습니까?")) return;
          setComment(currntPost.commentContent);
        }
        //state에 있는 데이터중애 현재페이지의 있는데이터를 가져오기
        console.log(post);
        const currentData = post.filter((item) => {
          return state.id === item.id;
        });
        //현재 데이터에서 삭제할려는 comment객체를 걸러주기
        const commentArr = currentData[0].comment.filter((item) => {
          return currntPost.commentId !== item.commentId;
        });
        //현재데이터에서 걸러진comment 배열을 담아서 payload로 보내줌
        const payload = { ...currentData[0], comment: commentArr };

        dispatch(__deleteComment(payload));
      };

  if (isLoading) {
    return <div>로딩 중....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (post) {
    const find = post.find((item) => {
      return item.id === state.id;
    });
    if (find === undefined) return;
    comments = find.comment;
  }

  return (
    <div className="inner">
      <div className="writeBox">
        <div>글 번호: {state.id}</div>
        <label>
          제목:
          <input
            type="text"
            name="title"
            value={currPost.title}
            onChange={onChangeTodo}
            readOnly
          />
          이름:
          <input
            type="text"
            name="name"
            value={currPost.name}
            onChange={onChangeTodo}
            readOnly
          />
        </label>
        <label>내용:</label>
        <textarea
          name="content"
          value={currPost.content}
          onChange={onChangeTodo}
          readOnly
        ></textarea>
      </div>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        홈으로
      </button>
      <button onClick={deleteHandler}>삭제하기</button>
      <button onClick={updateHandler}>수정하기</button>
      <div className="comment">
        <div className="comment_box">
          <label>댓글</label>
          <textarea
            className="comment_text"
            onChange={onChangeComment}
            value={comment}
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
                  {ele.commentId} : {ele.commentContent}
                  <button onClick={commentUpdateOrDeleteHandler(ele, true)}>
                    수정
                  </button>
                  <button onClick={commentUpdateOrDeleteHandler(ele)}>
                    삭제
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default DetailPage;
