var express = require('express');
var router = express.Router();
const boradController = require('../controllers/index').favorite;

/**
 * @swagger
 * components:
 *   schemas:
 *     Favorite:
 *       type: object
 *       required:
 *         - cafeshopId
 *         - userId
 *       properties:
 *         id:
 *           type: int
 *           description: The auto-generated id of the cafelist
 *         cafeshopId:
 *           type: int
 *           description: 咖啡廳編號
 *         userId:
 *           type: int
 *           description: 使用者編號
*       example:
 *         id: 1
 *         cafeshopId: 306
 *         userid: 1
 */

/**
 * @swagger
 * /favorite:
 *   get:
 *     summary: 查詢我的最愛列表
 *     tags: [favorite]
 *     responses:
 *       200:
 *         description: 查詢成功
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Favorite'
 * 
 *   post:
 *     summary: 新增我的最愛
 *     tags: [favorite]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cafeshopId:
 *                 type: int
 *                 example: 201
 *               userId:
 *                 type: int
 *                 example: 1
 *     responses:
 *       200:
 *         description: 新增成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: int
 *                   example: 1
 *                 cafeshopId:
 *                   type: int
 *                   example: 201
 *                 userId:
 *                   type: int
 *                   example: 1
 * /favorite/{userId}/{cafeshopId}:
 *   delete:
 *     summary: 刪除我的最愛資料
 *     tags: [favorite]
 *     parameters:
 *      - userId: userId
 *        in: path
 *        required: true
 *      - cafeshopId: cafeshopId
 *        in: path
 *        required: true
 *     responses:
 *       204:
 *         description: 刪除成功
 */

/* GET home page. */
router.get('/', function(req, res, next) {
	boradController.list(req,res)
});

router.post('/', function(req, res, next) {
	boradController.create(req,res)
});

router.delete('/:userId/:cafeshopId', function(req, res, next) {
	boradController.destroy(req,res)
});

module.exports = router;