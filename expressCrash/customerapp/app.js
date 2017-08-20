const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const expressValidator = require('express-validator');

const app = express();

/*const logger = function(req,res,next){
    console.log('Logging ...')
    next()
}
app.use(logger);*/
//View middleware
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
//Body parser middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//set STATIC Path
app.use(express.static(path.join(__dirname,'public')));
// Global Vars
app.use(function(req,res,next){
    res.locals.errors = null; 
    next();
});

//express validator middleware.
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));



app.get('/',function(req,res){
    res.render('index',{
        title: 'Customer',
        users: users
       
    });
});
var users = [{
    id: 1,
    first_name:'first',
    second_name: 'name',
    email: 'firstbame@gma.com'

},{
    id: 2,
    first_name:'second',
    second_name: 'girl',
    email: 'firstbame@gma.com'
},{
    id: 3,
    first_name:'third',
    second_name: 'guy',
    email: 'firstbame@gma.com'
}]


app.post('/users/add', function(req,res){
    
    req.checkBody('first_name', 'First name required').notEmpty();
    req.checkBody('second_name', 'Second name required').notEmpty();
    req.checkBody('email', 'email required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.render('index',{
            users: users,
            errors: errors
        })
    }
    else
    {
        var newUser = {
            first_name: req.body.first_name,
            second_name: req.body.second_name,
            email: req.body.email
        }

        console.log('FORM SUBMITTED' );
        console.log(newUser );
    }



   
    
});

app.listen(3000,function(){
    console.log('Server Started on Port 3000...');
});