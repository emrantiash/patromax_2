import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoint from "../../utils/path/Path";
import { post,noHeaderpost } from "../../utils/query/Query";


export const getLogin = createAsyncThunk('get-login', async (data) => {
  console.log("==action===",data)
  try {
    const response = await noHeaderpost(Endpoint.login, data)
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
  isError: false,
  token: "",
  msg : "Network Error",
  language : 0 
}

export const loginSlice = createSlice({
  name: 'login',
  initialState: initialStateValues,
  reducers: {
    signout: (state, action) => {
      state.login = false
    },
    signIn : (state,action) => {
      state.login  = true 
    },
    setLanguage : (state,action) =>{
      state.language =  action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getLogin.pending, (state) => {
      state.isLoading = true; // Set loading state
    });

    builder.addCase(getLogin.fulfilled, (state, action) => {
      state.isLoading = false; // Loading finished
      state.login = true; // Set login status
      state.data = action.payload.user_details;
      const { api_key, api_secret } = action.payload.key_details || {};
      const token = `${api_key}:${api_secret}`; // Set token
      state.token = token;
      // localStorage.setItem("SECRET_KEY", data);

      setLocalStorage(token);
    });

    builder.addCase(getLogin.rejected, (state) => {
      state.login = false; // Reset login status
      state.isError = true; // Indicate an error
      state.isLoading = false; // Loading finished
      state.errorMsg = "Network Error"; // Set error message
    });
  },
  
})

// Action creators are generated for each case reducer function
// export const { setlogin } = loginSlice.actions

export const { signIn , signout, setLanguage } = loginSlice.actions

export default loginSlice.reducer

function setLocalStorage(data) {
  // const encryptedData = CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
  // localStorage.setItem("SECRET_KEY", data);
  AsyncStorage.setItem("SECRET_KEY", data)
}