import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./pages/index";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["columnSlice"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux Toolkit ile birlikte bir store oluşturun
export const store = configureStore({
  reducer: persistedReducer,
});

// Persisted store'u oluşturun
export const persistor = persistStore(store);
