import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const axiosApi = (url, options) => {
  const intance = axios.create({ baseURL: url, ...options });
  return intance;
};
const defaultInstance = axiosApi("http://localhost:3100/post");

export const __getPosts = createAsyncThunk(
  "getPosts",
  async (payload, thunkAPI) => {
    try {
      const data = await defaultInstance.get();
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deletePosts = createAsyncThunk(
  "deletePosts",
  async (payload, thunkAPI) => {
    try {
      const data = await defaultInstance.delete(`/${payload.id}`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __updatePosts = createAsyncThunk(
  "updatePosts",
  async (payload, thunkAPI) => {
    try {
      const data = await defaultInstance.put(`/${payload.id}`, payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      alert("서버요청중 오류발생!");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postPosts = createAsyncThunk(
  "postPosts",
  async (payload, thunkAPI) => {
    try {
      const { post } = thunkAPI.getState();
      let maxNum = 0;
      if (post.post.length >= 1) {
        maxNum = post.post.reduce((max, curr) => (max > curr ? max : curr));
      }
      payload.id = maxNum.id + 1;
      const data = await defaultInstance.post("/", payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postComment = createAsyncThunk(
  "postComment",
  async (payload, thunkAPI) => {
    try {
      let newPost = {}; //payload로 넘겨줄 해당글정보
      let newComment = {}; //newPost에 들어갈 새 배열
      const { post } = thunkAPI.getState();
      //find함수로 보내준 payload랑 같은 게시글을 찾음
      newPost = post.post.find((post) => {
        return post.id === payload.id;
      });
      if (payload.isUpdate) {
        //수정할 값이라면 id를 설정해줄 필요없는 로직
        //기존있던 댓글배열에서 수정할 댓글를 찾아서 걸러준 댓글배열
        const newCommentList = newPost.comment.filter((comment) => {
          return comment.commentId !== payload.commentId;
        });
        newComment = {
          commentId: payload.commentId,
          commentContent: payload.commentContent,
        };
        //해당게시글의 정보의 배열부분만 수정된 댓글을 반영해서 교체
        newPost = {
          ...newPost,
          comment: [...newCommentList, newComment],
        };
      } else {
        //새로들어온 댓글이므로 id의 최댓값을 찾는 로직
        let maxNum = 1;
        if (newPost !== undefined && newPost.comment.length >= 1) {
          maxNum = newPost.comment.reduce((max, curr) =>
            max > curr ? max : curr
          );
        }
        newComment = {
          commentId: maxNum.commentId === undefined ? 1 : maxNum.commentId + 1,
          commentContent: payload.commentContent,
        };
        //해당게시글의 정보의 배열부분만 추가된 댓글을 반영해서 교체
        newPost = {
          ...newPost,
          comment: [...newPost.comment, newComment],
        };
      }

      const data = await defaultInstance.put(`/${payload.id}`, newPost);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteComment = createAsyncThunk(
  "deleteComment",
  async (payload, thunkAPI) => {
    try {
      const data = await defaultInstance.put(`/${payload.id}`, payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
