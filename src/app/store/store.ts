import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {productsAPI} from '../service/ProductServices'
import { userAPI } from '../service/UserServices';
import tokenReducer from "../service/TokenServices";
import {authAPI} from "../service/AuthService";

const rootReducer = combineReducers({
  [productsAPI.reducerPath]: productsAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
  token: tokenReducer

});

export const createStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([userAPI.middleware, productsAPI.middleware, authAPI.middleware])
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof createStore>
export type AppDispatch = AppStore['dispatch']


