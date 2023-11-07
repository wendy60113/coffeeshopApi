//載入相對應的model
const Favorite = require('../models/index').favorite;
const mysql = require('mysql');
const env = /*process.env.NODE_ENV || */'development';
const config = require(`${__dirname}/../config/config.json`)[env];
const connection = mysql.createConnection({
  host: config.host,
  user: config.username,
  password: config.password,
  database: config.database
});

module.exports = {
    //列表項
    list(req, res) {
        connection.connect();
        const query = `
        SELECT id, cafeshopId, userId
        FROM favorite
        ORDER BY id DESC`;

        connection.query(query, (error, results, fields) => {
            if (error) {
                res.status(400).send(error);
                throw error;
            }
            res.status(200).send(results);
        });
        connection.end();
    },
    //創建
    create(req, res) {
        connection.connect();
        const { cafeshopId, userId } = req.body
        const values = [cafeshopId, userId]
        const query = `
        INSERT INTO cafelist(cafeshopId, userId)
        VALUES(?,?)
        `
        connection.query(query, values, (error, results, fields) => {
            if (error) {
                res.status(400).send(error);
                throw error;
            }
            res.status(200).send(results);
        });

        connection.end();
    },
    //刪除
    destroy(req, res) {
        connection.connect()
        const { userId, cafeshopId } = req.body
        const query = `
        DELETE FROM favorite
        WHERE userId = ? AND cafeshopId = ?
        `
        connection.query(query, [userId,cafeshopId], (error, results, fields)=>{
            if (error) {
                res.status(400).send(error);
                throw error;
            }else if(!cafeshopId){
                res.status(400).send('找不到這筆資料')
            }
            res.status(200).send(results);
        })
        connection.end()
    }
};