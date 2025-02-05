import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./auth.slice"
import { api } from '../rtkQuery/query'
export default configureStore({
    reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
      
      
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})