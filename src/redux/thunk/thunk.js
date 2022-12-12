import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const __getPosts = createAsyncThunk(
  "getPosts",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3100/post");
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
      const data = await axios.delete(
        `http://localhost:3100/post/${payload.id}`
      );
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
      const data = await axios.put(
        `http://localhost:3100/post/${payload.id}`,
        payload
      );
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
      console.log(post);
      let maxNum = 0;
      if (post.post.length >= 1) {
        maxNum = post.post.reduce((max, curr) => (max > curr ? max : curr));
      }
      payload.id = maxNum.id + 1;
      const data = await axios.post("http://localhost:3100/post", payload);
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
      const { post } = thunkAPI.getState();
      //find함수로 보내준 payload랑 같은 게시글을 찾음
      let newPost = post.post.find((post) => {
        return post.id === payload.id;
      });

      let maxNum = 1;
      if (newPost !== undefined && newPost.comment.length >= 1) {
        maxNum = newPost.comment.reduce((max, curr) =>
          max > curr ? max : curr
        );
      }
      const newComment = {
        commentId: maxNum.commentId === undefined ? 1 : maxNum.commentId + 1,
        commentContent: payload.commentContent,
      };

      newPost = {
        ...newPost,
        comment: [...newPost.comment, newComment],
      };
      const data = await axios.put(
        `http://localhost:3100/post/${payload.id}`,
        newPost
      );
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
      //댓글을 삭제할때 통째로 기존에 있던 게시글들을 가져와서
      //새로 바꿔끼어주는 형식으로 해줘야될까?
      console.log(payload);
      const data = await axios.put(
        `http://localhost:3100/post/${payload.id}`,
        payload
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
