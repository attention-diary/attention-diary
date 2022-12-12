import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getPosts } from "../redux/thunk/thunk";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post, isLoading, error } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(__getPosts());
  }, [dispatch]);

  const goWrite = (e) => {
    navigate("/postPage");
  };

  const goDetailHandler = (post) => () => {
    navigate(`/detailPage/:id=${post.id}`, { state: post });
  };

  if (isLoading) {
    return <div>로딩 중....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div className="inner">
      <ul className="header">
        <li>TodoList 보기</li>
        <li onClick={goWrite}>ToDo작성</li>
      </ul>

      <div className="todoList">
        <table>
          <thead>
            <tr className="thead">
              <th>글번호</th>
              <th>제목</th>
              <th>내용</th>
            </tr>
          </thead>
          <tbody>
            {post.map((post) => (
              <tr onClick={goDetailHandler(post)} key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;
