const app = require("express")()
const reservation = require("./reservation")
const user = require("./user")
const vol = require("./vol")

const expressAPP= ()=>{
    app.use(reservation)
    app.use(user)
    app.use(vol)

    return app

}

module.exports = expressAPP