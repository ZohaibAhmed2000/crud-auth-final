import { Box, Button, Modal } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import InputComp from './InputComp';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  export default function BasicModal({ Setvalue, value }) {
    const [valuetext, setValuetext] = React.useState("")
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const todoValue = () => {
      console.log(valuetext)
      setValuetext("")
      axios.post("http://localhost:5000/api/addtodo",{data:{todo:valuetext}},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(res => {
        console.log("HERrrrRRRRRRR");
        const token = localStorage.getItem("token")
        console.log(token,"TOKEN")
        console.log(res)
      })
      .catch((err)=>console.log(err))
      setOpen(false)
    }
  
    return (
      <div>
        <Button onClick={handleOpen} variant="contained" size='large'>Add Todo</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <InputComp label='Enter New Todo...' onChange={(e) => { setValuetext(e.target.value) }}  />
            <Button onClick={todoValue} sx={{ marginTop: "6px" }} size="large" variant='contained'>Add</Button>
          </Box>
        </Modal>
      </div>
    );
  }