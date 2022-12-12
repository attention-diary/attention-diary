import React from 'react';

import { useMutation } from '@tanstack/react-query';

import { editPost } from '.././api';

import { Post } from '../types/Types';

type FormProps = { currPost: Post, selectedId: number }

// selectedId숫자와 currPost객체를 받는다
export default function CommentEditButton({ currPost, selectedId }: FormProps) {
  const { comments } = currPost;

  const editedPost = useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      alert('댓글 삭제완료!');
    },
  });

  const handleClickEdit = (selectedId: number) => {
    const filteredComments = comments.filter(comment => comment.commentId !== selectedId);
    editedPost.mutate({ ...currPost, comments: filteredComments });
  }

  return (
    <>
      {editedPost.isLoading ? 'Loading...' : null}
      {editedPost.isError ? 'Something is wrong...' : null}
      <button
        type="button"
        onClick={() => handleClickEdit(selectedId)}
      >
        삭제하기
      </button>
    </>
  );
}