import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

const POST = process.env.REACT_APP_POST;

// method GET
export const getPost = async () => {
  const response = await api.get(POST);
  return response;
};

// method PATCH /post/id
export const editPost = async ({ id, name, title, content }) => {
  return await api.patch(POST + `/${id}`, { name, title, content });
};

// method POST /post
export const postPost = async (newPost) => {
  return await api.post(POST, newPost);
};
