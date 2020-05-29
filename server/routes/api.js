const express = require ('express');

const jwt = require('jsonwebtoken');
const router = express.Router();
// const config = require('../config/database');
const User = require('../models/user');



function verifyToken(req,res,next) {
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    const token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('Unauthorized request')
    }
    const payload = jwt.verify(token,'secretKey')
    if(!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}


router.get('/',(req,res) =>{
    res.send("Api routes")
})


router.post('/register',(req,res)=> {
const userData = req.body
const user = new User(userData)
user.save((err,registeredUser) => {
    if(err){
        console.log(err)
    }else{
        const payload = {subject:registeredUser._id}
        const token=jwt.sign(payload,'secretKey') 
        res.status(200).send({token})
    }
})
})


router.post('/login',(req,res) =>{
    const userData = req.body
    User.findOne({email:userData.email},(err,user) =>{
        if(err){
            console.log(err);
        }else{
            if(!user){
                res.status(401).send('Invalid email')
            }
            else if (user.password !== userData.password){
                res.status(401).send('Invalid password')
                   }
                   else{
                    const payload = {subject:user._id}
                    const token=jwt.sign(payload,'secretKey') 
                       res.status(200).send({token})
                   }
        }
        
        
    })
})

router.get('/events',(req,res) =>{
    const events =[
       { 
       "_id": "1",
       "name":"nnn",
       "description":"hhh",
       "date":"215"
    },
    { 
        "_id": "2",
        "name":"nnn",
        "description":"hhh",
        "date":"215"
     },
     { 
        "_id": "3",
        "name":"nnn",
        "description":"hhh",
        "date":"215"
     },
     { 
        "_id": "4",
        "name":"nnn",
        "description":"hhh",
        "date":"215"
     },
     { 
        "_id": "5",
        "name":"nnn",
        "description":"hhh",
        "date":"215"
     },
     { 
        "_id": "6",
        "name":"nnn",
        "description":"hhh",
        "date":"215"
     }
    ]
    res.json(events)
})


router.get('/special',verifyToken, (req,res) =>{
    const events =[
       { 
       "_id": "1",
       "name":"special nnn",
       "description":"hhh",
       "date":"215"
    },
    { 
        "_id": "2",
        "name":" special nnn",
        "description":"hhh",
        "date":"215"
     },
     { 
        "_id": "3",
        "name":" special nnn",
        "description":"hhh",
        "date":"215"
     },
     { 
        "_id": "4",
        "name":"nnn",
        "description":"hhh",
        "date":"215"
     },
     { 
        "_id": "5",
        "name":"nnn",
        "description":"hhh",
        "date":"215"
     },
     { 
        "_id": "6",
        "name":"nnn",
        "description":"hhh",
        "date":"215"
     },
    ]
    res.json(events)
})


router.get("/getuser", (req, res) => {
    console.log('get req for all users');
  User.find({})
  .exec(function(err,Users) {
      if(err){
          console.log("error fetching user data");
      }else{
        res.json(Users );
      }
   
  
    });
   
  });

  router.put('/update/:id', (req, res, next) => {
    const user = { _id: req.params.id };
    User.updateOne(user, {
            email: req.body.email,
            password:req.body.password
    }).then(doc => {
      if (!doc) {
        return res.st(404).end();
      }
      return res.status(200).json(doc);
    })
      .catch(err => next(err));
  })
  

  router.delete('/delete/:id', (req, res, next) => {
    User.deleteOne({ _id: req.params.id }).then(document => {
      res.json({ status: 200, message: 'Users data deleted Successfully', document: document });
    })
      .catch(err => next(err));
  })
  
  router.get("/:id", (req, res, next) => {
    User.findById(req.params.id).then(documents => {
      if (documents) {
        res.status(200).json(documents);
      } else {
        res.status(404).json({ message: 'data not found' });
      }
    });
  });
  


module.exports = router