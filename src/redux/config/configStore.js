import { configureStore } from "@reduxjs/toolkit";

import indiaReducer from "../modules/indiaSlice";
import post from "../modules/lydiaSlice";

const store = configureStore({
  reducer: { indiaReducer, post },
});

export default store;
