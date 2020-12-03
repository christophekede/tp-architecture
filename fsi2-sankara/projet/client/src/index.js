const fetch = require("node-fetch")

const express = require("express")
const app = express()

app.set('view engine', 'ejs');

const path = require("path")

const views = path.join(__dirname, "views")
console.log(views)
app.set('views', views)

app.get("/", (req, res)=>{

    res.status(200)
    res.render(`index`, {name:"chris"})
    
})

app.post("/", (req, res)=>{
    console.log(req.body)
    res.redirect("/login")
})
app.get("/login", (req, res)=>{

 
    res.json("hello")
})


app.listen(3003, (err)=>{
    if(err)
        return console.error(err)
    console.log("Client listening on port 3003")
})