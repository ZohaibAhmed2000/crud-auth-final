import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BasicModal from '../Components/Todo';
import InputComp from './InputComp';
import axios from 'axios';
import { Modal } from '@mui/material';

let today = new Date().toLocaleDateString()
// console.log(today)

export default function OutlinedCard({ text, value, setValue,index, id }) {

 const [editOpen,setEditOpen] = React.useState(false)
 const [updateInput,setUpdateInput] = React.useState("")
  function deleteTodo() {
    axios.delete("http://localhost:5000/api/deletetodo", { data: { id: id } })
      .then((res) => { console.log(res) })
      .catch((err) => { console.log(err); });
    console.log("Delete")
    value.splice(index, 1);
    setValue([...value])
  }
  function editTodo(id) {
    console.log(id);
  setEditOpen(true)
  setUpdateInput(text)
  console.log(value,"I am from Edit")
  }
  function updateTodo(){
    console.log(id)
    console.log(updateInput)
    setEditOpen(false)
    console.log("Update Clicke");
    value.splice(index,1,{id,todo:updateInput}) ;
    setValue([...value]);
    axios.put("http://localhost:5000/api/updatetodo",{id,updateInput})
    .then((res) => { console.log(res) })
    .catch((err) => { console.log(err) });
  }

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <React.Fragment>
          {editOpen?
          <div style={{marginTop:"5px"}}>
          <InputComp 
          onChange={(e)=>setUpdateInput(e.target.value)} 
          value={updateInput} 
          label="Updata Todo..." 
          /><Button onClick={updateTodo} variant='contained'>Update</Button>
          </div> 
          :(<> <CardContent sx={{ background: "#073b4c", color: "#fff",textAlign:"center"}}>
            <Typography variant='h5' color="text.black" gutterBottom>
              Task Details
            </Typography>
            <Typography variant="p" component="div">
              Created On {today}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.white">
              Description
            </Typography>
            <Typography variant="body2">
              {text}
            </Typography>
          </CardContent>

          <Box sx={{ backgroundColor: "#457b9d", justifyContent: "space-between" }} display="flex">
            <Box sx={{ alignItems: "center", color: 'black', fontWeight: "600" }} display="flex">
              Edit<EditIcon onClick={()=>editTodo(index)} color="action" sx={{ marginLeft: '5px', color: "black" }} /></Box>
            <Box sx={{ alignItems: "center", color: 'black', fontWeight: "600" }} display="flex">
              Delete<DeleteIcon onClick={deleteTodo} color="action" sx={{ marginLeft: '5px', color: "black" }} /></Box>
          </Box> </>)
          }
          

        </React.Fragment>
      </Card>
    </Box>
  );
}




// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// export function NasicModal({ Setvalue, value }) {
//   const [valuetext, setValuetext] = React.useState("")
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const todoValue = () => {
//     axios.post("http://localhost:5000/api/add",{data:{todo:valuetext}})
//     .then(res => {
//       console.log(res)
//       setValuetext("")
//       Setvalue([...value, valuetext])
//     })
//     .catch((err)=>console.log(err))
//     setOpen(false)
//   }

//   return (
//     <div>
//       <Button onClick={handleOpen} variant="contained" size='large'>Add Todo</Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <InputComp label='Enter New Todo...' onChange={(e) => { setValuetext(e.target.value) }}  />
//           <Button onClick={todoValue} sx={{ marginTop: "6px" }} size="large" variant='contained'>Add</Button>
//         </Box>
//       </Modal>
//     </div>
//   );
// }