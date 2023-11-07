//載入相對應的model
const Userlist = require('../models/index').userlist;
const mysql = require('mysql');
const env = /*process.env.NODE_ENV || */'development';
const config = require(`${__dirname}/../config/config.json`)[env];
const connection = mysql.createConnection({
  host: config.host,
  user: config.username,
  password: config.password,
  database: config.database
});
connection.connect();
module.exports = {
    //列表項
    list(req, res) {
        const query = `
        SELECT id, name
        FROM userlist
        `
        connection.query(query,(error, results, fields)=>{
            if(error){
                res.results(400).send(error)
                throw error
            }
            res.status(200).send(results)
        })
    },
    //創建
    create(req, res) {
        const { name } = req.body;
        const query = `
        INSERT INTO userlist(name)
        VALUES (?)
        `
        connection.query(query,[name],(error, results, fields)=>{
            if(error){
                res.results(400).send(error)
                throw error
            }
            res.status(200).send(results)
        })
    },

}