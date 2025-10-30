import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Endpoint from "../../utils/path/Path";
import {get, post } from "../../utils/query/Query";

export const getWareHouse = createAsyncThunk('get-warehouse', async (data) => {

  try {
    const response = await get(Endpoint.wareHouse, data)
    return response.data
  }
  catch (error) {
    return error.response.data
  }

}

)

const initialStateValues = {
  login: false,
  success: false,
  isLoading: false,
  data: [],
  isError: false,
  token: "",
  msg : "Network Error",
  warehouse : [],
  selectedWareHouse :""
}

export const productSlice = createSlice({
  name: 'product',
  initialState: initialStateValues,
  reducers: {
    storeProduct: (state, action) => {
      state.data = action.payload
    },
    storeWareHouse : (state,action) =>{
      state.selectedWareHouse = action.payload
    }
  },
  extraReducers: (builder) => {
    // builder.addCase(getWareHouse.pending, (state) => {
    //   state.isLoading = true; // Set loading state
    // });

    // builder.addCase(getWareHouse.fulfilled, (state, action) => {
    //   state.isLoading = false; // Loading finished
    //   state.warehouse = wareHouseName(action.payload.message)
    // });

    // builder.addCase(getWareHouse.rejected, (state,action) => {
    //   state.login = false; // Reset login status
      
    // });
  },
  
})

// Action creators are generated for each case reducer function
// export const { setlogin } = loginSlice.actions

export const { storeProduct,storeWareHouse } = productSlice.actions

export default productSlice.reducer

function wareHouseName(data){
  let arr = [];
  data.map((data, index) =>
    arr.push({
      name : data.value.split("PM"),
      value : data.value
    }),
  );
  return arr;
}