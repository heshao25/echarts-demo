const path = require('path')
const fileUtils = require('../utils/file_utils')
module.exports =async(ctx,next) => {
   const url =  ctx.request.url
   console.log(url)
   let filePath = url.replace('/api','')
   filePath = '../data' + filePath + '.json'
   filePath = path.join(__dirname, filePath)
   try{
    const ret =await fileUtils.getFileJsonData(filePath)
   
    ctx.response.body = ret
   }
   catch{
    const errorMsg = {
        message:'shibai',
        status:404
    }
    ctx.response.body = JSON.stringify(errorMsg)
   }
  
    await next()
}