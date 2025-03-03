import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import surveyReducer from './slices/survey.slice';
import uiReducer from './slices/ui.slice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['survey'],
  blacklist: ['ui'],
};

const rootReducer = combineReducers({
  survey: surveyReducer,
  ui: uiReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
