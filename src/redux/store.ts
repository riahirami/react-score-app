import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { modalSlice } from './features/modalSlice/modalSlice';
import gameSlice from './features/gameSlice/gameSlice';
import globalSlice from './features/globalSlice/globalSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['game', 'modal', 'global'],
};

const rootReducer = combineReducers({
  modal: modalSlice.reducer,
  game: gameSlice.reducer,
  global: globalSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
