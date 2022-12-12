import React from 'react';

import { useQuery } from '@tanstack/react-query';

import TopNavBar from './components/TopNavBar';
import PostForm from './components/PostForm';

import { getPost } from './api';

export default function PostPage() {
  // GET
  const { isLoading, isError, data } = useQuery({ queryKey: ['posts'], queryFn: getPost })

  return (
    <>
      <TopNavBar />
      {isLoading ? <span>Loading...</span> : null}
      {isError ? <span>Something is wrong...</span> : null}
      {data ? <PostForm posts={data.data} /> : null}
    </>
  );
}
