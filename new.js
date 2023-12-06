const express = require('express');
const app = express();

const jwt = require("jsonwebtoken");

const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/exam1")

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());;
;



let apirouting  = require('./router/apirouting')
app.use('/api', apirouting);

app.listen(3001, function(){
    console.log('Server started on port 3001...');
})



