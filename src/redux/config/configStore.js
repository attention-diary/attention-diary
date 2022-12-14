import { configureStore } from "@reduxjs/toolkit";

import indiaReducer from "../modules/indiaSlice";
import lydiaReducer from "../modules/lydiaSlice";

const store = configureStore({
  reducer: { indiaReducer, lydiaReducer },
});

export default store;
