
const app = require("express")()
//const ReservationLogic = require("../../core/Reservation")
console.log("ok")


const flights = {
    
        0:{
            "id":1,
            "depart":"ville1",
            "arrive":"ville2",
        },
        1:{
            "id":1,
            "depart":"ville2",
            "arrive":"ville3",
        },
        2:{
            "id":1,
            "depart":"ville3",
            "arrive":"ville4",
        },
    


}
const getUser = ()=>{}


app.get("/vol", (req, res)=>{
  console.log(req)
    res.status(200)
    res.json(flights)
})

app.post("/vol", (req, res)=>{

})


module.exports = app