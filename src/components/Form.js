import { useDispatch, useSelector } from 'react-redux';

import { changeInputField } from '../redux/modules/indiaSlice';

export default function Form({ state }) {
  const dispatch = useDispatch();

  const { isLoading, error } = useSelector(state => state.post);
  const editedPost = useSelector(state => state.indiaReducer);
  const { name, title, content } = editedPost;

  const handleChangeInputField = (event) => {
    const { target: { id, value } } = event;
    dispatch(changeInputField({ id, value }));
  }

  return (
    <>
      {isLoading ? <span>로딩중입니다!</span> : null}
      {error ? <span>뭔가 이상합니다!</span> : null}
      <div className='form-box'>
        <form className='form-top'>
          <div>
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              value={title}
              placeholder={state ? state.title : "제목을 입력해주세요"}
              onChange={(e) => handleChangeInputField(e)}
            />
          </div>
          <div>
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              value={name}
              placeholder={state ? state.name : "이름을 입력해주세요"}
              onChange={(e) => handleChangeInputField(e)}
            />
          </div>
        </form>
        <form className='form-btm'>
          <label htmlFor="content">내용</label>
          <textarea
            rows="20" cols="50"
            type="text"
            id="content"
            value={content}
            placeholder={state ? state.content : "내용을 입력해주세요"}
            onChange={(e) => handleChangeInputField(e)}
          />
        </form>
      </div>
    </>
  );
}