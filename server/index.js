const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//const EmployeeModel = require("./models/Employee");
const UserModel = require("./models/Users");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const nodemailer = require("nodemailer");
const app = express()

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}))
app.use(cookieParser());
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/employee")



const verifyUser = (req, res, next) =>{
    const token = req.cookies.token;
    if(!token){
        return res.json("The token was not available")
    }else{
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err){
                return res.json("Token is wrong")
            } else{
                if(decoded.role === "admin"){
                    next()
                }else{
                    return res.json("not admin")
                }
            }
        })
    }
}

app.get("/dashboard", verifyUser, (req, res) => {
    res.json("Success")
})

app.get('/home', verifyUser, (req, res) => {
        return res.json("Success") 
})

app.post("/login", (req, res) =>{
    const {email, password} = req.body;
    UserModel.findOne({email: email})
     .then(user => {
        if(user) {
            bcrypt.compare(password, user.password, (err, response) =>{
                if(response) {
                    const token = jwt.sign({email: user.email, role:  user.role}, "jwt-secret-key",{expiresIn:"1d"})
                    res.cookie("token", token);
                    return res.json({Status:"Success", role: user.role})
                }
                 else{
                    return res.json("The password is incorrect")
                 }
                })
            } else{
               return res.json("No record existed")
        }
    })
})



app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    bcrypt.hash(password, 10)
    .then(hash => {
        UserModel.create({name, email, password: hash})
    .then(employees => res.json("Success"))
    .catch(err => res.json(err))
    }).catch(err => res.json(err))
    
})



app.post('/forgot-password',async (req, res) => {
    const {email} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if(!user){
            return res.send({Status: "User not exist"})
        }
        const token = jwt.sign({id: user.id, role:  user.role}, "jwt-secret-key",{expiresIn:"1d"})
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'narmada.viveka@gmail.com',
              pass: 'nbvm dyfj jgeo leol'
            }
          });
          
          var mailOptions = {
            from: 'narmada.viveka@gmail.com',
            to: 'nandyvivek98@gmail.com',
            subject: 'reset your password',
            text: `http://localhost:5173/reset-password/${user._id}/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
                return res.send({Status: "Success"})
            }
          });
    })
})

app.post('/reset-password/:id/:token', (req, res) => {
    const {id, token} = req.params;
    const {password} = req.body;

    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
        if(err){
            return res.json({Status: "Error with token"})
        }else{
            bcrypt.hash(password, 10)
            .then(hash => {
                UserModel.findByIdAndUpdate({_id: id}, {password: hash})
                .then(u => res.send({Status: "Success"}))
                .catch(err => res.send({Status: err}))
            })
            .catch(err => res.send({Status: err}))
        }
    })
})


app.listen(3001, ()=>{
    console.log(`Server is running`)
})


