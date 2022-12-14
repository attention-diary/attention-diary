import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetPost } from '../redux/thunk/indiaThunk';
import List from '../components/List';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { post } = useSelector((state) => state.indiaReducer);
  const { isLoading, error } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchGetPost());
  }, [dispatch]);

  const goWrite = (e) => {
    navigate("/postPage", { state: post });
  };

  return (
    <>
      {isLoading ? <span>로딩중입니다!</span> : null}
      {error ? <span>뭔가 이상합니다!</span> : null}
      <ul className="header">
        <li>TodoList 보기</li>
        <li onClick={goWrite}>ToDo작성</li>
      </ul>
      <div className='carousel-container'>
        <div className='carousel-title'>
          <h2>둘러보기</h2>
          <p>다른 사람들의 오늘을 구경해보세요 !</p>
        </div>
        {post ? <List posts={post} /> : null}
      </div>
    </>
  );
};

export default HomePage;
