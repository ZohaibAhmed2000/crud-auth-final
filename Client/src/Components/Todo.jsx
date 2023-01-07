import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { Fragment, useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InputComp from '../muiComponents/InputComp';
import OutlinedCard from '../muiComponents/CardComp';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from '../store/Todoslice';
import BasicModal from '../muiComponents/ModalComp';
import { Padding } from '@mui/icons-material';
import { toast, Toaster } from 'react-hot-toast';
const Todo = () => {
  ///Changes
  const dispatch = useDispatch()
  const [todos, setTodos] = useState([])
  
const {data,status} = useSelector((state)=>state.todos)
// console.log(data,status)
useEffect(() => {
  dispatch(getTodos())
  // setTodos(data)
},[])

// const data = useSelector((state) => state.todos)
// console.log(data.data)
  
// console.log(todoItems)
///Changes


  useEffect(() => {
    const getUser = async () => {
      const data = await axios.get("http://localhost:5000/api/gettodo");
      // console.log(data.data)
      setTodos(data.data)
      // console.log(data, "data");
    };
    getUser();
  },[]);
  return (
    <>
      <Grid sx={{ marginBottom: "25px" }} container direction="row"
        alignItems="flex-start"
        justifyContent="center">
        <Grid item xs={6} display='flex' sx={{ alignItems: "center", justifyContent: "center" }} >
          <Typography sx={{ mr: 2 }} variant='h6'>Have Task? Add Here</Typography>
          <BasicModal Setvalue={setTodos} value={todos} />
        </Grid>
      </Grid>
      <Grid container direction="row"
        alignItems="flex-start"
        spacing={4}
      >
        {todos?.map((todo, index) => {
          return ( 
            <Fragment key={index}>
              <Grid item xs={3}>
                <OutlinedCard
                  text={todo.todo}
                  index={index}
                  // editTodo={editTodo}
                  // deleteTodo={deleteTodo}
                  value={todos}
                  setValue={setTodos}
                  id={todo._id}
                />
              </Grid>
            </Fragment>
          )
        })}
      </Grid>
    </>
  )
}


export { Todo };