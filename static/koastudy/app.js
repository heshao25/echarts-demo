//创建koa对象
const koa = require('koa')
const app = new koa()
//绑定中间件
//first
const responseDuartionMiddleware = require('./middleware/koa_response_duration')
app.use(responseDuartionMiddleware)
//second
const responseHeaderMiddleware = require('./middleware/koa_response_header')
app.use(responseHeaderMiddleware)
//third
const responseDataMiddleware = require('./middleware/koa_response_data')
app.use(responseDataMiddleware)
//绑定端口号 3000
app.listen(3000)



const WebSocket = require('./websocketserve/websocket_serve')
//开启监听
WebSocket.listen()

// const wss = new WebSocket.Server({
//     port:9998
// })
// //对客户端链接时间进行监听
// wss.on('connection',client=>{
//     console.log('有客户端连接成功')
//     //msg是由客户端发送给服务端的数据
//     client.on('message',msg=>{
//         console.log('发送的信息'+msg)
//         //服务向客户发送的数据
//         client.send('hello socket')
        
//     })
// })