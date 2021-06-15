import { combineReducers, configureStore } from "@reduxjs/toolkit";
import bookSlice from "./appReducer";

const rootReducer = combineReducers({ app: bookSlice });

export const store = configureStore({ reducer: rootReducer });
