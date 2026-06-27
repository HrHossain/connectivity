import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import secureApi from "../../api/axiosSecure";

const initialState ={
    profile:null,
    posts:[],
    loading:false,
    error:null

}
export const fetchProfile = createAsyncThunk(
    "fetch/fetchProfile",
    async (id,thunkAPI)=>{
        try {
      const res = await secureApi.get(`/profile/${id}`);
      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
    }
)

const profileSlice = createSlice({

    name:'profile',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchProfile.pending,state=>{
            state.loading = true,
            state.error = null
        })
        .addCase(fetchProfile.fulfilled,(state,action)=>{
            state.profile = action.payload.user
            state.posts = action.payload.posts
            state.loading = false

        })
        .addCase(fetchProfile.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export default profileSlice.reducer