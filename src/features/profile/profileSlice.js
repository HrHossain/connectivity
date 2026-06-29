import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import secureApi from "../../api/axiosSecure";
import { useAsyncValue } from "react-router-dom";

const initialState ={
    user:null,
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
      
      return res?.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
    }
)

export const editProfileBio = createAsyncThunk(
    "profile/editBio",
    async ({id,bio},thunkAPI)=>{
        try{
            const res = await secureApi.patch(`profile/${id}`,{bio})
            console.log(res)
            return res?.data
        }catch(err){
            thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update bio")
        }
    }
)

export const editProfileAvatar = createAsyncThunk(
    "profile/avatar",
    async ({id,formData},thunkAPI)=>{
        try{
            const res = await secureApi.post(`profile/${id}/avatar`,formData)
            console.log(res)
            return res?.data
        }catch(err){
            thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update profile!")
        }
    }
)

const profileSlice = createSlice({

    name:'profile',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        // fetch profile
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
        // edit bio
         .addCase(editProfileBio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProfileBio.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        console.log(action)
      })
      .addCase(editProfileBio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    //   edit avatar

     .addCase(editProfileAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProfileAvatar.fulfilled, (state,action) => {
        state.loading = false;
        state.profile = {
            ...state.profile,
            avatar:action?.payload?.avatar
        }
        console.log(action)
       
      })
      .addCase(editProfileAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    }
})

export default profileSlice.reducer