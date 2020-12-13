const fetch = require("node-fetch")
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')


const express = require("express")
const app = express()
app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.set('view engine', 'ejs');

const path = require("path")

const views = path.join(__dirname, "views")
console.log(views)
app.set('views', views)

app.get("/", async (req, res)=>{

  
    const data = await fetch("http://localhost:3000/vol", {})
    const vols = await data.json() || []
    let reservations = []
    reservationsId = []
    const haveAccount = false
    
    if(req.cookies.userId){
        
        const id = req.cookies.userId
        
        const dataReservation = await fetch("http://localhost:3000/reservation/"+id, {})
        
      
        reservations = await dataReservation.json() 
        reservations.forEach(element => {
            reservationsId.push(element.volId)
        });
        console.log(reservationsId)
        
    }else{
        const dataId = await fetch("http://localhost:3000/user", {})
       const userId = await dataId.json()
      
        res.cookie("userId", userId)
    }
   
   


    res.status(200)
    res.render(`index`, {name:"chris", vols, reservations, reservationsId})
    
})

app.post("/reserver", (req, res)=>{
    const {volId} = req.body
   
    console.log(req.body)

    fetch("http://localhost:3000/reservation", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ volId, userId:req.cookies.userId , haveAccount})

    })
    res.status(200)
    res.send("ok")
})


app.get("/login", (req, res)=>{

 
    res.json("hello")
})


app.listen(3001, (err)=>{
    if(err)
        return console.error(err)
    console.log("Client listening on port 3001")
})