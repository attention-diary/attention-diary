import { useDispatch } from 'react-redux';

import { fetchPost } from '../redux/thunk/indiaThunk';

// editedPost와 currPost객체를 받는다
export default function PostButton({ editedPost, currPost }) {
  const dispatch = useDispatch();
  const { name, title, content } = editedPost;

  const handleClickPost = () => {
    if (name && title && content) {
      dispatch(fetchPost({
        id: currPost.id + 1,
        name, title, content, comment: []
      }));
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