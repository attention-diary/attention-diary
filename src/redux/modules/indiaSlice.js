import { createSlice } from '@reduxjs/toolkit';

import { fetchGetPost } from '../thunk/indiaThunk';

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
  reducers: {},
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
  }
});

// export const {} = indiaSlice.actions;

const indiaReducer = indiaSlice.reducer;
export default indiaReducer;
