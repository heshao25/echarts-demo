<template>
  <div class="com-content">
      
      
      <seller></seller>
      
  </div>
</template>

<script>
import Seller from '@/components/seller'

export default {
    data(){
        return{}
    },
    methods:{
        // toseller(){
        //     this.$router.push({path:'/seller'})
        // }
    },
    components:{
        seller:Seller
    
    }

}
</script>

<style lang="less" scope>
.sellerpart{
    width:400px;
    height: 350px;
    cursor: pointer;

}

</style>