const apiRoutes  = require("./api/routes")
const app = require("express")()
const Database = require("./core/DBcore")

const db = new Database()

app.use(apiRoutes())






app.listen(3000, (err)=>{
    if(err)
        return console.error(err)
    console.log("Server listening on port 3000")
})