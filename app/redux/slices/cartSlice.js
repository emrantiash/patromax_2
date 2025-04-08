import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { act } from "react";
// import { items } from "../../(drawer)/(tabs)/home/index#";
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
  msg: "Network Error",
  total : 0.0
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialStateValues,
  reducers: {
    addToCart: (state, action) => {
    //  state.data = state.data ?  [...state.data,action.payload] : [action.payload]
    state.data = state.data ? getMyCode(state.data,action.payload) : [action.payload]
      // state.data = getMyCode(state.data, action.payload);
    },
    removeItem: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload.id);
    },

    storeData: (state, action) => {
      state.data = action.payload;
    },

    storeTotal : (state,action) =>{
      state.total = action.payload
    },
    positiveSignCalled: (state, action) => {
      state.data = [
        ...state.data.filter((item) => item.id !== action.payload.id),
        {
          ...action.payload,
          quantity: parseInt(action.payload.quantity) + 1,
          price:
            parseInt(action.payload.basePrice) *
            (parseInt(action.payload.quantity) + 1),
        },
      ];
    },

    negativeSignCalled: (state, action) => {
      state.data = [
        ...state.data.filter((item) => item.id !== action.payload.id),
        {
          ...action.payload,
          quantity: parseInt(action.payload.quantity) - 1,
          price:
            parseInt(action.payload.basePrice) *
            (parseInt(action.payload.quantity) - 1),
        },
      ];
    },
  },
});

// Action creators are generated for each case reducer function
// export const { setlogin } = loginSlice.actions

export const {storeTotal,addToCart,removeItem,storeData,positiveSignCalled,negativeSignCalled} = cartSlice.actions;

export default cartSlice.reducer;

function getMyCode(data, action) {
  let _flag = false 
  let _id = -1
  data.map((data,index)=>{
   if(data.id==action.id)
   _flag = true
  _id = index
  })
  if(_flag)
  {
    // return [...data]
    return data = [
      ...data.filter((item) => item.id !== action.id),
      {
        ...action,
        quantity:  parseInt(action.quantity) + data[_id].quantity,
        price:
          parseInt(action.basePrice) *
          (parseInt(action.quantity) + 1),
      },
    ];
  }
  
  // return [...data]
else
  return [...data, action];
   
  
}
