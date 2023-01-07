import { configureStore } from "@reduxjs/toolkit";
import todoSlice from './Todoslice'

const store = configureStore({
reducer:{
    todos : todoSlice,
},
})

export default store;