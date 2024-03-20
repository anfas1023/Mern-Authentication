import { configureStore } from "@reduxjs/toolkit";
import userRducer  from '../features/user/userSlice'
import userDataReducer from "../features/data/userData";
import adminReducer from '../features/admin/adminslice'
const store=configureStore({
    reducer:{
           userData: userDataReducer,
        admin:adminReducer },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:false
    })
})

export default store 

export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch