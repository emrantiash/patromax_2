import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Endpoint from '../../utils/path/Path';
import { post } from "../../utils/query/Query";


export const getBankName = createAsyncThunk("bank-name", async (data) => {
  try {
    const response = await post(Endpoint.bank_name, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

const initialStateValues = {
  login: false,
  success: false,
  isLoading: false,
  data: {},
  banks: [],
  isError: false,
  msg: "Network Error",
  active: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState: initialStateValues,
  reducers: {
    storeOrder: (state, action) => {
      state.data = action.payload;
    },
    // temporary
    activeOrder: (state, action) => {
      state.active = action.payload; //[...state.active,action.payload]
    },
   
  },
  extraReducers: (builder) => {
    builder.addCase(getBankName.pending, (state) => {
      state.isLoading = true; // Set loading state
    });

    builder.addCase(getBankName.fulfilled, (state, action) => {
      state.isLoading = false; // Loading finished
      state.banks = bankName(action.payload.message)
    });

    builder.addCase(getBankName.rejected, (state,action) => {
      state.login = false; // Reset login status
      
    });
  },
});

export const { storeOrder, activeOrder } = orderSlice.actions;

export default orderSlice.reducer;

function bankName(data){
  let arr = [];
  data.map((data, index) =>
    arr.push({
      name : data.description.split(',')[0],
      value : data.description.split(',')[0] + ':' + data.value 
    }),
  );
  return arr;
}
