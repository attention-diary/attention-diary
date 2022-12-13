import { useDispatch } from 'react-redux';

import { fetchEditPost } from '../redux/thunk/indiaThunk';

// editedPost와 currPost객체를 받는다
export default function EditButton({ editedPost, currPost }) {
  const dispatch = useDispatch();
  const { name, title, content } = editedPost;

  const handleClickEditPost = () => {
    if (name || title || content) {
      dispatch(fetchEditPost({ ...currPost, name, title, content }));
      window.history.back();
    } else alert('값을 입력해주세요!')
  }

  return (
    <>
      <button
        className='btn-secondary'
        type="button"
        onClick={() => handleClickEditPost()}
      >
        수정하기
      </button>
    </>
  );
}