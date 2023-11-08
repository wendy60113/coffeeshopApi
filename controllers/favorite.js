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
        const joinQuery = `
        SELECT favorite.id, favorite.cafeshopId, favorite.userId, cafelist.name, cafelist.address, cafelist.isFavorite
        FROM favorite
        INNER JOIN cafelist
        ON favorite.cafeshopId=cafelist.id
        `;

        connection.query(joinQuery, (error, results, field) => {
            if (error) {
                res.status(400).send(error);
                throw error;
            }else if(results.length==0){
                const Msg = '尚未新增我的最愛資料'
                res.status(200).json({Msg:Msg,list:[]})
                return
            }
            res.status(200).json({Msg:'',list:results})
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