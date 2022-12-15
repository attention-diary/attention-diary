const CommentWrite = ({
  onChangeComment,
  comment,
  commentHandler,
  commentId,
  isUpdate,
}) => {
  return (
    <div className="comment_box">
      <div>
        Comment
        {commentId.current !== 0 && isUpdate.current ? (
          <span>{commentId.current}번글 수정중</span>
        ) : null}
      </div>
      <textarea
        className="comment_text"
        onChange={onChangeComment}
        value={comment}
      ></textarea>
      <button onClick={commentHandler} className="primary_btn post_btn">
        등록하기
      </button>
    </div>
  );
};

export default CommentWrite;
