const express=require("express");
const hbs=require("hbs");
const fs=require("fs");

let app=new express();

app.use((req,res,next)=>{
  var log = new Date().toString() + ` : ${req.method} ${req.url}\n`;
  fs.appendFile("server.log",log,(err)=>{});
  console.log("File Written");
  next();
});

hbs.registerHelper("getCurrentYear",()=>{
  return new Date().getFullYear();
});
hbs.registerHelper("screamIt",(message)=>{
  return message.toUpperCase();
});

hbs.registerPartials(__dirname+"/views/Partials");

app.set("view engine","hbs");

app.use(express.static(__dirname+"/Public"));

app.get("/" , (req,res)=>{
  res.render("home.hbs",{
    title: "Welcome User",
    message: "This is Home Page"
  });
});

app.get("/about",(req,res)=>{
  res.render("about.hbs",{
    message: "This Is Rendered"
  })
});

app.get("/bad",(req,res)=>{
  res.send({
    errorMessage:"Unauthorised Access!"
  });
});

app.listen(80,()=>{
  console.log("Server Started!");
});
