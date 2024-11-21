import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import limitsReducer from './slices/limitsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    limits: limitsReducer,
  },
});

export default store;
