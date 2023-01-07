const { request, response } = require("express");
const express = require("express");
const app = express();
const mongoose = require("mongoose")
const TodoModel = require('./Models/TodoSchema')
const cors = require("cors");
const router = require("./routes/routes");
const PORT = process.env.PORT || 5000;
const BASE_URI = `mongodb+srv://admin:12345@cluster0.nx32dqa.mongodb.net/test`
mongoose.connect(BASE_URI).then((res)=>console.log("Connenct")).catch((err)=>console.log(err))


app.use(cors())
app.use(express.json())
app.use("/api",router)
// SAMPLE GET API
app.get("/api/getname",(request,response)=>{
    response.send("Zohaib Third Change Api")
})

//GET API
// app.get("/api/gettodo",(req,res,next)=>{
//     TodoModel.find({},(err,data)=>{
//         if(err){
//             res.send("err",err)
//         }
//         else{
//             res.json(data)
//         }
//     })
// })




// POST API
// app.post('/api/add',(req,res)=>{
//     // console.log(res)
//     console.log(req.body)
//     const todo = new TodoModel(req.body.data)
//     console.log(todo)
//     todo.save()
//     // TodoModel.create(req.body,(err,data)=>{
//     //     if(err){
//     //         res.send('err',err)
//     //     }
//     //     else{
//     //         console.log(data, "[[[[[[[[[[[[[[")
//     //         res.json(data)

//     //     }
//     // })
// })

//UPDATE API
// app.put("/api/post",(req,res,next)=>{
//     console.log(req.body);
//     const {updateInput} = req.body 
//     const {id} = req.body;
//     // console.log(id)
// // console.log(id);
//    TodoModel.findByIdAndUpdate(id,{todo:updateInput},(err,data)=>{
//     if(err){
//         res.send("err",err)
//     }
//     else{
//         res.json(data)
//     }
//    })
// })
//DELETE API
// app.delete("/api/delete",(req,res)=>{
//     console.log(req.body)
//     const {id} = req.body;
//     // TodoModel.findByIdAndDelete(id).then(res=>{
//     //     console.log(res)
//     //     res.json({res})
//     // }).catch(err=>console.log(err))
//     TodoModel.findByIdAndDelete(id,(err,data)=>{
//         if(err){
//             res.send('err',err)
//         }
//         else{
//             console.log("delete",data)
//             res.json(data)
//         }
//     })

// })

app.listen(PORT,()=>console.log("Hello NodeJs"));