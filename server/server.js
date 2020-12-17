const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const mongoose = require('mongoose');
const pbModel = require('./model/budget');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use('', express.static('public'));
app.use(cors());

app.get('/hello',(req,res)=>{
    res.send("sample text");    
});

app.get('/budget', (req, res) => {
    mongoose.connect('mongodb+srv://supriya:12345@cluster0.pa8f0.mongodb.net/personalBudget?retryWrites=true&w=majority', {
     useNewUrlParser:true,
     useCreateIndex : true,
     useUnifiedTopology: true
    }).then(() => {
        pbModel.find({}).then((result) => {
            console.log(result);
            res.send(result);
            mongoose.connection.close();
        })
    })
 });
 
 app.post('/budget', (req, res) => {
     let data = {id: req.body.id, title: req.body.title, budget: req.body.budget, color: req.body.color}
     mongoose.connect('mongodb+srv://supriya:12345@cluster0.pa8f0.mongodb.net/personalBudget?retryWrites=true&w=majority', {
         useNewUrlParser:true,
         useCreateIndex : true,
         useUnifiedTopology: true
        }).then( () => {
            pbModel.insertMany(data, (error, newData) => {
             console.log(newData);
             console.log(data);
                if(newData) {
                    res.send(newData);
                } else {
                 res.send(error);
                }
                mongoose.connection.close();
            })
        })
 })

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});