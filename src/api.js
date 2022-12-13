import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3100',
});

const POST = '/post';

// method GET
export const getPost = async () => {
  const response = await api.get(POST);
  return response;
};
