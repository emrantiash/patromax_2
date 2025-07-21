import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoint from "../../utils/path/Path";
import { post,noHeaderpost } from "../../utils/query/Query";


export const getDashboard = createAsyncThunk('get-board', async (data) => {
  try {
    const response = await post(Endpoint.dashboard, data)
    return response.data
  }
  catch (error) {
    return error.response.data
  }

})
export const getHistory = createAsyncThunk('get-history', async (data) => {
  try {
    const response = await post(Endpoint.history, data)
    return response.data
  }
  catch (error) {
    return error.response.data
  }

})

export const getNotification = createAsyncThunk('get-notification', async (data) => {
  try {
    const response = await post(Endpoint.notification, data)
    return response.data
  }
  catch (error) {
    return error.response.data
  }

})
export const getActiveOrder = createAsyncThunk('get-active-order', async (data) => {
  try {
    const response = await post(Endpoint.history, data)
    return response.data
  }
  catch (error) {
    return error.response.data
  }

})



const initialStateValues = {

  isLoading: false,
  data: [],
  info : {},
  order_active : ""
 
}

export const historySlice = createSlice({
  name: 'history',
  initialState: initialStateValues,
  
  extraReducers: (builder) => {
    builder.addCase(getDashboard.pending, (state) => {
      state.isLoading = true; // Set loading state
    });

    builder.addCase(getDashboard.fulfilled, (state, action) => {
     state.data =  action.payload.message.weekly_data
     state.info = action.payload.message.stats
    });

    builder.addCase(getDashboard.rejected, (state,action) => {  
      state.isLoading = false; // Loading finished
    
    });
    builder.addCase(getActiveOrder.pending, (state) => {
      state.isLoading = true; // Set loading state
    });

    builder.addCase(getActiveOrder.fulfilled, (state, action) => {
     state.order_active =  action.payload.message;
     state.isLoading = false ;
    });

    builder.addCase(getActiveOrder.rejected, (state,action) => {  
      state.isLoading = false; // Loading finished
    
    });
  },
  
})

// Action creators are generated for each case reducer function
// export const { setlogin } = loginSlice.actions

// export const { signIn , signout, setLanguage } = loginSlice.actions

export default historySlice.reducer

