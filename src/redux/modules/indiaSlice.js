import { createSlice } from '@reduxjs/toolkit';

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
});

// export const {} = indiaSlice.actions;

const indiaReducer = indiaSlice.reducer;
export default indiaReducer;
