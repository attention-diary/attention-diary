import React from 'react';

import { useQuery } from '@tanstack/react-query';

import { useParams } from 'react-router-dom';

import TopNavBar from './components/TopNavBar';
import EditForm from './components/EditForm';

import { getPost } from './api';

import { Post } from './types/Types';

export default function EditPage() {
  const { id } = useParams();
  // GET
  const { isLoading, isError, data } = useQuery({ queryKey: ['posts'], queryFn: getPost })
  // id값을 가지고 현재 포스트를 찾는다
  const currPost = data && id ?
    data.data.find((post: Post) => post.id === +id) : null;

  return (
    <>
      <TopNavBar />
      {isLoading ? <span>Loading...</span> : null}
      {isError ? <span>Something is wrong...</span> : null}
      {data ? <EditForm currPost={currPost} /> : null}
    </>
  );
}
