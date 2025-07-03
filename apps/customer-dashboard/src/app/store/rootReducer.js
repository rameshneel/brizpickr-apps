import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../features/user/store/userSlice';

export const rootReducer = combineReducers({
  user: userReducer,
});
