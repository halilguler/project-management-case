import { combineReducers } from "@reduxjs/toolkit";

import homeSlice from "../features/homeSlice";
import modalSlice from "../features/modalSlice";

const rootReducer = combineReducers({
  homeSlice,
  modalSlice,
});

export default rootReducer;
