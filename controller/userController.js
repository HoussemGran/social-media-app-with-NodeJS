
const passwordHash = require('password-hash');
const uuid = require('uuid');
const db = require('../db');



exports.addUser = (req,res)=>{

    const user = {id:uuid.v4() , username:req.body.username , password:passwordHash.generate(req.body.password)};

    db.query('insert into user set ?',user,(err,results,fields)=>{

         res.send(results);

    });


};

exports.showUsers = (req,res)=>{

    db.query('select * from user',(err,results,fields)=>{

        res.send(results);

    });

};


