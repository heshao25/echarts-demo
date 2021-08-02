<template>
  <div class="com-content" @bdlclick="back()">
   
      <div class="com-echarts" id="mcharts" ref="ref_map">

      </div>  
  </div>
</template>

<script>

import axios from 'axios'
import * as echarts from 'echarts';
import '@/assets/sellerSkin.js';
//import getProvinceMapInfo from '@/utils/map_utils.js'
export default {
    data(){
      return{
        mcharts:null,
        pointInfo:null,
        name2pinyin : {
            安徽: 'anhui',
            陕西: 'shanxi1',
            澳门: 'aomen',
            北京: 'beijing',
            重庆: 'chongqing',
            福建: 'fujian',
            甘肃: 'gansu',
            广东: 'guangdong',
            广西: 'guangxi',
            贵州: 'guizhou',
            海南: 'hainan',
            河北: 'hebei',
            黑龙江: 'heilongjiang',
            河南: 'henan',
            湖北: 'hubei',
            湖南: 'hunan',
            江苏: 'jiangsu',
            江西: 'jiangxi',
            吉林: 'jilin',
            辽宁: 'liaoning',
            内蒙古: 'neimenggu',
            宁夏: 'ningxia',
            青海: 'qinghai',
            山东: 'shandong',
            上海: 'shanghai',
            山西: 'shanxi',
            四川: 'sichuan',
            台湾: 'taiwan',
            天津: 'tianjin',
            香港: 'xianggang',
            新疆: 'xinjiang',
            西藏: 'xizang',
            云南: 'yunnan',
            浙江: 'zhejiang'
        },
        mapdata:{}
      }
    },
    methods:{
      async initcharts(){
        this.mcharts = echarts.init(document.getElementById('mcharts'),'chalk')
        const res = await axios.get('http://localhost:8080/static/map/china.json')
       // console.log(res)
       this.mapdata['china'] = res.data
        echarts.registerMap('china',res.data)
        const option={
          title:{
            text:'▎商家分布',
            left:20,
            top:20,
          },
          legend:{
            left:'5%',
            bottom:'5%',
            orient:'vertical'
          },
          geo:[{
            type:'map',
            map:'china',
            top:'5%',
            bottom:'5%',
            itemStyle:{
              areaColor:'#2172bf',
              borderColor:'#333'
            }
          }]
        }
        this.mcharts.setOption(option)
        this.mcharts.on('click',async arg=>{
          //console.log(arg)
           let provinceInfo = this.getProvinceMapInfo(arg.name)
          if(!this.mapdata[provinceInfo.key])
          {
             let res =await axios.get('http://localhost:8080'+provinceInfo.path)
            this.mapdata[provinceInfo.key] = res.data
             echarts.registerMap(provinceInfo.key,res.data)
          }
         
         // let provinceInfo = this.getProvinceMapInfo(arg.name)
          // let res =await axios.get('http://localhost:8080'+provinceInfo.path)
          // this.mapdata[provinceInfo.key] = res.data
           // console.log('res',res)
          
          
         
          const changeOption= {
            geo:[{
              map:provinceInfo.key
            }]
          }
          this.mcharts.setOption(changeOption)
           console.log('a',provinceInfo)
        })
        

      },
      async getData(){
        await this.$http.get('/map')
      
        .then(res=>{
          this.pointInfo = res.data
          console.log(this.pointInfo)
        })
        this.upcharts()
      },
      upcharts(){
        const legendArr = this.pointInfo.map((item)=>{
          return item.name
        })
        const seriesArr = this.pointInfo.map((item)=>{
          return{
            type:'effectScatter',
            name:item.name,
            data:item.children,
            coordinateSystem:'geo',
            rippleEffect:{
              scale:5,
              brushType:'stroke'
            }
          }
        })
        console.log(seriesArr)
        const upOption={
          legend:{
            data:legendArr

          },
          series:seriesArr
        }
        this.mcharts.setOption(upOption)
      },
      screenAdapter(){
        const titleSize = this.$refs.ref_map.offWidth/100 *3.6
        const adapterOption={
          title:{
            textStyle:{
              fontSize:titleSize
            }
          },
          legend:{
            itemWidth:titleSize/2,
            itemHeight:titleSize/2,
            itemGap:titleSize/2,
            textStyle:{
              fontSize:titleSize/2
            }
          }
        }
        this.mcharts.setOption(adapterOption)
        this.mcharts.resize()
      },
      getProvinceMapInfo (arg) {
        const path = `/static/map/province/${this.name2pinyin[arg]}.json`
        
        return {
          key: this.name2pinyin[arg],
          path: path
        }
      },
      back(){
        const revertOption = {
          geo:[{
            map: this.mapdata['china']
          }]
        }
        this.mcharts.setOption(revertOption)
      }
    },
    mounted(){
      this.initcharts()
      this.getData()
      window.addEventListener('resize',this.screenAdapter)
    }
}
</script>

<style lang="less" scope>

</style>