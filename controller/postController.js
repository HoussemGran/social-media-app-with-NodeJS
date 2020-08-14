
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

exports.deletePost = (req,res)=>{

    const id = req.params.id;
    db.query("delete from post where id = ? ",[id],(err,results,fileds)=>{

        res.send(results);

    });

};

// show post of a specefic user
exports.showPostsByID = (req,res)=>{

    const id = req.params.id;
    db.query("select * from post p , user u where p.user = u.id and u.id = ?",[id],(err,results,fileds)=>{

        res.send(results);

    });


};