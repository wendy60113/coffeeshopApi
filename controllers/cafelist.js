//載入相對應的model
const Cafelist = require('../models/index').cafelist;
const mysql = require('mysql');
// const env = /*process.env.NODE_ENV || */'development';
// const config = require(`${__dirname}/../config/config.json`)[env];
const connection = mysql.createConnection({
  host: process.env.host,
  user: process.env.username,
  password: process.env.password,
  database: process.env.database
});

module.exports = {
    //列表項
    list(req, res) {
        connection.connect();
        const query = `
        UPDATE cafelist
        INNER JOIN favorite
        ON cafelist.id = favorite.cafeshopId
        SET isFavorite = 1
        WHERE favorite.userId = ?
        ORDER BY id DESC`
        const id = req.params.id

        connection.query(query, [id], (error, results, fields) => {
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
        const { name, address, latitude, longitude } = req.body
        const values = [name, address, latitude, longitude]
        const query = `
        INSERT INTO cafelist(name, address, latitude, longitude)
        VALUES(?,?,?,?)
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
    //取得某項
    retrieve(req, res) {
        connection.connect()
        const query = `
        SELECT * FROM cafelist WHERE id=?`
        const id = req.params.id
        connection.query(query, [id], (error, results, fields)=>{
            if (error) {
                res.status(400).send(error);
                throw error;
            }else if(results.length==0){
                res.status(404).send('找不到這筆資料')
                return
            }
            res.status(200).send(results[0]);
        })
        connection.end();
    },
    //更新
    update(req, res) {
        connection.connect()
        const query = `
        UPDATE cafelist
        SET name=?,address=?
        WHERE id=?
        `
        const { name, address, id } = req.body
        connection.query(query,[name,address,id],(error, results, fields)=>{
            if (error) {
                res.status(400).send(error);
                throw error;
            }
            res.status(200).send(results)
        })
        connection.end()
    },
    //刪除
    destroy(req, res) {
        connection.connect()
        const query=`
        DELETE FROM cafelist WHERE id=?`
        const { id } = req.body
        connection.query(query,[id],(error,results,fields)=>{
            if(error){
                res.status(400).send(error)
                throw error
            }else if(!id){
                res.status(400).send('找不到這筆資料')
            }
            res.status(200).send(results)
        })
        connection.end()
    }
};