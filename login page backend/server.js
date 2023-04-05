if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}



const express = require('express')
const app = express()
const bcrypt = require('bcrypt')//import bcrypt
//const e = require('express')
const initializePassport = require('./passport-config')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
    )

const users = []

app.use(express.urlencoded({extended:false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride("_method"))

app.post("/login",checkNotAthenticted,passport.authenticate("local", {
    successRedirect:"/",
    failureRedirect:"/login",
    failureFlash:true
    
}))

//for register
app.post('/register',checkNotAthenticted,async(req,res)=>{
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id:Date.now().toString(),
            name:req.body.name,
            email:req.body.email,
            password: hashPassword
        })
        console.log(users);
        res.redirect('/login')
    } catch (e) {
        console.log(e);
       res.redirect('/register') 
    }
})


//routers
app.get('/',checkAthenticted,(req,res)=>{
    res.render('index.ejs',{name:req.user.name})
})

app.get('/login',checkNotAthenticted,(req,res)=>{
    res.render('login.ejs')
})
app.get('/register',checkNotAthenticted,(req,res)=>{
    res.render('register.ejs')
})
//end routers

app.delete("/logout",(req,res)=>{
    req.logout(req.user, err =>{
        if(err) return next(err)
        res.redirect("/")
    })
})

function checkAthenticted(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}
function checkNotAthenticted(req,res,next){
    if(req.isAuthenticated()){
       return res.redirect("/")
    }
    next()
}

app.listen(3000)