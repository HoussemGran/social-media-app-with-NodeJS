
const uuid = require('uuid');
const db = require('../db');


exports.addUser = (req,res)=>{

   
    const username = req.body.username;
    const password = req.body.password;


    db.query("select * from user where username = ? and password = ?",[username,password],(err,results,fields)=>{

       

        if(results.length>0){
            res.send("welcome "+results[0].username);

        }else{

            const user = {id:uuid.v4() , username:req.body.username , password:req.body.password};

            db.query('insert into user set ?',user,(err,results,fields)=>{

               if(!err) res.send(results);
                else res.send(err.message);
        
            });

        }



    });

  
};

// show all users
exports.showUsers = (req,res)=>{

    db.query('select * from user',(err,results,fields)=>{

        res.send(results);

    });

};

// show a specified user profile
exports.showUser = (req,res)=>{

    const id = req.params.id;
    db.query("select * from user u , post p where p.user = u.id and u.id = ?",[id],(err,results,fields)=>{
        console.log(results);
        if(err) res.send(err.message);
        else if(results.length > 0)
         res.render("profile",{results:results , msg:null});
        else res.render("profile",{results : null , msg:"No posts Yet"});

    });


};



// show my friends
exports.showMyFriends = (req,res)=>{




};