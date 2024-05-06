const express=require("express");

const app=express();

const port=8080;

const path=require("path");

app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"public/css")));


app.listen(port,()=>{
    console.log("app is listening on the port 8080");
})

app.get("/home",(req,res)=>{
    res.render("home.ejs");
})

app.get("/courses",(req,res)=>{
   res.render("courses.ejs")
})

app.get("/about",(req,res)=>{
    res.render("about.ejs")
})