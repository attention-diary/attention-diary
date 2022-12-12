import React from 'react';

import { useMutation } from '@tanstack/react-query';

import { deletePost } from '../api';

// id를 props로 받아서 
export default function DeleteButton({ id }: any) {
  const deletedPost = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      alert('일기장 삭제완료!');
      window.history.back();
    },
  });

  return (
    <>
      {deletedPost.isLoading ? <span>Loading...</span> : null}
      {deletedPost.isError ? <span>Something is wrong...</span> : null}
      <button
        type="button"
        onClick={() => deletedPost.mutate(id)}
      >
        삭제하기
      </button>
    </>
  );
}
