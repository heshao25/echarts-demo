<template>
  <div class="com-content">
      
      <div class="com-echarts" id="mcharts" ref="region_ref">

      </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import '@/assets/sellerSkin.js';
export default {
    data(){
        return{
            mcharts:null,
            RegionInfo:null,
            name:[],
            value:[],
            start:0,
            end:10,
            timeId:null,
            
        }
    },
    destroyed(){
        clearInterval(this.timeId)
    },
    methods:{
        initcharts(){
           
           this. mcharts = echarts.init(document.getElementById('mcharts'),'chalk')
           const option={
               title:{
                   text:' ▎地区销量趋势',
                   fontSize:66,
                   top:20,
                   left:30,

               },
               tooltip:{
                   show:true,
                   type:'line',
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
                grid:{
                    top:'20%',
                    left:'3%',
                    right:'6%',
                    bottom:'3%',
                    containLabel:true,//距离包含文字
                },
               xAxis:{
                   type:'category',
                  // data:['q','s','d']
                   
               },
               yAxis:{
                   type:'value'
               },
               series:[{
                   type:'bar',
                   //data:[100,450,455]
                   itemStyle:{
                       borderRadius:[66,66,0,0],
                       color:echarts.graphic.LinearGradient(0,1,0,0,[
                           {
                            offset:0,
                            color:'green'
                             },
                             {
                                 offset:1,
                                 color:'blue'
                             }
                       ])
                   }
                   
               }]
           }
          this. mcharts.setOption(option)        
        //  this.mCharts.on('mouseover',()=>{
        //         clearInterval(this.timeId)
        //     })
        //   this.mcharts.on('mouseout',()=>{
        //       this.startInterval()
        //   })
        },
       async getData(){
           await this.$http.get('/rank')
           .then(res=>{
               this.RegionInfo = res.data
               //console.log('getdata',this.RegionInfo)
               this.RegionInfo.sort((a,b)=>{
                   return b.value-a.value
               })
               this.upCharts()
           })
        
          
        },
        upCharts(){  
            if(!this.timeId)
            {
              this.startInterval() 
            }
                 
            const ShowData =this.RegionInfo.slice(this.start,this.end)
           // console.log(this.start,this.end)
            //this.setInterval()
            //console.log('show',ShowData)
            const RegionName = ShowData.map((item)=>{
               return item.name
           })
            const RegionValue = ShowData.map((item)=>{
               return item.value
           })
          // console.log(RegionName,RegionValue)
           const Newoption = {
              
               xAxis:{
                   data:RegionName
               },
              
               series:[{    
                   data:RegionValue 
               }]
           }
           this.mcharts.setOption(Newoption)
        },
        startInterval(){
            if(this.timeId)
            {
                clearInterval(this.timeId)
            }
            const length = this.RegionInfo.length
            this. timeId = setInterval(()=>{
                // console.log('set')

                if(this.end<length)
                {
                    this.start++
                    this.end++
                }
                else
                {
                    this.end = 10
                    this.start = 0
                }

                this.upCharts()
            },10000)
        },
        screenAdapter(){
            const size = this.$refs.region_ref.offsetWidth /100 *3.6
            const screenOption = {
                 title:{
                   text:' ▎地区销量趋势',
                   fontSize:size,
                   top:20/100 *3.6,
                   left:30/100*3.6,

               },
               tooltip:{
                
                   axisPointer:{
                     
                        lineStyle:{
                            width:size,
                            
                        }
                    }

               },
               series:[{
                   itemStyle:{
                       borderRadius:[size/2,size/2,0,0],
                   }
                   
               }]
            }
            this.mcharts.setOption(screenOption)
            this.mcharts.resize()
        }
    },
    mounted(){
        this.initcharts()
        this.getData()     
        window.addEventListener('resize',this.screenAdapter) 
    }
}
</script>

<style>

</style>