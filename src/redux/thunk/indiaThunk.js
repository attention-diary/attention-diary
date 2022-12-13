import { createAsyncThunk } from '@reduxjs/toolkit';

import { getPost } from '../../api';

export const fetchGetPost = createAsyncThunk('india/fetchGetPost', getPost);
