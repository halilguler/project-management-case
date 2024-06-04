import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  // persistStore
} from "redux-persist";

const rootReducer = combineReducers({
  // TODO: add reducers
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
