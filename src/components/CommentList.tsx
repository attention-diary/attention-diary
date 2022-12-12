import React from 'react';

import { Comment, Post } from '../types/Types';

import CommentEditButton from './CommentEditButton';

type ListProps = { currPost: Post, comments: Comment[] }

// comments 배열을 받는다.
export default function CommmentList({ currPost, comments }: ListProps) {
  // 수정하기 누르면, comments를 화면에 뿌려주는거 대신 댓글을 폼으로 바꿔줘야함~~
  return (
    <>
      <ul className='tasks-box'>
        {comments.map(comment => (
          <li key={comment.commentId} >
            <h2>{comment.commentContent}</h2>
            <CommentEditButton
              currPost={currPost}
              selectedId={comment.commentId} />
          </li>
        ))}
      </ul>
    </>
  );
}
