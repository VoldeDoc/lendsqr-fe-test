import auth from "./auth";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  auth,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
