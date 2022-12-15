const CommentList = ({
  comments,
  commentDeleteHandler,
  commentUpdateHandler,
  setComment,
  comment,
}) => {
  return (
    <ul className="comment_list">
      {comments &&
        comments.map((ele) => {
          return (
            <li className="comment_li" key={ele.commentId}>
              Comment{ele.commentId} <br></br> {ele.commentContent}
              <button
                className="comment_btn"
                onClick={commentDeleteHandler(ele)}
              >
                삭제하기
              </button>
              <button
                className="comment_btn"
                onClick={commentUpdateHandler(ele)}
              >
                수정하기
              </button>
            </li>
          );
        })}
    </ul>
  );
};

export default CommentList;
