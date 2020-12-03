const DB =  require("../core/DBcore")
const DBinstance = new DB()
const db = DBinstance.getDB()
db.exec("drop table user")
db.exec('create table IF NOT EXISTS user(userId INTEGER PRIMARY KEY, name VARCHAR(50) NOT NULL,password VARCHAR(50) NULL)')

db.exec("INSERT INTO User ( name, password) VALUES ('toto', '123456');")
db.exec("INSERT INTO User ( name, password) VALUES ('tata', '123456');")