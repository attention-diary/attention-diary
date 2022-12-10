import { createSlice } from "@reduxjs/toolkit";

import {
  __getTodos,
  __postTodos,
  __deleteTodos,
  __updateTodos,
  __postComment,
  __getDetail,
} from "../thunk/thunk";

let initialState = {
  todos: [],
  isLoading: false,
  error: null,
};

const todos = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__getTodos.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(__getTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.isLoading = false;
    });
    builder.addCase(__getTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(__postTodos.fulfilled, (state, action) => {
      state.todos.push(action.payload);
    });
    builder.addCase(__postComment.fulfilled, (state, action) => {});
  },
});

export const {} = todos.actions;

export default todos.reducer;
