var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var morgan = require('morgan');

var app = express();

app.get('/',function(req,res){
    res.send("Hello World, this is beautiful")
});

app.listen(3000,function(){
    console.log('Server Started on Port 3000...');
});