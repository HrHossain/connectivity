import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  type:'',
  title: "",
  message: "",
  redirectTo: null,
};

const modalSlice = createSlice({
    name:"modal",
    initialState,
    reducers:{
        openModal:(state,action)=>{
            state.isOpen = true,
            state.type = action.payload.type
            state.title = action.payload.title
            state.message = action.payload.message
            state.redirectTo = action.payload.redirectTo || null

        },
        closeModal:(state)=>{
            state.isOpen = false;
            state.title = "";
            state.message = "";
            state.redirectTo = null;
        }
    }
})

export const {openModal,closeModal} = modalSlice.actions
export default modalSlice.reducer