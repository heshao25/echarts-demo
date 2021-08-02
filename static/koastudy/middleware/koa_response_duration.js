//const { ContextExclusionPlugin } = require("webpack")

//耗时中间件
module.exports = async(ctx,next) =>{
    //记录开始时间
    const start =Date.now()
    console.log(start)
    await next()
    const end = Date.now()
    console.log(end)
    const duartion = end -start
    ctx.set('X-Response-Time', duartion + 'ms')
}