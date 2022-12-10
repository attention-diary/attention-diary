import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getTodos } from "../redux/thunk/thunk";
import { useQuery } from "react-query";
import { getTodo } from "../redux/queries/queries";

const Main = () => {
  // const { data: todos, isLoading, isError, error } = useQuery("todos", getTodo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { todos, isLoading, error } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(__getTodos());
  }, [dispatch]);

  const goWrite = (e) => {
    navigate("/write");
  };
  const goDetailHandler = (todo) => () => {
    navigate("/detail", { state: todo });
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
        <li>로그인</li>
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
            {todos.map((todo) => (
              <tr onClick={goDetailHandler(todo)} key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Main;
