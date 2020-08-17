const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('./db');
const routes = require('./routes/routes');
const session = require('express-session');
const app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(bodyParser.json());

app.use(session({
    secret: 'hunter',
    resave: false,
    saveUninitialized: true
  }));
  
app.get('/login',(req,res)=>{
  res.render('login');
});


app.use('/',routes);


app.listen(3000,()=>{
    console.log('listen on port 3000');
});