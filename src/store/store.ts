import { configureStore, combineReducers } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice';

const rootReducer = combineReducers({
  toDoList: tasksReducer,
});

export const store = configureStore({ reducer: rootReducer });

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
