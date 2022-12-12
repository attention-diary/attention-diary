import { configureStore } from '@reduxjs/toolkit';

import diaryReducer from './reducer';

const store = configureStore({ reducer: diaryReducer });

export default store;
