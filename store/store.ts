import { configureStore } from "@reduxjs/toolkit";
import todoSearchReducer from "./todoSearchSlice";
import userSearchReducer from "./userSearchSlice";
import groupSearchReducer from "./groupSearchSlice";

export const store = configureStore({
  reducer: {
    todoSearch: todoSearchReducer,
    userSearch: userSearchReducer,
    groupSearch: groupSearchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
