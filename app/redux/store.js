import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import ExpoFileSystemStorage from "redux-persist-expo-filesystem";
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import loginReducer from './slices/loginSlice';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
// import storage from 'redux-persist/lib/storage'



import { persistReducer } from 'redux-persist';
// import { combineReducers } from '@reduxjs/toolkit';
import { combineReducers } from "redux";



const persistConfig ={
    key : "root",
    storage :AsyncStorage
}

const reducer = combineReducers({
    loginReducer: loginReducer,
    productReducer : productReducer,
    cartReducer : cartReducer,
    orderReducer : orderReducer

});

const persistedReducer = persistReducer(persistConfig,reducer)

export const store = configureStore({
    reducer : persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});