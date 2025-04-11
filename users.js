// import express
import express from "express";
import mongoose from "mongoose";


const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://sindhura1:sindhura1@cluster0.h5yizmm.mongodb.net/')
.then(()=>{
    console.log("connected")
})
.catch((err)=>{
    console.log("connection Unsuccessful");
})

const userSchema  = new mongoose.Schema({
    name : String,
    email : String,
    password : String
});

const User = mongoose.model('User',userSchema);


app.get('/',(req,res)=>{
    res.send("You are in Route Page...");
});

// body -> {name, email, password}

app.post('/create',(req,res)=>{
    const {name,email,password} = req.body;
    console.log(name,email,password);
    // send to mongodb
    User.create({
        name : name,
        email : email,
        password : password
    })
    .then(()=>{
        console.log("user created")
    })
    .catch((err)=>{
        console.log("there is an error");
    })
    res.send("Helo wore");
});


app.get('/getUsers',async(req,res)=>{
    const users = await User.find();
    res.send(users);
})

// /getByemail
// req.body {email}
// res => user details

app.get('/getByemail',async(req,res)=>{
    const emaild = req.body.email;
    // db call to get user by email
    const user = await User.findOne({email:emaild})
    res.send(user);
})

app.listen(3000,()=>{
    console.log("Server is Running on Port 3000");
})