const TodoModel = require("../Models/TodoSchema");

const todoController = {
    getdata: (req,res,next)=>{
        TodoModel.find({},(err,data)=>{
            if(err){
                res.send("err",err)
            }
            else{
                res.json(data)
            }
        })
    },
    adddata: (req,res)=>{
        // console.log(res)
        // console.log(req.body)
        const todo = new TodoModel(req.body.data)
        console.log(todo)
        todo.save()
        res.json({
            message:"created Successfully!!"
        })
       
    },
    update:(req,res,next)=>{
        console.log(req.body);
        const {updateInput} = req.body 
        const {id} = req.body;
        // console.log(id)
    // console.log(id);
       TodoModel.findByIdAndUpdate(id,{todo:updateInput},(err,data)=>{
        if(err){
            res.send("err",err)
        }
        else{
            res.json(data)
        }
       })
    },
    delete:(req,res)=>{
        console.log(req.body)
        const {id} = req.body;
        // TodoModel.findByIdAndDelete(id).then(res=>{
        //     console.log(res)
        //     res.json({res})
        // }).catch(err=>console.log(err))
        TodoModel.findByIdAndDelete(id,(err,data)=>{
            if(err){
                res.send('err',err)
            }
            else{
                console.log("delete",data)
                res.json(data)
            }
        })
    
    }
}

module.exports = todoController;