
    const uuid = require('uuid');
    const db = require('../db');
    const date = require('date-and-time');
    
    // add group
    exports.addGroup = (req,res)=>{

        if(req.session.username){

        const now = new Date();

        const group = {id:uuid.v1() , name:req.body.groupName , admin:req.session.userID , nbrsubs:0 , dateCreated:date.format(now, 'YYYY-MM-DD') };

    db.query("insert into mygroup set ? ",group,(err,results,fields)=>{

        if(err) res.send(err.message);
        else{

         
            
    db.query("insert into usersGroups set ?",{idUser:group.admin , idGroup:group.id},(err,results,fields)=>{

        if(err) res.send(err.message);
        else res.redirect('groups');


    }); 

        }
      });
    }else res.redirect('login');
      
 

    };


    // show all groups
    exports.showGroups = (req,res)=>{
        const user = req.session.username;
        if(user){
        db.query("select * from mygroup g , user u where g.admin = u.id",(err,results,fields)=>{
            console.log(results);
            res.render('groups',{results:results});
        });
        }else res.redirect('login');
    };

    // show a specified group
    exports.showGroup = (req,res)=>{
        const user = req.session.username;
    if(user){
        const id = req.params.id;

        db.query("select * from mygroup g , user u where g.admin = u.id and g.id = ?",[id],(err,results,fields)=>{

            if(!err) res.send(results);
        });
        }else res.redirect('login');
    };


    // delete a group
    exports.deleteGroup = (req,res)=>{

        if(req.session.userID){
        const id = req.params.id;

        db.query("delete from mygroup where id = ?",[id],(err,results,fields)=>{

            res.redirect("home");

        });
    }else res.redirect('login');

    };

    // update a group
    exports.updateGroup = (req,res)=>{

        if(req.session.userID){
        const id = req.params.id;
        const name = req.body.name;

        db.query("update mygroup set name = ? where id = ?",[name,id],(err,results,fields)=>{

            if(!err) res.send("post updated");
            else res.send(err.message);

        });
    }else res.redirect('login');
    };