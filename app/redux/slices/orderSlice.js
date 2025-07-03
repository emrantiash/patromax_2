import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import Endpoint from '../../utils/path/Path';
// import { post } from '@/app/utils/query/Query';


const initialStateValues = {
  login: false,
  success: false,
  isLoading: false,
  data: {},
  isError: false,
  msg : "Network Error",
  active : []
}

export const orderSlice = createSlice({
  name: 'order',
  initialState: initialStateValues,
  reducers: {
    storeOrder: (state, action) => {
      state.data = action.payload
    },
    // temporary 
    activeOrder : (state,action) =>{
      state.active = action.payload //[...state.active,action.payload]
    }
  },
  
})



export const { storeOrder,activeOrder } = orderSlice.actions

export default orderSlice.reducer