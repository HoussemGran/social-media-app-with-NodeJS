
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

    const user = req.session.username;
    if(user){

    db.query('select * from post p , user u where p.user = u.id order by datePost desc',(err,results,fileds)=>{
            // render all users exept me
        db.query("select * from user where id not like ? ",[req.session.userID],(error,result,field)=>{
            
            if(err) res.send(err.message);

            else if(results)

                res.render('home',{results:results,msg:null,users:result});
        
            else res.render('home',{results:null,msg:"No Posts Yet",users:result});


        })
        
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

// show posts of a specefic user
exports.showPostsByID = (req,res)=>{

    const id = req.params.id;
    db.query("select * from post p , user u where p.user = u.id and u.id = ?",[id],(err,results,fileds)=>{

        res.send(results);

    });

};

// increment a post up
exports.incrementUP = (req,res)=>{

    
    const idPost = req.params.id;
    const idUser = req.session.userID;

    db.query("select * from ups where idUser = ? and idPost = ?",[idUser,idPost],(err,results,fileds)=>{
       
        if(err) res.send(err.message);

        else if(results){
            
            res.redirect('/home');
            
       
        }else{
            db.query("update post set up = up+1 where idPost=?",[idPost],(err,results,fileds)=>{

                if(!err){

                    db.query("insert into ups set ?",{idUser:idUser,idPost:idPost},(err,results,fileds)=>{

                       
                        res.redirect('/home');
                        
                    });

                }else res.send(err.message);
        
            });
        }


    });

   


};