import express from "express";

const app = express();

app.use(express.json())


// routes

app.get('/',(req,res)=>{
    res.send("Hello World")
});


app.get('/:userId',(req,res)=>{
    console.log(req.params);
    
    const {userId} = req.params;
    res.send(`Hello ${userId}`);
});

app.get('/dashboard',(req,res)=>{
    res.send("You are in dashboard")
});

app.get('/about',(req,res)=>{
    res.send("You are in About Page")
});


//post


app.post('/signup',(req,res)=>{
    const {userName,password} = req.body;
    // console.log(req.body);
    // store db 
    console.log(userName,password);
    res.send("User Signed Up successful......");
})

app.listen(3000,()=>{
    console.log("The server is running on port 3000");
});