const express = require('express')
const app = express()
const PORT = 5000;
const session = require('express-session')
const cookieParser = require('cookie-parser')

app.use(cookieParser());
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:"secret"
})
);

const user = {
    name:"john",
    age:20,
    nationality:"Indian"
}

app.get('/login',(req,res)=>{
    req.session.user = user
    req.session.save()
    res.send("User logged in")
})

app.get('/user',(req,res)=>{
   return res.send(req.session.user)
})

app.get("/logout",(req,res)=>{
    req.session.destroy()
    res.send("User logged out")
})

app.listen(PORT,()=>{
    console.log(`Server at $ {PORT}`)
});