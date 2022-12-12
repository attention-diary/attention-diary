const CommentWrite = ({ onChangeComment, comment, commentHandler }) => {
  return (
    <div className="comment_box">
      <div>Comment</div>
      <textarea
        className="comment_text"
        onChange={onChangeComment}
        value={comment}
      ></textarea>
      <button onClick={commentHandler} className="primary_btn post_btn">
        POST
      </button>
    </div>
  );
};

export default CommentWrite;
