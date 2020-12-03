const DB =  require("../core/DBcore")
const DBinstance = new DB()
const db = DBinstance.getDB()

db.exec('CREATE TABLE tbl (col TEXT)')