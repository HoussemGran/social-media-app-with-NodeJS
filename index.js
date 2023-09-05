const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/routes');
const session = require('express-session');
const { log } = require('console');
const app = express();


app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(session({
    secret: 'hunter',
    resave: false,
    saveUninitialized: true
  }));


  
  const knex = require('knex')({
    client: 'mysql',
    connection: {
      host     : 'localhost',
      user     : 'root',
      port     : 3306,
      password : 'houssemess123',
      database : 'socialApp',
      charset  : 'utf8'
    }
  })


   const bookshelf = require('bookshelf')(knex)
  

   bookshelf.knex.schema.hasTable("users").then((exisit)=>{
    if(exisit){
      console.log("table already exisit");
    }else{
      bookshelf.knex.schema.createTable('users', function(t) {
        t.increments('id');
        t.string("username")
        t.string('first_name');
        t.string('last_name');
        t.string('password');
        t.string('email');
        t.timestamps()
      }).then(function() { 
        console.log("table created");
      })

    }
   })
   

    bookshelf.knex.schema.hasTable("posts").then((exisit)=>{

      if(exisit){
        console.log("table already exisit");
      }else{
        bookshelf.knex.schema.createTable('posts', function(t) {
          t.increments('id');
          t.string("title")
          t.string('content');
          t.integer('user').unsigned().references('id').inTable('users');
          t.timestamps()
        }).then(function() { 
          console.log("table created");
        })
  
      }
    })
  
  const User = bookshelf.model('User', {
    tableName: 'users',
    posts() {
      return this.hasMany(Posts)
    }
  })
  
  const Post = bookshelf.model('Post', {
    tableName: 'posts',
    tags() {
      return this.belongsToMany(Tag)
    }
  })
  
  const Tag = bookshelf.model('Tag', {
    tableName: 'tags'
  })




app.get('/',(req,res)=>{
  res.redirect('/home/page/1');
});

app.get('/home',(req,res)=>{
  res.redirect('/home/page/1');
});

app.use('/',routes);

app.get('/logout',(req,res)=>{

  req.session.destroy;
  res.redirect('login');

});

app.listen(3000,()=>{
    console.log('listen on port 3000');
});