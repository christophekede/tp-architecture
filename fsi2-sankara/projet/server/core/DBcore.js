var sqlite3 = require('sqlite3').verbose();

class DBcore {

    constructor(){
        this.db = new sqlite3.Database("../DATABASE.db", (err)=>{
            if(err)
                console.log(err)
        })
    }








}



module.exports = DBpath