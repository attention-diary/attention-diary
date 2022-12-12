import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import WriteBox from "../components/WriteBox";
import Comment from "../components/comment/Comment";

import {
  __deletePosts,
  __updatePosts,
  __postComment,
  __getPosts,
  __deleteComment,
} from "../redux/thunk/thunk";
import "./detail.css";

const DetailPage = () => {
  // const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { post, isLoading, error } = useSelector((state) => state.post);
  const [comment, setComment] = useState("");
  const commentId = useRef(0); //댓글을 수정한다면 사용해야할 id값
  const isUpdate = useRef(false); //댓글을 수정한다면 사용될 flag값
  //댓글을 map함수돌면서 표시할 comments배열
  let comments = state.comment;

  useEffect(() => {
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
    navigate("/");
  };

  const updateHandler = () => {
    if (!window.confirm("해당글을 수정하시겠습니까?")) return;
    const newContent = {
      id: state.id,
      title: state.title,
      name: state.name,
      content: state.content,
      comment: [...comments],
    };
    navigate("/editPage", { state: newContent });
  };

  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  const commentHandler = (e) => {
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

  const commentUpdateHandler = (currntPost) => () => {
    if (!window.confirm("해당 댓글을 수정하시겠습니까?")) return;
    setComment(currntPost.commentContent);
    const id = currntPost.commentId;
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
      <WriteBox
        updateHandler={updateHandler}
        deleteHandler={deleteHandler}
        post={state}
        askNavigate={askNavigate}
      />
      <Comment
        onChangeComment={onChangeComment}
        comment={comment}
        setComment={setComment}
        commentHandler={commentHandler}
        comments={comments}
        commentDeleteHandler={commentDeleteHandler}
        commentUpdateHandler={commentUpdateHandler}
      />
    </div>
  );
};

export default DetailPage;
