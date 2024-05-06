const express=require("express");

const app=express();
const port=8080;
const path=require("path");
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs")
app.listen(port,()=>{
    console.log("app is listening on the port 8080");
});

app.get("/home",(req,res)=>{
    res.render("home.ejs");
})

app.get("/download",(req,res)=>{
    res.download("./public/docs/JavaScript_Notes.pdf");
})

// also in slip-11

// set file at public/docs/demo.txt
//views/home ejs
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Document</title>
// </head>
// <body>
//     <form action="/download">
//         <h1>Dowload the file  <button>DownLoad</button></h1>
//     </form>
// </body>
// </html>