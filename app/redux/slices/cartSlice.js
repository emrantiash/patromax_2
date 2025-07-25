import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { act } from "react";
// import { items } from "../../(drawer)/(tabs)/home/index#";
import Endpoint from '../../utils/path/Path';
import { get , post,put,customPost } from "../../utils/query/Query";

export const getMyCart = createAsyncThunk('get-cart', async (data) => {
  try {
    const response = await post(Endpoint.cart,data)
    return response.data
  }
  catch (error) {
    return error.response.data
  }}
)

export const postOrder = createAsyncThunk('post-order', async (data) => {
  try {
    const response = await post(Endpoint.save,data)
    return response.data
  }
  catch (error) {
    return error.response.data
  }}
)

export const submitOrder = createAsyncThunk("put-order", async (data) => {
  try {
    const response = await put(Endpoint.submit, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const submitPayment = createAsyncThunk("put-payment-order", async (data) => {
  try {
    const response = await put(Endpoint.paymentSubmit, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const submitInvoice = createAsyncThunk("put-invoice-order", async (data) => {
  try {
    const response = await put(Endpoint.invoiceSubmit, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const image_upload = createAsyncThunk("image-ip", async (data) => {
  try {
    const response = await customPost(Endpoint.upload_image, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});



const initialStateValues = {
  login: false,
  success: false,
  isLoading: false,
  data: [],
  isError: false,
  token: "",
  msg: "Network Error",
  total : 0.0,
  due : 0.0,
  compare : {},
  image : ""
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialStateValues,
  reducers: {
    setDataStore : (state,action) =>{
      state.data = action.payload
    },
    storeImage : (state,action) =>{
      state.image = action.payload
    },
    addToCart: (state, action) => {
    //  state.data = state.data ?  [...state.data,action.payload] : [action.payload]
    state.data = state.data ? getMyCode(state.data,action.payload) : [action.payload]
      // state.data = getMyCode(state.data, action.payload);
    },
    addToCompare: (state, action) => {
      //  state.data = state.data ?  [...state.data,action.payload] : [action.payload]
      state.compare = action.payload
        // state.data = getMyCode(state.data, action.payload);
      },
    makeCompareZero : (state, action) => {
        //  state.data = state.data ?  [...state.data,action.payload] : [action.payload]
        state.compare = {}
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
    storeDue : (state,action) =>{
      state.due = action.payload
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
  extraReducers: (builder) => {
    builder.addCase(getMyCart.pending, (state) => {
      state.isLoading = true; // Set loading state
    });

    builder.addCase(getMyCart.fulfilled, (state, action) => {
      state.isLoading = false; // Loading finished
      state.data = action.payload.message
    });

    builder.addCase(getMyCart.rejected, (state) => {
      state.login = false; // Reset login status
      state.isError = true; // Indicate an error
      state.isLoading = false; // Loading finished
      state.errorMsg = "Network Error"; // Set error message
    });
  },
});

// Action creators are generated for each case reducer function
// export const { setlogin } = loginSlice.actions

export const {storeImage,setDataStore,storeTotal,storeDue,addToCart,removeItem,storeData,addToCompare,makeCompareZero,
  positiveSignCalled,negativeSignCalled} = cartSlice.actions;

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
