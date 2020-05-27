const express = require ('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./routes/api');
const config = require('./config/database');
const PORT = 3000;
const mongoose = require('mongoose');


const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use('/api',api);

mongoose.connect(config.database,
     {useNewUrlParser: true, useUnifiedTopology: true },err =>{
if(err){
    console.error("Error!" + err)

}
else{
    console.log("database connected");
}
     });


app.get('/',function(req,res){
    res.send("im from server");
});

app.listen(PORT,function(req,res){
    console.log("server"  + PORT + "is running");
})