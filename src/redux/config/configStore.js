import { configureStore } from "@reduxjs/toolkit";

import post from "../modules/todosSlice";
import indiaReducer from "../modules/indiaSlice";

const store = configureStore({
  reducer: { post, indiaReducer },
});

export default store;
