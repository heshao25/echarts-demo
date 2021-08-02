<template>
  <div class="com-content">
      <div class="com-echarts" id="mcharts" ref="strock_ref">

      </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import '@/assets/sellerSkin.js';
export default {
    data(){
        return{
            stockInfo:null,
            mcharts:null,
            start:0,
            end:5,
            timeId:null,
        }
    },
    destroyed(){
        clearInterval(this.timeId)
    },
    methods:{
        initcharts(){
            this.mcharts = echarts.init(document.getElementById("mcharts"),'chalk')
            const option = {
                title:{
                    text:'▎ 库存与销量',
                    top:20,
                    left:20,
                    textStyle:{
                        color:'white'
                    }
                }
            }          
            this.mcharts.setOption(option)
            this.mcharts.on('mouseover',()=>{
                clearInterval(this.timeId)
            })
            this.mcharts.on('mouseout',()=>{
                this.startInterval()
            })
        },
        async getData(){
            await this.$http.get('/stock')
            .then(res=>{
                this.stockInfo = res.data
               // console.log(this.stockInfo)
              
            })
           this.upcharts()
            this.startInterval()
           
        },
        upcharts(){
            const centerArr = [
                ['18%','40%'],
                ['50%','40%'],
                ['82%','40%'],
                ['34%','75%'],
                ['66%','75%']
            ]
            const colorArr=[
                ['#4ff778','#0ba82c'],
                ['#e5dd45','#e8b11c'],
                ['#e8821c','#e55445'],
                ['#5052ee','#ab6ee5'],

                ['#23e5e5','#2e72bf'],
            ]
            const showData = this.stockInfo.slice(this.start,this.end)
            const seriesArr = showData.map((item,index)=>{
                return {
                    type:'pie',
                    radius:[110,100],
                    center:centerArr[index],
                     avoidLabelOverlap: false,
                     label: {
                            show: true,
                            position: 'center',
                            color:colorArr[index][0]
                        },
                    data:[
                        {
                           // name:item.name+'\n'+item.sales,
                          
                            value:item.sales,
                            itemStyle:{
                                color: new echarts.graphic.LinearGradient(0,1,0,0,[
                                    {offset:0,
                                    color:colorArr[index][0]
                                    },
                                    {offset:1,
                                    color:colorArr[index][1]
                                    }
                                ])
                            }
                        },
                        {
                            name:item.name+'\n'+item.sales,
                            value:item.stock,
                            itemStyle:{
                                color:'#333843'
                            }
                        }
                    ],
                    
                    hoverAnimation:false,
                    labelLine:{
                        show:false
                    }
                }
            })
           // console.log(seriesArr)
        
           const upOption = {
               series:seriesArr,
               title:{
                   fontSize:50                 
               }
              
           }
           this.mcharts.setOption(upOption)
        },
        startInterval(){
            if(this.timeId)
            {
                clearInterval(this.timeId)
            }
            this.timeId = setInterval(()=>{
                if(this.start == 0)
                {
                    this.start = this.end
                    this.end = 10
                }
                else
                {
                    this.start = 0
                    this.end = 5
                }
                this.upcharts()
            },5000)
        },
        screenAdapter(){
            const titleSize = this.$refs.strock_ref.offsetWidth /100*3.6
            const inner=titleSize*2
            const outter=titleSize*1.125
            const adapterOption={
                title:{
                    textStyle:{
                        fontSize:titleSize/2
                    }
                },
                series:[
                    {
                    radius:[outter,inner],
                        label:  {
                            fontSize:titleSize/2
                        }
                    },
                     {
                    radius:[outter,inner] ,
                        label:  {
                            fontSize:titleSize/2
                        } 
                    },
                     {
                    radius:[outter,inner],
                        label:  {
                            fontSize:titleSize/2
                        }  
                    },
                     {
                    radius:[outter,inner],
                        label:  {
                            fontSize:titleSize/2
                        }  
                    },
                     {
                    radius:[outter,inner],
                        label:  {
                            fontSize:titleSize/2
                        }  
                    }
                ]
            }
            this.mcharts.setOption(adapterOption)
            this.mcharts.resize()
        }
    },
   mounted(){
        
        this.initcharts()
        this.getData()
       
        window.addEventListener('resize',this.screenAdapter);
        this.screenAdapter()
    }
}
</script>

<style lang="less" scope>

</style>