//載入相對應的model
const Cafelist = require('../models/index').cafelist;
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
        let resultLen
        const queryDefault = `
        UPDATE cafelist
        SET isFavorite = 0
        `
        connection.query(queryDefault, (error, results, fields) => {
            if (error) {
                res.status(400).send(error);
                throw error;
            }
            resultLen = results.affectedRows
            // res.status(200).send(results);
        });

        const query = `
        UPDATE cafelist
        INNER JOIN favorite
        ON cafelist.id = favorite.cafeshopId
        SET isFavorite = 1
        WHERE favorite.userId = ?
        `
        const { userId } = req.body
        connection.query(query, [userId,userId], (error, results, fields) => {
            if (error) {
                res.status(400).send(error);
                throw error;
            }
            // res.status(200).send(results);
        });

        const selectQuery = `
        SELECT * FROM cafelist
        ${req.query.page ? 'LIMIT 10 OFFSET ?' : ''}
        `
        const page = (parseInt(req.query.page)-1)*10
        connection.query(selectQuery, [page], (selectError, selectResults, selectFields)=>{
            if (selectError) {
                res.status(400).send(selectError);
                throw selectError;
            }
            res.status(200).send({
                data: selectResults,
                pagination: {
                    totalItems: resultLen
                }
            });
        })
    },
    //創建
    create(req, res) {
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

    },
    //取得某項
    retrieve(req, res) {
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
    },
    //更新
    update(req, res) {
        const query = `
        UPDATE cafelist
        SET name=?,address=?,latitude=?,longitude=?
        WHERE id=?
        `
        const { name, address, latitude, longitude } = req.body
        const id = req.params.id
        connection.query(query,[name,address,latitude,longitude,id],(error, results, fields)=>{
            if (error) {
                res.status(400).send(error);
                throw error;
            }
            res.status(200).send(results)
        })
    },
    //刪除
    destroy(req, res) {
        const query=`
        DELETE FROM cafelist WHERE id=?`
        const id = req.params.id
        connection.query(query,[id],(error,results,fields)=>{
            if(error){
                res.status(400).send(error)
                throw error
            }else if(!id){
                res.status(400).send('找不到這筆資料')
            }
            res.status(200).send(results)
        })
    }
};