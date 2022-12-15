const WriteBox = ({ updateHandler, deleteHandler, post, askNavigate }) => {
  return (
    <div className="writeBox_outer">
      <p className="inform">관심 받고 싶은 오늘의 기록입니다</p>
      <div className="writeBox_inner">
        <div className="writeBox_nav">
          <span className="title">{post.title}</span>
          <span className="author">{post.name}</span>
          <div className="nav_btn">
            <button onClick={updateHandler} className="edit">수정하기</button>
            <button onClick={deleteHandler} className="delete"> 삭제하기</button>
          </div>
          <textarea
            className="content"
            value={post.content}
            readOnly
          ></textarea>
        </div>
      </div>
      <button className="primary_btn" onClick={askNavigate}>
        홈으로
      </button>
    </div>
  );
};

export default WriteBox;
