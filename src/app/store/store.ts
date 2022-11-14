import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {productsAPI} from '../service/ProductServices'
import { userAPI } from '../service/UserServices';

const rootReducer = combineReducers({
  [productsAPI.reducerPath]: productsAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer

});

export const createStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([userAPI.middleware, productsAPI.middleware])
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof createStore>
export type AppDispatch = AppStore['dispatch']


