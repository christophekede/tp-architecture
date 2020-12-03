const fetch = require("node-fetch")

const express = require("express")
const app = express()

const path = require("path")

const public = path.join(__dirname, "public")

app.get("/", (req, res)=>{

    res.status(200)
    res.sendFile(`${public}/index.html`)
    
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
    console.log("Client listening on port 3001")
})