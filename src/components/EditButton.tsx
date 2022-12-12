import React from 'react';

import { useMutation } from '@tanstack/react-query';

import { editPost } from '.././api';

import { Post } from '../types/Types';

type FormProps = { post: Post, currPost: Post }

// post와 currPost객체를 받는다
export default function EditButton({ post, currPost }: FormProps) {
  const { name, title, content } = post;

  const editedPost = useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      alert('일기장 수정완료!');
      window.history.back();
    },
  });

  const handleClickEdit = () => {
    if (name && title && content) {
      editedPost.mutate({ ...currPost, name, title, content });
    } else alert('값을 입력해주세요!')
  }

  return (
    <>
      {editedPost.isLoading ? 'Loading...' : null}
      {editedPost.isError ? 'Something is wrong...' : null}
      <button
        type="button"
        onClick={() => handleClickEdit()}
      >
        수정하기
      </button>
    </>
  );
}