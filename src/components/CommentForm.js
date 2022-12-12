import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { editPost } from '.././api';

import { initialState } from '../utils/initialState';

// currPost객체를 받는다
export default function CommentForm({ currPost }) {
  const [post, setPost] = useState(initialState);
  const { comments } = currPost;
  const { comment } = post;

  const editedPost = useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      alert('댓글 추가완료!');
    },
  });

  const handleChangeContents = (event) => {
    const { target: { id, value } } = event;
    setPost({
      ...post,
      comment: { ...comment, [id]: value }
    })
  }

  const handleClickAdd = () => {
    if (comment.commentContent) {
      editedPost.mutate({
        ...currPost,
        comments: [...comments, {
          commentId: currPost.comment.commentId,
          commentContent: comment.commentContent
        }],
        comment: {
          commentId: currPost.comment.commentId + 1,
          commentContent: '',
        }
      });
      setPost({
        ...post,
        comment: { ...comment, commentContent: '' }
      })
    } else alert('값을 입력해주세요!')
  }

  return (
    <>
      {editedPost.isLoading ? 'Loading...' : null}
      {editedPost.isError ? 'Something is wrong...' : null}
      <div className='to-do-form'>
        <input
          type="text"
          id="commentContent"
          value={comment.commentContent}
          placeholder="Comment"
          onChange={(e) => handleChangeContents(e)}
        />
      </div>
      <div>
        <button
          type="button"
          onClick={() => handleClickAdd()}
        >
          POST
        </button>
      </div>
    </>
  );
}