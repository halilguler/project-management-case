import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  // persistStore
} from "redux-persist";

import columnSlice from "../features/ColumnSlice";
import modalSlice from "../features/ModalSlice";

const rootReducer = combineReducers({
  columnSlice,
  modalSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
