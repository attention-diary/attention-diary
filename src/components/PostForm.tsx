import React from 'react';

import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { addPost } from '.././api';

import { Post } from '../types/Types';

import { initialState } from '../utils/initialState';

type FormProps = { posts: Post[] }

// posts 배열을 받는다
export default function PostForm({ posts }: FormProps) {
  const [post, setPost] = useState(initialState);
  const { name, title, content, comments, comment } = post;
  const recentPostId = posts.length !== 0 ? posts[posts.length - 1].id : 0;

  const addedPost = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      alert('일기장 추가완료!');
      window.location.assign('/');
    },
  });

  const handleChangeContents = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { id, value } } = event;
    setPost({
      ...post,
      [id]: value,
    })
  }

  const handleClickAdd = () => {
    if (name && title && content) {
      addedPost.mutate({ id: recentPostId + 1, name, title, content, comments, comment });
      setPost({
        ...post,
        id: recentPostId + 1,
        name: '',
        title: '',
        content: '',
      })
    } else alert('값을 입력해주세요!')
  }

  return (
    <>
      {addedPost.isLoading ? 'Loading...' : null}
      {addedPost.isError ? 'Something is wrong...' : null}
      <h2>관심이 필요한 오늘을 기록해주세요</h2>
      <div className='to-do-form'>
        <label htmlFor="title">제목</label>
        <input
          type="text"
          id="title"
          value={title}
          placeholder="제목을 입력해주세요"
          onChange={(e) => handleChangeContents(e)}
        />
        <label htmlFor="name">이름</label>
        <input
          type="text"
          id="name"
          value={name}
          placeholder="이름을 입력해주세요"
          onChange={(e) => handleChangeContents(e)}
        />
        <label htmlFor="content">내용</label>
        <input
          type="text"
          id="content"
          value={content}
          placeholder="오늘을 기록해주세요"
          onChange={(e) => handleChangeContents(e)}
        />
      </div>
      <div>
        <button
          type="button"
          onClick={() => handleClickAdd()}
        >
          등록하기
        </button>
      </div>
    </>
  );
}