var express = require('express');
var router = express.Router();
const boradController = require('../controllers/index').cafelist;

/**
 * @swagger
 * components:
 *   schemas:
 *     Cafelist:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - latitude
 *         - longitude
 *         - isFavorite
 *       properties:
 *         id:
 *           type: int
 *           description: The auto-generated id of the cafelist
 *         name:
 *           type: string
 *           description: 咖啡廳名稱
 *         address:
 *           type: string
 *           description: 地址
 *         latitude:
 *           type: string
 *           description: 緯度
 *         longitude:
 *           type: string
 *           description: 經度
 *         isFavorite:
 *           type: string
 *           description: 是否加入我的最愛(0:false,1:true)
 *       example:
 *         id: 1
 *         name: Fuelwood Coffee 燃木咖啡研究所
 *         address: 高雄市前鎮區復興三路311-14號
 *         latitude: 22.58304500	
 *         longitude: 120.33590010	
 *         isFavorite: 1
 */

/**
 * @swagger
 * /cafelist/query:
 *   post:
 *     summary: 查詢咖啡廳資料列表
 *     tags: [cafeshop]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 1
 *     responses:
 *       200:
 *         description: 查詢成功
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cafelist'
 * /cafelist/add:
 *   post:
 *     summary: 新增咖啡廳資料
 *     tags: [cafeshop]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: shop name
 *               address:
 *                 type: string
 *                 example: shop address
 *               latitude:
 *                 type: string
 *                 example: 123.123
 *               longitude:
 *                 type: string
 *                 example: 321,321
 *     responses:
 *       200:
 *         description: 新增成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: shop name
 *                 address:
 *                   type: string
 *                   example: shop address
 *                 latitude:
 *                   type: string
 *                   example: 123.123
 *                 longitude:
 *                   type: string
 *                   example: 321,321
 * /cafelist/{id}:
 *   get:
 *     summary: 查詢咖啡廳單筆資料
 *     tags: [cafeshop]
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *     responses:
 *       200:
 *         description: 查詢成功
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
 *                 name:
 *                   type: string
 *                   example: shop name
 *                 address:
 *                   type: string
 *                   example: shop address
 *                 latitude:
 *                   type: string
 *                   example: 123.123
 *                 longitude:
 *                   type: string
 *                   example: 321,321
 *   put:
 *     summary: 編輯咖啡廳資料
 *     tags: [cafeshop]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: shop name
 *               address:
 *                 type: string
 *                 example: shop address
 *               latitude:
 *                 type: string
 *                 example: 123.123
 *               longitude:
 *                 type: string
 *                 example: 321,321
 *               id:
 *                 type: string
 *                 example: 306
 *     responses:
 *       200:
 *         description: 編輯成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: shop name
 *                 address:
 *                   type: string
 *                   example: shop address
 *                 latitude:
 *                   type: string
 *                   example: 123.123
 *                 longitude:
 *                   type: string
 *                   example: 321,321
 * /cafelist:
 *   delete:
 *     summary: 刪除咖啡廳單筆資料
 *     tags: [cafeshop]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: 315
 *     responses:
 *       204:
 *         description: 刪除成功
 */


/* GET home page. */
router.post('/query/', function(req, res, next) {
	boradController.list(req,res)
});

router.get('/:id', function(req, res, next) {
	boradController.retrieve(req,res)
});

router.post('/add/', function(req, res, next) {
	console.log(req.body);
	boradController.create(req,res)
});

router.delete('/:id', function(req, res, next) {
	boradController.destroy(req,res)
});

router.put('/:id', function(req, res, next) {
	boradController.update(req,res)
});

module.exports = router;