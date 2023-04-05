const express = require('express')
const app = express()

app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
  const list = ["apple","banana","orange","dates","chilli"]
  res.render('index.ejs',{list})
})

app.listen(4000,()=>{
    console.log("started");
})