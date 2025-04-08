import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import Endpoint from '../../utils/path/Path';
// import { post } from '@/app/utils/query/Query';

// export const marchantLogin = createAsyncThunk('login', async (data) => {

//   try {
//     const response = await post(Endpoint.marchantLogin, data)
//     return response.data
//   }
//   catch (error) {
//     return error.response.data
//   }

// }

// )

const initialStateValues = {
  login: false,
  success: false,
  isLoading: false,
  data: [],
  isError: false,
  token: "",
  msg : "Network Error"
}

export const productSlice = createSlice({
  name: 'product',
  initialState: initialStateValues,
  reducers: {
    storeProduct: (state, action) => {
      state.data = action.payload
    }
  },
  
})

// Action creators are generated for each case reducer function
// export const { setlogin } = loginSlice.actions

export const { storeProduct } = productSlice.actions

export default productSlice.reducer