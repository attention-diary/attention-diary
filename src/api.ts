import axios from 'axios';

import { Comment } from './types/Types';

const api = axios.create({
  baseURL: 'http://localhost:3003',
});

const POST = '/post';

// method GET
export const getPost = async () => {
  const response = await api.get(POST);
  return response;
};

// method POST /post
export const addPost = async (
  { id, name, title, content, comments, comment }:
    { id: number | null, name: string, title: string; content: string, comments: Comment[], comment: Comment }
) => { await api.post(POST, { id, name, title, content, comments, comment }); }

// method PUT /post/id
export const editPost = async (
  { id, name, title, content, comments, comment }:
    { id: number | null, name: string, title: string; content: string, comments: Comment[], comment: Comment }
) => { await api.put(POST + `/${id}`, { id, name, title, content, comments, comment }); }

// method DELETE /post/id
export const deletePost = async (id: any) => {
  const response = await api.delete(POST + `/${id}`);
  return response;
};
// 문제해결 참고 - https://stackoverflow.com/questions/61051843/how-to-solve-delete-error-404-not-found-express-js


// ToDo study: 비동기 async와 await, fetch, promise, 프라미스 체이닝, 마이크로태스크, 콜백

// 리스폰스가 오기전까지 다른작업을 처리(컴포넌트 렌더링 등)하고있다가=>로딩상태로 처리,
// 리스폰스가 오면 그 응답에 맞춰서 변경된 상태의 컴포넌트 렌더링  

// db.json이 데이터베이스 역할은 아니고, api서버 요청을 보냈을때 db에서 json응답이 온 것을 가정한다.

// 하나의 api에 대해서 여러컴포넌트에서 사용해야하면 훅으로 빼기

// axios참고 - https://wonit.tistory.com/305
