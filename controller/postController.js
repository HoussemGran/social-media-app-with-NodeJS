
const uuid = require('uuid');
const db = require('../db');


exports.addPost = (req,res)=>{

    const post = {id:uuid.v4() , title:req.body.title , content:req.body.content , user:req.body.user};

    db.query('insert into post set ?',post,(err,results,fileds)=>{

        res.send(results);


    });

};


exports.showPosts = (req,res)=>{

    db.query('select * from post',(err,results,fileds)=>{

        res.send(results);

    });

};