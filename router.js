var express=require("express");
var router = express.Router();

const credential = {
    email:"admin@gmail.com",
    password : "12345678"
}

//login user
router.post('/login',(req,res)=>{
    if(req.body.email==credential.email && req.body.password==credential.password){
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
        //res.end("Wellcome");
    }else{
        if(req.body.email != credential.email ){
            res.end("Invalid Username");
        }
        else{
            res.end("Invalid Password");
        }
    }
});


//dashboard
router.get('/dashboard',(req,res)=>{
    if(req.session.user){
         res.render('dashboard',{user:req.session.user});
    }else{
        res.send("user m4 gd3");
    }
});

//log out
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('base',{title:"SMSM Login",logout : "logout done!"})
        }
    })
})

module.exports =router;