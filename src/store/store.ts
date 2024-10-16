import { legacy_createStore as createStore, combineReducers } from 'redux';
import { tasksReducer } from './tasksReducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
});

export const store = createStore(rootReducer);

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
