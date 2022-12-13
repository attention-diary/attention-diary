import { createSlice } from '@reduxjs/toolkit';

import { fetchGetPost, fetchEditPost, fetchPost } from '../thunk/indiaThunk';

export const indiaSlice = createSlice({
  name: 'india',
  initialState: {
    id: 1,
    name: '',
    title: '',
    content: '',
    comments: [],
    comment: {
      commentId: 1,
      commentContent: '',
    },
  },
  reducers: {
    changeInputField: (state, { payload: { id, value } }) => {
      return {
        ...state,
        [id]: value,
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchGetPost.pending, (state) => {
        state.staus = 'loading'
      })
      .addCase(fetchGetPost.rejected, (state) => {
        state.staus = 'error'
      })
      .addCase(fetchGetPost.fulfilled, (state, { payload: { data } }) => {
        return {
          post: [...data]
        }
      })
      .addCase(fetchEditPost.pending, (state) => {
        state.staus = 'loading'
      })
      .addCase(fetchEditPost.rejected, (state) => {
        state.staus = 'error'
      })
      .addCase(fetchEditPost.fulfilled, (state, { payload }) => {
        return {
          post: [...payload],
        }
      })
      .addCase(fetchPost.pending, (state) => {
        state.staus = 'loading'
      })
      .addCase(fetchPost.rejected, (state) => {
        state.staus = 'error'
      })
      .addCase(fetchPost.fulfilled, (state, { payload }) => {
        return {
          post: [...payload],
        }
      })
  }
});

export const { changeInputField } = indiaSlice.actions;

const indiaReducer = indiaSlice.reducer;
export default indiaReducer;
