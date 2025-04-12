import jwt from "jsonwebtoken";
import express from "express"
import mongoose from "mongoose";
import zod from "zod";

const app=express();
app.use(express.json());

mongoose.connect("mongodb+srv://sindhura1:sindhura1@cluster0.h5yizmm.mongodb.net/")
.then(()=>{
    console.log("Database connected")
})
.catch(()=>{
    console.log("Error in connecting")
})

const userSchema=new mongoose.Schema({
    email: String,
    password: String
})
const likesSchema = new mongoose.Schema({
    count: {
        type: Number,
        required: true,
        default: 0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Like = mongoose.model("Like", likesSchema);
const User=mongoose.model("User",userSchema);

app.get('/',(req,res)=>{
    res.send("Good Morning");
});

const signupSchema = zod.object({
    email : zod.string().email(),
    password : zod.string().min(6)
})

app.post('/signup',async(req,res)=>{
    const decoded  = signupSchema.safeParse(req.body);
    console.log(decoded);
    if(!decoded.success){
        return res.send("Enter valid details");
    }
    
    const {email,password}=decoded.data;
    // send it to db some how
    const response = await User.create({
        email,
        password
    })

    res.send(response);
})


app.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    // find the user in db and get the user details and display it
    const user = await User.findOne({email,password});
    if(!user){
        return res.send("Cant find user");
    }
    const token = jwt.sign({
        id : user.id,
        email : user.email
    },"sindhura");
    res.send(token);
})

app.get('/like',async(req,res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token,'sindhura');
    // now update the like in db
    const response = await Like.create({
        count:1,
        userId :decoded.id
    })
    res.send(response);
})


app.get('/likes',async(req,res)=>{
    const data = await Like.find();
    res.send(data)
})

app.get('/getUserLike',async(req,res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token,'sindhura');
    const response = await Like.find({userId:decoded.id})
    res.send(response);
})




app.listen(3000,()=>{
    console.log("Server on port 3000 is running");
});
