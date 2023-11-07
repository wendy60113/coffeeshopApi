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
connection.connect();
module.exports = {
    //列表項
    list(req, res) {
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
    },
    //創建
    create(req, res) {
        const { cafeshopId, userId } = req.body
        const values = [cafeshopId, userId]
        const query = `
        INSERT INTO favorite(cafeshopId, userId)
        VALUES(?,?)
        `
        connection.query(query, values, (error, results, fields) => {
            if (error) {
                res.status(400).send(error);
                throw error;
            }
            res.status(200).send(results);
        });

    },
    //刪除
    destroy(req, res) {
        console.log(req.params)
        const userId = req.params.userId
        const cafeshopId = req.params.cafeshopId
        const query = `
        DELETE FROM favorite
        WHERE userId = ? AND cafeshopId = ?
        `
        connection.query(query, [userId,cafeshopId], (error, results, fields)=>{
            if (error) {
                res.status(400).send(error);
                throw error;
            }
            res.status(200).send(results);
        })
    }
};