var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const routers = require('./routes');

const swaggerjsdoc = require('swagger-jsdoc')
const swaggerui = require('swagger-ui-express')
const cafelistRouter = require('./routes/cafelist')
const favoriteRouter = require('./routes/favorite')
const userlistRouter = require('./routes/userlist')

// 替app設定中介層為bodyParser
// 通過以下設定，在路由處理request，可以直接獲得body的部分
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//獲取express Router物件
var topRouter = express.Router().get('/', function(req, res) {
    res.json({ message: 'Hi，this is restFul API' });   
});
//建立起第一層的router
app.use('/api', topRouter);

const options={
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            title: 'CafeShop Collection API',
            version: '1.0.0',
            // description: 'REST API with Swagger doc',
        },
        server:[
            {
                url: "http://localhost:3000/"
            }
        ]
    },
    apis:["./routes/*.js"]
}
const spacs = swaggerjsdoc(options)
app.use(
    '/api-docs',
    swaggerui.serve,
    swaggerui.setup(spacs)
)
app.use('/cafelist',cafelistRouter)
app.use('/favorite',favoriteRouter)
app.use('/userlist',userlistRouter)

//註冊已經設計好的API
for(var key in routers) {
	app.use('/api/'+key, routers[key]);
}

var cors = require('cors');
app.use(cors({
    origin: ['http://localhost:8081/'],
}))

var config = require('./config');

app.use(cors({
  origin: config.cors.origin,
}));

app.listen(3000);
console.log('伺服器運作中');