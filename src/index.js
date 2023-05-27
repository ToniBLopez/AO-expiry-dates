import React from "react";
import App from './App'
import authReducer from './state/index'
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

/* REDUX STORAGE CONFIGURATION */
const persistConfig = { key: "root", storage, version: 1 }
const persistedReducer = persistReducer(persistConfig, authReducer)
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  // <React.StrictMode> Is only for development mode, remove for production
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  // </React.StrictMode>
)