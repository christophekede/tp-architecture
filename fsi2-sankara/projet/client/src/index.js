const express = require("express")
const app = express()

const path = require("path")

const public = path.join(__dirname, "public")

app.get("/", (req, res)=>{

    res.status(200)
    res.sendFile(`${public}/index.html`)
    
})


app.listen(3001, (err)=>{
    if(err)
        return console.error(err)
    console.log("Client listening on port 3001")
})