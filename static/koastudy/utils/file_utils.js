const { rejects } = require('assert')
const fs = require('fs')
const { resolve } = require('path')
module.exports.getFileJsonData = (filePath) =>{
    //读取内容
    return new Promise((resolve, reject)=>{
        fs.readFile(filePath, 'utf-8',(error,data)=>{
            if(error)
            {
                reject(error)
            }
            else
            {
                resolve(data)
            }
        })
    
    })
}