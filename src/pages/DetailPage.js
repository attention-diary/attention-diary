import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import WriteBox from "../components/WriteBox";
import Comment from "../components/comment/Comment";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import useSpinner from "../hooks/useSpinner";

import "./detail.css";

import {
  __deletePosts,
  __updatePosts,
  __postComment,
  __getPosts,
  __deleteComment,
} from "../redux/thunk/thunk";

const DetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();
  const { post, isLoading, error } = useSelector((state) => state.post);
  const [comment, setComment] = useState("");
  const [limitScroll, commentIndex, commentIsLoding] = useSpinner();

  const [commentArr, setCommentArr] = useState(
    state.comment.slice(0, commentIndex)
  );
  const commentId = useRef(0); //댓글을 수정한다면 사용해야할 id값
  const isUpdate = useRef(false); //댓글을 수정한다면 사용될 flag값

  // india
  const editedPost = useSelector((state) => state.post.post);
  const currPost = editedPost.find((post) => post.id === state.id);

  const [inputs, setInputs] = useState({
    title: state.title,
    content: state.content,
    name: state.name,
  });

  const { title, content, name } = inputs;

  useEffect(() => {
    dispatch(__getPosts());
    isUpdate.current = false;
  }, [dispatch]);

  useEffect(() => {
    //받아온 state에서 현재 게시글 정보 찾기
    let find = post.find((item) => {
      return item.id === state.id;
    });

    if (find === undefined) {
      find = state;
      //정보를 못찾았다면 useNavigate로 가져온 state로 설정
    }
    //commeetArr을 3개씩 제한해서 설정
    setCommentArr(find.comment.slice(0, commentIndex.current));
  }, [limitScroll, post]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    dispatch(__getPosts());
    isUpdate.current = false;
  }, [dispatch]);

  const deleteHandler = () => {
    if (!window.confirm("해당글을 삭제하시겠습니까?")) return;
    dispatch(__deletePosts(state));
    navigate("/");
  };

  const askNavigate = () => {
    if (
      comment.trim() !== "" &&
      !window.confirm("수정사항이 사라질 수 있습니다. 홈으로 돌아가시겠습니까?")
    )
      return;
    commentIndex.current = 3;
    navigate("/");
  };

  const updateHandler = () => {
    if (!window.confirm("해당글을 수정하시겠습니까?")) return;
    const newContent = {
      id: state.id,
      title: state.title,
      name: state.name,
      content: state.content,
      comment: [...commentArr],
    };
    navigate("/editPage", { state: newContent });
  };

  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  const commentHandler = (e) => {
    console.log("햔재 게시글들 정보", post);
    if (comment.trim() === "") {
      alert("댓글의 내용을 입력해주세요");
      return;
    }
    const newComment = {
      id: state.id,
      commentId: commentId.current,
      commentContent: comment,
      isUpdate: isUpdate.current,
    };
    dispatch(__postComment(newComment));
    setComment("");
    isUpdate.current = false;
  };

  const commentUpdateHandler = (currentPost) => () => {
    if (!window.confirm("해당 댓글을 수정하시겠습니까?")) return;
    setComment(currentPost.commentContent);
    const id = currentPost.commentId;
    commentId.current = id;
    isUpdate.current = true;
  };

  const commentDeleteHandler = (currntPost) => () => {
    if (!window.confirm("해당 댓글을 삭제하시겠습니까?")) return;
    //state에 있는 데이터중애 현재페이지의 있는데이터를 가져오기
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

  return (
    <div className="inner">
      {isLoading ? <div>...로딩중</div> : null}
      {error ? <div>{error.message}</div> : null}
      <WriteBox
        updateHandler={updateHandler}
        deleteHandler={deleteHandler}
        post={state}
        askNavigate={askNavigate}
      />
      <Comment
        onChangeComment={onChangeComment}
        comment={comment}
        commentId={commentId}
        isUpdate={isUpdate}
        setComment={setComment}
        commentHandler={commentHandler}
        comments={commentArr}
        commentDeleteHandler={commentDeleteHandler}
        commentUpdateHandler={commentUpdateHandler}
      />
      {commentIsLoding.current ? (
        <Spinner className="spinner" />
      ) : (
        <Spinner className="spinner" style={{ display: "none" }} />
      )}
    </div>
  );
};

export default DetailPage;
