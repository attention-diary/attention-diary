import React from 'react';

import { useQuery } from '@tanstack/react-query';

import { useParams, Link } from 'react-router-dom';

import { getPost } from './api';

import { Post } from './types/Types';

import TopNavBar from './components/TopNavBar';

import CommentForm from './components/CommentForm';
import CommentList from './components/CommentList';
import DeleteButton from './components/DeleteButton';

export default function DetailPage() {
  // issue id값이 처음에 undefined로 들어온다
  // 그래서 아래쪽에서 currPost.id에서 any가 뜨는거 같다..
  const { id } = useParams();

  // GET
  const { data } = useQuery({ queryKey: ['posts'], queryFn: getPost });

  // id값을 가지고 현재 포스트를 찾는다
  const currPost = data && id ?
    data.data.find((post: Post) => post.id === +id) : null;

  return (
    <>
      <TopNavBar />
      <h2>관심 받고 싶은 오늘의 기록입니다</h2>
      <h2>{currPost.title}</h2>
      <p>{currPost.name}</p>
      <p>{currPost.content}</p>
      <DeleteButton id={currPost.id} />
      <Link to={`/edit/${currPost.id}`}>
        <button type="button">
          수정하기
        </button>
      </Link>
      {data ? <CommentForm currPost={currPost} /> : null}
      {data ?
        <CommentList
          currPost={currPost}
          comments={currPost.comments} />
        : null}
    </>
  );
}
