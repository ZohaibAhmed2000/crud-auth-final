import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const STATUSES= {
idle : "idle",
loading : "loading",
error : "error"
}

const todoSlice = createSlice({
    name :"todo",
    initialState:{
data : [],
status : STATUSES
    },
    extraReducers :(values)=>{
values.addCase(getTodos.pending,(state,action)=>{
    state.status=STATUSES.loading
})
values.addCase(getTodos.fulfilled,(state,action)=>{
    state.status=STATUSES.idle;
    state.data = action.payload;
})
values.addCase(getTodos.rejected,(state,action)=>{
    state.status=STATUSES.error
})
    }


})


const {reducer} = todoSlice;


export const getTodos = createAsyncThunk("apis/fetch", async () => {
    const data = await fetch("http://localhost:5000/api/gettodo");
    const todos = await data.json();
    // console.log(todos)
  
    return todos;
  });

  export default reducer;