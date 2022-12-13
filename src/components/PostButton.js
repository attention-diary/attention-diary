import { useDispatch, useSelector } from 'react-redux';

import { fetchPost } from '../redux/thunk/indiaThunk';

export default function PostButton() {
  const dispatch = useDispatch();

  const editedPost = useSelector(state => state.indiaReducer);
  const { name, title, content } = editedPost;

  const handleClickPost = () => {
    if (name && title && content) {
      dispatch(fetchPost({ name, title, content, comment: [] }));
      window.location.assign('/');
    } else alert('값을 입력해주세요!')
  }

  return (
    <>
      <button
        type="button"
        onClick={() => handleClickPost()}
      >
        등록하기
      </button>
    </>
  );
}