import CommentList from "./CommentList";
import CommentWrite from "./CommentWirte";

const Comment = ({
  onChangeComment,
  comment,
  commentHandler,
  comments,
  commentUpdateHandler,
  commentDeleteHandler,
  setComment,
  commentId,
}) => {
  return (
    <div className="comment">
      <CommentWrite
        onChangeComment={onChangeComment}
        comment={comment}
        commentHandler={commentHandler}
        commentId={commentId}
      />
      <CommentList
        comments={comments}
        comment={comment}
        commentDeleteHandler={commentDeleteHandler}
        commentUpdateHandler={commentUpdateHandler}
        setComment={setComment}
      />
    </div>
  );
};

export default Comment;
