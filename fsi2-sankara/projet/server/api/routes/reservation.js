
const app = require("express")()
const DB = require("../../core/DBcore")

//const ReservationLogic = require("../../core/Reservation")

const getReservation = ()=>{}


app.get("/reservation", (req, res)=>{
    const DBinstance = new DB()
    const db = DBinstance.getDB()

    const resData =  db.all("select * from reservation where userId = 1", (err, data)=>{
       if(err)
            return res.status(500).json({success:"ko"})
        res.status(200)
        res.json(data)
        
    })
})

app.post("/reservation", (req, res)=>{

})

module.exports = app

