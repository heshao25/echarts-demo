<template>
  <div class="com-content">
      <span class="left" @click="left()" :style="comStyle"> < </span>
      <div class="com-echarts" id="mcharts" ref="hot_ref">

      </div>
      <span class="right" @click="right()" :style="comStyle"> > </span>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import '@/assets/sellerSkin.js';
export default {
    data(){
        return{
            mcharts:null,
            hotInfo:null,
            index:0,
            titleSize:null,
        }
    },
    created(){
      
    },
    methods:{
        initcharts(){
            this.mcharts = echarts.init(document.getElementById("mcharts"),'chalk')
            
            const option = {
                tooltip:{
                     trigger: "item",
                },
                legend:{
                    icon:'circle',
                    top:'5%'
                },
                title:{
                    text:'热销商品的占比',
                    //subtext: "女装",
                    left:20,
                    top:10,
                    textStyle:{
                        fontSize:40,
                         fontWeight: "bold"
                    },
                    // subtextStyle:{
                    //      fontSize:30,
                    //      fontWeight: "bold"
                    // }
                },
                 series:[{
                    type:'pie',
                    label:false,
                    emphasis:{
                        label:{
                            show:true
                        },
                        labelLine:false
                    }
                }]
            }
            this.mcharts.setOption(option)
        },
        async getData(){
            this.hotInfo = this.$http.get('/hotproduct')
            .then(res=>{
               
                this.hotInfo = res.data
               // console.log(this.hotInfo)
                this.upcharts()
            })
        },
        upcharts(){
            const formatterArr = this.hotInfo[this.index].children.map((item)=>{
                return item.children
            })
            const nameArr = this.hotInfo.map((item)=>{
                return item.name
            })
            const legend = this.hotInfo[this.index].children.map((item)=>{
                return item.name
            })
            const seriesData = this.hotInfo[this.index].children.map((item)=>{
                return {
                    name:item.name,
                    value:item.value,
                    children:item.children,
                                
                }
            })
           // console.log('s',seriesData)
            const upOption = {
                legend:{
                    data:legend,
                    top:20,
                    
                },
                title:{
                     subtext:nameArr[this.index],
                      subtextStyle:{
                         fontSize:30,
                         fontWeight: "bold"
                    }
                },
                tooltip:{
                    show:true,
                    trigger: 'item',
            
                    formatter:function(arg){
                        
                        const third = arg.data.children
                       // console.log(third)
                        let total = 0
                        third.forEach((item)=>{
                            total += item.value
                        })
                        let retStr = ''
                        third.forEach((item)=>{
                            retStr += `${item.name}:${ parseInt( item.value/total *100)}% </br>`
                        })
                        return retStr
                    }
                    

                },
               series:[{
                   data:seriesData
               }]
            }
            this.mcharts.setOption(upOption)
        },
        left(){
            if(this.index == 0)
            {
                this.index = 2
            }
            else
            {
                this.index--
            }
            this.upcharts()
            
        },
        right(){
            if(this.index == 2)
            {
                this.index = 0
            }
            else
            {
                this.index++
            }
            this.upcharts()
        },
        screenAdapter(){
            this. titleSize = this.$refs.hot_ref.offsetWidth /100 *3.6
            const adoption={
                title:{
                    textStyle:{
                        fontSize:this.titleSize
                    },
                    subtextStyle:{
                        fontSize:this.titleSize
                    }
                },
                series:[{
                    radius:this.titleSize*4.5,
                    center:['50%','50%']
                }]
            }
            this.mcharts.setOption(adoption)
            this.mcharts.resize()
        }
    },
    mounted(){
        this.initcharts()
          this.getData()
          window.addEventListener('resize',this.screenAdapter)
        
    },
    computed:{
        comStyle(){
            return{
                fontSize:this.titleSize+'px'
            }
        }
    }   
}
</script>

<style lang="less" scope>
.right{
    color:white;
    position: absolute;
    font-size: 50px;
    z-index:10;
    top:50%;
    transform: translateY(-50%);
    right:10%;
    cursor: pointer;
}
.right:hover{
    color:#dcdcdc;
}

.left{
    color:white;
    position: absolute;
    font-size: 50px;
    z-index:10;
    top:50%;
    transform: translateY(-50%);
    left:10%;
    
    cursor: pointer;
}
.left:hover{
    color:#dcdcdc;
}

</style>