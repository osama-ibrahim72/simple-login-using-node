const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const session = require('express-session');
const {v4:uuidv4}=require("uuid");
const router =require('./router');
const app = express();

const port = process.env.PORT||3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');

//load static assets 
app.use('/static',express.static(path.join(__dirname,'public')))

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}));
app.use('/route',router);

// home route
app.get('/',(req,res)=>{
    res.render('base',{title :"SMSM Login"})
})

app.listen(port,()=>{console.log("SMSM on http:///localhost:3000")});