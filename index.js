const express = require('express');
const bodyParser = require('body-parser');
const uuID = require('uuid');
const path = require('path');
const db = require('./db');
const routes = require('./routes/routes');
const app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(bodyParser.json());

app.get('/',(req,res)=>{

    res.render('home');

});

app.use('/app',routes);

app.listen(3000,()=>{
    console.log('listen on port 3000');
});