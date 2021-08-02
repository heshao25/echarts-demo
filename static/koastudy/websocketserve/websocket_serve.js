//创建实例
const path = require('path')
const fileUtils = require('../utils/file_utils')
const WebSocket = require('ws')
const wss = new WebSocket.Serve({
    port:9998
})
module.exports.listen=()=>{
//监听
    wss.on('connection',client=>{
        console.log('connect success')
        client.on('message',async msg=>{
            console.log('msg from font:'+msg)
            let payload = JSON.parse(msg)
            const action = payload.action
            if(action === 'getData')
            {
                let filePath = './data/'+payload.chartName+'json'
                //payload.chartName
                filePath= path.join(__dirname,filePath)
                await fileUtils.getFileJsonData(filePath)
                payload.data = ret
                client.send(JSON.stringify(payload))
            }
            else
            {
                wss.clients.forEach(client=>{
                    client.send(msg)
                })
            }
            //client.send('hello from websocket')
        })
    })
}
