import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import secureApi from "../../api/axiosSecure";


export const getPosts = createAsyncThunk(
    "fetch/post",
    async (_,thunkAPI)=>{
        try{
            const res = await secureApi.get("/posts")
            return res.data

        }catch(err){
            thunkAPI.rejectWithValue(err.response?.data?.message || "Internal server error!")
        }
    }
)

export const createPost = createAsyncThunk(
      "create/post",
      async (data,thunkAPI) =>{
        try{
          const res = await secureApi.post("posts",data)
          if(res.status === 200){
            return res?.data
          }

        }catch(err){
          thunkAPI.rejectWithValue(err.response?.data?.message || "Data not uploaded!")
        }
      }
    )


 const postSlice = createSlice({
    name:"post",
    initialState:{
        posts:[],
        loading:false,
        error:null,
    },
    reducers:{
      resetError:(state)=>{
        state.error = null
      }
    },
     extraReducers: (builder) => {
    builder

      // =========================
      // GET POSTS
      // =========================

      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })

      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =========================
      // CREATE POST
      // =========================

      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createPost.fulfilled, (state,action) => {
        state.loading = false;
        state.success = true;
        state.posts = [action?.payload,...state.posts]
      })

      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =========================
      // UPDATE POST
      // =========================

    //   .addCase(updatePost.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.success = true;
    //     state.posts = state.posts.map((post) =>
    //       post.id === action.payload.id ? action.payload : post
    //     );
    //   })

    //   .addCase(updatePost.pending, (state) => {
    //     state.loading = true;
    //   })

    //   .addCase(updatePost.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   })

      // =========================
      // DELETE POST
      // =========================

    //   .addCase(deletePost.pending, (state) => {
    //     state.loading = true;
    //   })

    //   .addCase(deletePost.fulfilled, (state, action) => {
    //     state.loading = false;

    //     state.posts = state.posts.filter(
    //       (post) => post.id !== action.payload
    //     );
    //   })

    //   .addCase(deletePost.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   });
  },
 })

 export const {resetError} = postSlice.actions
 export default postSlice.reducer