<template>
  <div class="com-content">
        <div class="title">
              <!-- <span>我是标题</span> -->
              <span  @click="showselectitem()" :style="comstyle">{{title}}</span>
              <span @click="showselectitem()" :style="comstyle">︶</span>
              <div class="select" v-show="titlevisible">
              <div :style="comstyle" class="select-item" v-for="(item,index) in selectType" :key="index" @click="select(item.key,item.text)" v-show="title !== item.text">    
              <span>{{item.text}}</span>
              </div>      
              </div>
          </div>
      <div class="com-echarts" id="mcharts" ref="trend_ref">
        
      </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import '@/assets/sellerSkin.js';
export default {
    data(){
        return{
            TrendInfo:null,
            mcharts:null,
            titlevisible:false,
            choiceType:'map',
            title:'',
            titleFontSize:0,
            timeId:null,
            index:0,
        }
    },
    destroyed(){
        window.removeEventListener('resize',this.screenAdapter)
        clearInterval(this.timeId)
    },
    computed:{
        selectType(){
            if(this.TrendInfo)
            {
                return this.TrendInfo.type
            }
            
        },
        showtitle(){
                return this.TrendInfo[this.choiceType].title
        },
        comstyle(){
            return{
                fontSize:this.titleFontSize+'px'
            }
        }

    },
    methods:{
        initcharts(){
            
            this.mcharts = echarts.init(document.getElementById('mcharts'),'chalk')
            const option={
                tooltip:{
                    trigger:'axis',
                    axisPointer:{
                        type:'cross',
                        label:{
                            backgroundColor:'#6a985'
                        },
                        // axis:'auto',
                        // animation:'auto',
                        // animationDurationUpdata:200,
                    }
                },
                grid:{
                    left:'3%',
                    top:'35%',
                    right:'4%',
                    bottom:'1%',
                    containLabel:true
                },
                xAxis:{
                    type:'category',
                    boundaryGap:false
                },
                yAxis:{
                    type:'value'
                }
            }
            this.mcharts.setOption(option)
        },
        async getData(){
            await this.$http.get('/trend')
            .then(res=>{
                //console.log(res)
                this.TrendInfo = res.data
               // console.log(this.TrendInfo)
                this.upcharts()
               // console.log(this.TrendInfo)
               // console.log(this.choiceType)
                this.title = this.TrendInfo[this.choiceType].title
                //console.log(this.title)
                //this.startInterval()
            })
        },
        upcharts(){
            const colorArr = [
                'rgba(11,168,44,0.5)',
                'rgba(44,110,255,0.5)',
                'rgba(22,242,217,0.5)',
                'rgba(254,33,30,0.5)',
                'rgba(250,105,0,0.5)',
            ]
            
            const colorArr_2=[
                'rgba(11,168,44,0)',
                'rgba(44,110,255,0)',
                'rgba(22,242,217,0)',
                'rgba(254,33,30,0)',
                'rgba(250,105,0,0)',
            ]
            const timeArr = this.TrendInfo.common.month//x轴
           // console.log('x轴数据',timeArr)
            const valueArr = this.TrendInfo[this.choiceType].data//y轴
           // console.log('y轴数据',valueArr)
            const lengend = valueArr.map((item)=>{
                return item.name      
            })
           // console.log('地区数据',lengend)
            const seriesData = valueArr.map((item,index)=>{
               // console.log(index)
                return {
                    name:item.name,
                    type:'line',
                    data:item.data,
                    stack:this.choiceType,
                    areaStyle:{
                        color: new echarts.graphic.LinearGradient(0,0,0,1,[
                            {offset:0,color:colorArr[index]},
                            {offset:1,color:colorArr_2[index]}
                        ])
                    }
                }
            })
           //('系列数据',seriesData)
            const setOption = {
                legend:{
                    type:'plain',
                    show:true,
                    left:20,
                    top:'15%',
                    icon:'circle',
                },
                xAxis:{
                    
                    data:timeArr
                },
                lengend:{
                    data:lengend
                },
                series:seriesData
                    
                
            }
            this.mcharts.setOption(setOption)
        },
        screenAdapter(){
            this. titleFontSize = this.$refs.trend_ref.offsetWidth /100 *3.6

            const adapterOption = {
                legend:{
                    itemWidth:this.titleFontSize,
                    itemHeight:this.titleFontSize,
                    itemGap:this.titleFontSize,
                    textStyle:{
                        fontSize:this.titleFontSize /2
                    }
                }
            }
            this.mcharts.setOption(adapterOption)
            this.mcharts.resize()
        },
        showselectitem(){
           this.titlevisible = !this.titlevisible
            
        },
        select(key,text){
            this.title = text
            this.choiceType = key
            this.upcharts()
            this.showselectitem()
        },
        startInterval(){
            this.timeId = setInterval(()=>{
                if(this.index <3)
                {
                    this.choiceType = this.TrendInfo.type[this.index].key
                    //console.log(this.TrendInfo.type[this.index].key)
                    this.index++
                }
                else
                {
                    this.index = 0
                }  
                this.upcharts()
            },3000)
        },

    },
    mounted(){
        this.initcharts()
        this.getData()
        window.addEventListener('resize',this.screenAdapter)
        this.screenAdapter()
        //this.startInterval()
    }
}
</script>

<style lang="less" scope>
    .title{
        color:white;
        position: absolute;
        left:20px;
        top:20px;
        z-index:10;
        cursor: pointer;
    }
    .select{
        color:white;
       // display: none;
    }
</style>