
const uuid = require('uuid');
const db = require('../db');


exports.addUser = (req,res)=>{

   
    const username = req.body.username;
    const password = req.body.password;


    db.query("select * from user where username = ? and password = ?",[username,password],(err,results,fields)=>{

        console.log(results.length);

        if(results.length>0){
            res.send("welcome "+results[0].username);

        }else{

            const user = {id:uuid.v4() , username:req.body.username , password:req.body.password};

            db.query('insert into user set ?',user,(err,results,fields)=>{

               if(!err) res.send("user inserted");
                else res.send(err.message);
        
            });

        }



    });

  
};

exports.showUsers = (req,res)=>{

    db.query('select * from user',(err,results,fields)=>{

        res.send(results);

    });

};


// show my friends
exports.showMyFriends = (req,res)=>{




};