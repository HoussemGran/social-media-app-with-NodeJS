
const uuid = require('uuid');
const db = require('../db');
const date = require('date-and-time');


exports.addPost = (req,res)=>{
    
    const now = new Date();
    const datepost = date.format(now, 'YYYY/MM/DD HH:mm:ss');

    const post = {idPost:uuid.v4() , title:req.body.title , content:req.body.content , user:req.session.userID,
    datePost : datepost};

    db.query('insert into post set ?',post,(err,results,fileds)=>{

        if(err) res.send(err);
        else
        res.redirect("home");

    });

};

// show all post with users
exports.showPosts = (req,res)=>{

    const hunter = req.session;
    if(hunter.username){

    db.query('select * from post p , user u where p.user = u.id',(err,results,fileds)=>{
        if(results.legth > 0)
        res.render('home',{results:results,msg:null});
        else res.render('home',{results:null,msg:"No Posts Yet"});

    });

    }else res.redirect('login');
};

// remove a specified post
exports.deletePost = (req,res)=>{

    const id = req.params.id;
    db.query("delete from post where idPost = ? ",[id],(err,results,fileds)=>{
        
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

// increment a post up
exports.incrementUP = (req,res)=>{

    const id = req.params.id;
    db.query("update post set up = up+1 where idPost=?",[id],(err,results,fileds)=>{

        if(!err) res.redirect('/');

    });


};