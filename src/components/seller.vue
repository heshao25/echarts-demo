<template>
<div class="com-content">
  <div class="com-echarts" id="mycharts" ref="seller_ref">

  </div>
</div>
  
</template>

<script>

import * as echarts from 'echarts';
import '@/assets/sellerSkin.js';
// import {BarChart} from 'echarts/core';
// import {TitleComponent,TooltipComponent,GridComponent} from 'echarts/components';
// import {CanvasRenderer} from 'echarts/renderers';
// echarts.use(
//     [TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer]
// );
export default {
    
    data(){
        return{
            ShopInfo:[],
            mCharts:null,
            currentPage: 1,
            totalPage:0,
            timeId:null
        };
    },
    created(){
       
    },
    destroyed(){
        clearInterval(this.timeId)
        window.removeEventListener('resize', this.screenAdapter)
    },
    methods:{
        initcharts(){
             this.mCharts = echarts.init(document.getElementById("mycharts"),'chalk')
             const initcharts = {
                     tooltip:{
                    trigger:'axis',
                    axisPointer:{
                        type:'line',
                        z:0,
                        lineStyle:{
                            width:66,
                            color:'#2d3443'
                        }
                    }
                },
                title:{
                   text:' ▎商家销售统计',
                   textStyle:{
                       fontStyle:66,
                   },
                   left:20,
                   top:20,
                },
                grid:{
                    top:'20%',
                    left:'3%',
                    right:'6%',
                    bottom:'3%',
                    containLabel:true,//距离包含文字
                },
                xAxis:{
                    type:'value'
                    
                },
                yAxis:{
                    type:'category',
                    //data:sellerNames
                },
                series:[{
                    type:'bar',
                    //data:sellerValue,
                    barWidth:66,
                    label:{
                        show:true,
                         position:'right',
                        textStyle:{
                            color:'white',
                        }
                    },
                    itemStyle:{
                        barBorderRadius:[0,33,33,0],

                        color:echarts.graphic.LinearGradient(0,0,1,0, [
                            {offset:0,
                            color:'#5052ee'},   
                            {offset:1,
                            color:'#ab6ee5'}
                        ])
                    },

                }]
             }
             this.mCharts.setOption(initcharts)
            this.mCharts.on('mouseover',()=>{
                clearInterval(this.timeId)
            })
            this.mCharts.on('mouseout',()=>{
                this.startInterval()
            })
        },
        async getData(){
            await this.$http.get('/seller')
            .then(res=>{
                this.ShopInfo = res.data
                this.ShopInfo.sort((a, b)=>{
                    return a.value - b.value //小到大
                })
                this.totalPage = this.ShopInfo.length % 5 == 0 ? this.ShopInfo.length/5:this.ShopInfo.length/5+1
                this.startInterval()
                this.updateChart()
                
            })
        },
        updateChart(){
            const start = (this.currentPage-1)*5
            const end = this.currentPage*5
            const showData = this.ShopInfo.slice(start,end)
            const sellerNames = showData.map((item)=>{
                return item.name
            })
            const sellerValue = showData.map((item)=>{
                return item.value
            })
            
            const option = {
                yAxis:{
                    data:sellerNames
                },
                series:[{ 
                    data:sellerValue,
                }]
            }
            this.mCharts.setOption(option);
        },
        startInterval(){
            if(this.timeId){
                clearInterval(this.timeId)
            }
            this.timeId = setInterval(()=>{
                if(this.currentPage<this.totalPage)
                {
                    this.currentPage++
                }
                else
                {
                    this.currentPage = 1
                }
                this.updateChart()
            },3000)
        },
        screenAdapter(){
        //    console.log( this.$refs.seller_ref.offsetWidth)
           const titleFontSize = this.$refs.seller_ref.offsetWidth/100*3.6
           const adapterOption={
                 tooltip:{
                   
                    axisPointer:{
                        
                        
                        lineStyle:{
                            width:titleFontSize,
                           
                        }
                    }
                },
                title:{                  
                   textStyle:{
                       fontStyle:titleFontSize,
                   },                   
                },             
                series:[{                   
                    //data:sellerValue,
                    barWidth:titleFontSize,                    
                    itemStyle:{
                        barBorderRadius:[0,titleFontSize/2,titleFontSize/2,0],
                    },
                }]
           }
           this.mCharts.setOption(adapterOption)
           
            this.mCharts.resize()
        }

    },
    mounted(){
        this.getData();
        this.initcharts();
        window.addEventListener('resize',this.screenAdapter);
        this.screenAdapter()
    }
}
</script>

<style lang="less" scope>
.echarts{
    width:100%;
    height:100%;
}
</style>