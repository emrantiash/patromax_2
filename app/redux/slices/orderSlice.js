import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import Endpoint from '../../utils/path/Path';
// import { post } from '@/app/utils/query/Query';


const initialStateValues = {
  login: false,
  success: false,
  isLoading: false,
  data: {},
  isError: false,
  msg : "Network Error"
}

export const orderSlice = createSlice({
  name: 'order',
  initialState: initialStateValues,
  reducers: {
    storeOrder: (state, action) => {
      state.data = action.payload
    }
  },
  
})



export const { storeOrder } = orderSlice.actions

export default orderSlice.reducer