//queries/쿼리요청
import axios from "axios";

export const getTodo = async () => {
  const { data } = await axios.get("http://localhost:3100/todos");
  return data;
};

export const getDetail = async ({ queryKey }) => {
  const { data } = await axios.get(
    `http://localhost:3100/todos/${queryKey[1]}`
  );
  return data;
};

export const getComment = async ({ queryKey }) => {
  const { data } = await axios.get(
    `http://localhost:3100/todos/${queryKey[1]}/comment`
  );
  return data;
};
