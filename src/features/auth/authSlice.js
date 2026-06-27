import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    user:null,
    token:localStorage.getItem("token") || null,
    isAuthenticated:false,
    isLoading:false,
    isError:false
}

// registration
export const registerUser = createAsyncThunk(
    "auth/registration",
    async(userData,{rejectWithValue})=>{
        try{
            const res = await axios.post(`{import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,userData)
            
            return res.data
        }catch(error){
           
            return rejectWithValue(error.response?.data?.error || "Something went wrong")
        }

    }
)
// login
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ( credentials, thunkApi ) => {
        try{
            const response = await axios.post(`{import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,credentials)
            return response.data
        }catch(err){
            return thunkApi.rejectWithValue(err)
        }
    }
)
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout:(state)=>{
            state.user = null
            state.token = null
            state.isAuthenticated = false
            localStorage.removeItem("token")
        },
        
    },
    extraReducers:(builder)=>{
        // register
        builder
        .addCase(registerUser.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.token.token;
            console.log(action.payload.token)
            localStorage.setItem("token",action.payload.token)
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.isLoading = false
            state.error = action.payload
        })
        // login
        builder
        .addCase(loginUser.pending,(state)=>{
            state.isLoading = true

        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading = false
            state.user = action.payload.user
            state.token = action.payload.token.token
            localStorage.setItem("token",action.payload.token.token)
            state.isAuthenticated = true
        })
        .addCase(loginUser.rejected,(state)=>{
            state.isLoading = false
            state.isError = true
        })
    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer