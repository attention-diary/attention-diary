import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPost } from './api';

import TopNavBar from './components/TopNavBar';
import List from './components/List';

export default function HomePage() {
  // GET
  const { isLoading, isError, data } = useQuery({ queryKey: ['posts'], queryFn: getPost })

  return (
    <>
      <TopNavBar />
      {isLoading ? <span>Loading...</span> : null}
      {isError ? <span>Something is wrong...</span> : null}
      {data && data.data.length !== 0 ?
        <>
          <h2 className='tasks-title'>둘러보기</h2>
          <p className='tasks-title'>다른 사람들의 오늘을 구경해보세요 !</p>
          <List posts={data.data} />
        </>
        :
        <>
          {/*예외처리*/}
          <h2 className='tasks-title'>아직은 아무것도 없네요... 😢</h2>
          <p className='tasks-title'>일기장을 작성해주세요!</p>
        </>
      }
    </>
  );
}
