
    const uuid = require('uuid');
    const db = require('../db');
    const date = require('date-and-time');
    
    // add group
    exports.addGroup = (req,res)=>{

        const now = new Date();

        const group = {id:uuid.v1() , name:req.body.name , admin:req.body.admin , nbrsubs:0 , dateCreated:date.format(now, 'YYYY-MM-DD') };

    db.query("insert into mygroup set ? ",group,(err,results,fields)=>{

        if(err) res.send(err.message);
        else{

         
            
    db.query("insert into usersGroups set ?",{idUser:group.admin , idGroup:group.id},(err,results,fields)=>{

        if(err) res.send(err.message);
        else res.send(results);


    }); 

        }
      });
      
      
 

    };


    // show all groups
    exports.showGroups = (req,res)=>{

        db.query("select * from mygroup g , user u where g.admin = u.id",(err,results,fields)=>{
            console.log(results);
            res.render('groups',{results:results});
        });

    };

    // show a specified group
    exports.showGroup = (req,res)=>{

        const id = req.params.id;

        db.query("select * from mygroup g , user u where g.admin = u.id and g.id = ?",[id],(err,results,fields)=>{

            if(!err) res.send(results);
        });

    };


    // delete a group
    exports.deleteGroup = (req,res)=>{

        const id = req.params.id;

        db.query("delete from mygroup where id = ?",[id],(err,results,fields)=>{

            res.redirect("home");

        });


    };

    // update a group
    exports.updateGroup = (req,res)=>{

        const id = req.params.id;
        const name = req.body.name;

        db.query("update mygroup set name = ? where id = ?",[name,id],(err,results,fields)=>{

            if(!err) res.redirect('home');
            else res.send(err.message);

        });

    };