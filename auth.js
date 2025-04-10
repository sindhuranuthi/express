import express from "express";
import zod from "zod";

const app = express();


app.use(express.json());


// signup route
// name
// email = > valid email
// password => 6 7 

const createSchema = zod.object({
    name : zod.string(),
    email : zod.string().email(),
    password : zod.string().min(6)
})

app.post('/create',(req,res)=>{
    const decoded = createSchema.safeParse(req.body);
    if(decoded.success == false){
        return res.send("Sent the incorrect data");
    }
    // db call
    res.send("smt smt")
})


app.listen(3000,()=>{
    console.log('hahaha');
})