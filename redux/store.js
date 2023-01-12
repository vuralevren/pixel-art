import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createWrapper } from "next-redux-wrapper";
import rootSaga from "./rootSaga";

import { authSlice } from "./auth/authSlice";
import { pixelSlice } from "./pixel/pixelSlice";
import { realtimeSlice } from "./realtime/realtimeSlice";
import { colorSlice } from "./color/colorSlice";

const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: "root",
  storage,
};

const makeStore = () => {
  const store = configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [pixelSlice.name]: pixelSlice.reducer,
      [realtimeSlice.name]: realtimeSlice.reducer,
      [colorSlice.name]: persistReducer(persistConfig, colorSlice.reducer),
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: true,
        serializableCheck: false,
      }).prepend(sagaMiddleware),
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

export const wrapper = createWrapper(makeStore);
