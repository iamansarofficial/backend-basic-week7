const express = require('express')
const app = express()

app.set('view engine','ejs')


const tableData = [
    {name:"ansar",email:"ansar@gmail.com",number:99244444},
    {name:"vyshnav",email:"vy@gmail.com",number:992555555},
    {name:"azhar",email:"azhar@gmail.com",number:99266666},
    {name:"aslam",email:"aslam@gmail.com",number:99233333},
   
]

app.get('/',(req,res)=>{
   res.render('index.ejs',{tableData})
})
app.use(express.static('public'));

app.listen(4000,()=>{
    console.log("started");
})