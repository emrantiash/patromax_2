import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoint from "../../utils/path/Path";
import { post,noHeaderpost } from "../../utils/query/Query";

export const getOtp = createAsyncThunk('get-otp', async (data) => {
  try {
    const response = await noHeaderpost(Endpoint.login, data)
    return response.data
  }
  catch (error) {
    return error.response.data
  }

})


export const getLogin = createAsyncThunk('get-login', async (data) => {
  try {
    // const response = await noHeaderpost(Endpoint.varify, data) // with OTP
    const response = await noHeaderpost(Endpoint.login, data) // without OTP
    return response.data
  }
  catch (error) {
    return error.response.data
  }

})

export const getLogout = createAsyncThunk('get-logout', async (data) => {
  try {
    // const response = await noHeaderpost(Endpoint.varify, data) // with OTP
    const response = await noHeaderpost(Endpoint.makelogout, data) // without OTP
    return response.data
  }
  catch (error) {
    return error.response.data
  }

})



const initialStateValues = {
  login: false,
  success: false,
  isLoading: false,
  data: [],
  info : [],
  isError: false,
  error : "",
  token: "",
  msg : "Network Error",
  language : 0 ,
  language_name : "English",
  full_name : "",
  use_name  : "",
  challenge_id : ""
}

export const loginSlice = createSlice({
  name: 'login',
  initialState: initialStateValues,
  reducers: {
    signout: (state, action) => {
      state.login = false,
      state.token = "",
      state.data = [],
      state.info = [],
      state.full_name = "",
      state.use_name = "",
      state.challenge_id = ""
    },
    signIn : (state,action) => {
      state.login  = true 
    },
    setLanguage : (state,action) =>{
      state.language =  action.payload || 0
      
    },
    setLanguageName : (state,action) =>{
      state.language_name = action.payload
    } 
  },
  extraReducers: (builder) => {
    builder.addCase(getOtp.pending, (state) => {
      state.isLoading = true; // Set loading state
    });

    builder.addCase(getOtp.fulfilled, (state, action) => {
      state.isLoading = false; // Loading finished
      state.challenge_id = action.payload.message.challenge_id
    });

    builder.addCase(getOtp.rejected, (state,action) => {
      state.login = false; // Reset login status
      state.isError = true; // Indicate an error
      state.error = action.payload;
      state.isLoading = false; // Loading finished
      state.errorMsg = "Network Error"; // Set error message
    });

    builder.addCase(getLogin.pending, (state) => {
      state.isLoading = true; // Set loading state
    });

    builder.addCase(getLogin.fulfilled, (state, action) => {
      state.isLoading = false; // Loading finished
      state.login = action.payload.message.message == "Logged In" ? true : false ; // Set login status
      state.data = action.payload.message.user_details;
      state.info = action.payload.message.due;
      state.full_name = action.payload.message.customer_name;
      state.use_name = action.payload.message.full_name;
      const { api_key, api_secret } = action.payload.key_details || {};
      const token = `${api_key}:${api_secret}`; // Set token
      state.token = token;
      // localStorage.setItem("SECRET_KEY", data);

      setLocalStorage(token);
    });

    builder.addCase(getLogin.rejected, (state,action) => {
      state.login = false; // Reset login status
      state.isError = true; // Indicate an error
      state.error = action.payload;
      state.isLoading = false; // Loading finished
      state.errorMsg = "Network Error"; // Set error message
    });
  },
  
})

// Action creators are generated for each case reducer function
// export const { setlogin } = loginSlice.actions

export const { signIn , signout, setLanguage,setLanguageName } = loginSlice.actions

export default loginSlice.reducer

function setLocalStorage(data) {
  // const encryptedData = CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
  // localStorage.setItem("SECRET_KEY", data);
  AsyncStorage.setItem("SECRET_KEY", data)
}