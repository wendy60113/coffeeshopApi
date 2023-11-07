var express = require('express');
var router = express.Router();
const boradController = require('../controllers/index').userlist;

/**
 * @swagger
 * components:
 *   schemas:
 *     Userlist:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: int
 *           description: The auto-generated id of the userlist
 *         name:
 *           type: string
 *           description: 使用者帳號
 *       example:
 *         id: 1
 *         name: wendy
 */

/**
 * @swagger
 * /userlist:
 *   get:
 *     summary: 查詢帳號
 *     tags: [user]
 *     responses:
 *       200:
 *         description: 查詢成功
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Userlist'
 * 
 *   post:
 *     summary: 新增帳號
 *     tags: [user]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: wendy
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
 *                 name:
 *                   type: string
 *                   example: wendy
 * 
 * /userlist/{id}:
 *   delete:
 *     summary: 刪除帳號
 *     tags: [user]
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *     responses:
 *       204:
 *         description: 刪除成功
 */

router.get('/', function(req, res, next) {
	boradController.list(req,res)
});

router.post('/', function(req, res, next) {
	boradController.create(req,res)
});

module.exports = router;