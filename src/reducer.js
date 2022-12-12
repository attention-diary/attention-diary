import { createSlice } from '@reduxjs/toolkit';

export const diary = createSlice({
  name: 'diary',
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
    changeInput: (state, { payload: { id, value } }) => {
      const { task } = state;
      return {
        ...state,
        task: {
          ...task,
          [id]: value,
        }
      };
    },
  }
});

export const { changeInput } = diary.actions;

const diaryReducer = diary.reducer;
export default diaryReducer;
