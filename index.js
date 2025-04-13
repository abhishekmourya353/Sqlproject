
const { faker } = require('@faker-js/faker');

const mysql = require('mysql2');
const express=require("express");
const app=express();

const path = require('path');
app.set("view engine", "ejs");
// Set the views directory
app.set('views', path.join(__dirname, 'views'));
//app.use(express.urlencoded({ extended: true }));

const methodoverride=require('method-override');
app.use(methodoverride("_mathod"));
app.use(express.urlencoded({ extended: true }));


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "delta",
    password:"abhimry2003",
  });
let createRandomUser=()=> {
    return [
       faker.string.uuid(),
      faker.internet.userName(),
      faker.internet.email(),
     
       faker.internet.password(),
       
    ];
  }
  

   const port=3000;

   app.get("/user", (req,res) =>{
    let q="SELECT*FROM nak";
    try {
 connection.query(q,(err,result)=>{
     if(err)throw err;
     //console.log(result);
     res.render("user.ejs",{result});
 });
} catch (err) {
 console.log(err);
 res.send("ERRR");
}
   });
    
   app.get("/", (req,res) =>{
    let q="SELECT count(*) FROM nak";
       try {
    connection.query(q,(err,result)=>{
        if(err)throw err;
        const data=result[0]["count(*)"];
        res.render("home.ejs",{data});
    });
  } catch (err) {
    console.log(err);
    res.send("ERRR");
  }
   });
  






//edit
   app.get("/user/:id/edit",(req,res)=>{
  let {id} =req.params;
  let q1=  `SELECT * FROM nak WHERE id='${id}'`;

  try {
    connection.query(q1,(err,re)=>{
        if(err)throw err;
        let us=re[0];
        console.log(us);
        res.render("edit.ejs",{us});
    });
  } catch (err) {
    console.log(err);
    res.send("ERRR");
  }

    
   });

// UPDATE METHIOD





app.patch("/user/:id",(req,res)=>{
  let {id} =req.params;
  let q2=  `SELECT * FROM nak WHERE id='${id}'`;
  let { password :formpaasword, username :newuser}=req.body;
  console.log(req.body);
  try {
    connection.query(q2,(err,re)=>{
        if(err)throw err;
        let user=re[0];
        if(formpaasword!=user.pasword){
          console.log(formpaasword);
          console.log(user);
          res.send("password worng");
        }
        else{
          let q3 = `UPDATE nak SET name='${newuser}' WHERE id='${id}'`;
          connection.query(q3,(err,result)=>{
            if(err)throw err;
            res.redirect("/user");
              
            });

        }
       
    });
  } catch (err) {
    console.log(err);
    res.send("ERRR");
  }
});



  app.listen({port},()=>{
    console.log("server is active");
  });

//connection.end();


  








// let data=[];
// for(let i=1;i<=100;i++){
//     data.push(createRandomUser());
// }

//   let q="INSERT INTO nak (id,name,email,pasword) VALUES ?";

 
