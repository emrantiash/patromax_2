import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Endpoint from "../../utils/path/Path";
import { post } from "../../utils/query/Query";

export const getLogin = createAsyncThunk('login', async (data) => {

  try {
    const response = await post(Endpoint.login, data)
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
      state.login = Boolean(action.payload.key_details?.api_key); // Set login status
      state.data = action.payload;
      const { api_key, api_secret } = action.payload.key_details || {};
      const token = `${api_key}:${api_secret}`; // Set token
      state.token = token;

      // setLocalStorage(token);
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