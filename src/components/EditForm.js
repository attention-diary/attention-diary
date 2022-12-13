import { useDispatch, useSelector } from 'react-redux';

import { changeInputField } from '../redux/modules/indiaSlice';

export default function EditForm() {
  const dispatch = useDispatch();
  const editedPost = useSelector(state => state.indiaReducer);
  const { name, title, content } = editedPost;
  console.log(name, title, content)

  const handleChangeInputField = (event) => {
    const { target: { id, value } } = event;
    dispatch(changeInputField({ id, value }));
  }

  return (
    <>
      <h2>관심이 필요한 오늘을 수정해주세요</h2>
      <div className='to-do-form'>
        <label htmlFor="title">제목</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => handleChangeInputField(e)}
        />
        <label htmlFor="name">이름</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => handleChangeInputField(e)}
        />
        <label htmlFor="content">내용</label>
        <input
          type="text"
          id="content"
          value={content}
          onChange={(e) => handleChangeInputField(e)}
        />
      </div>
    </>
  );
}