import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPost, editPost } from '../../api';

export const fetchGetPost = createAsyncThunk('india/fetchGetPost', getPost);
export const fetchEditPost = createAsyncThunk('india/fetchEditPost',
  async (updatePost, thunkAPI) => {
    const { getState } = thunkAPI;
    const state = getState();
    const currPostArr = state.post.post;

    const response = await editPost(updatePost);
    const editedPost = response.data;

    const newPostArr = currPostArr.map(post => {
      return post.id !== editedPost.id ?
        post : editedPost
    });

    return newPostArr;
  }
);
