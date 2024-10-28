import { configureStore, combineReducers } from '@reduxjs/toolkit';
 import pockemonReducer from './slices/pockemonSlice';


const rootReducer = combineReducers({
   pockemonsData: pockemonReducer,

});

export const store = configureStore({ reducer: rootReducer });

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
