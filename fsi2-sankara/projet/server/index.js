const app = require("express")






app.listen(3000, (err)=>{
    if(err)
        return console.error(err)
    console.log("Server listening on port 3000")
})