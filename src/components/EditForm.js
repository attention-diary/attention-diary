import { useState } from 'react';

import { initialState } from '../utils/initialState';

import EditButton from './EditButton';

// currPost객체를 받는다
export default function EditForm({ currPost }) {
  const [post, setPost] = useState({
    ...initialState,
    name: currPost.name,
    title: currPost.title,
    content: currPost.content,
  });
  const { name, title, content } = post;

  const handleChangeContents = (event) => {
    const { target: { id, value } } = event;
    setPost({
      ...post,
      [id]: value,
    })
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
          onChange={(e) => handleChangeContents(e)}
        />
        <label htmlFor="name">이름</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => handleChangeContents(e)}
        />
        <label htmlFor="content">내용</label>
        <input
          type="text"
          id="content"
          value={content}
          onChange={(e) => handleChangeContents(e)}
        />
        <EditButton post={post} currPost={currPost} />
      </div>
    </>
  );
}