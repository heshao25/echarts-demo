import Vue from 'vue'
import Router from 'vue-router'
import Seller from '@/components/seller.vue'
import SellerPage from '@/view/sellerPage.vue'
import Region from '@/components/region.vue'
import Inventory from '@/components/inventory.vue'
import Trend from '@/components/trend.vue'
import Map from '@/components/map.vue'
import mapPage from '@/view/mapPage.vue'
import Hot from '@/components/hot.vue'

Vue.use(Router)

const routes =[
  
   
      {path:'/',redirect:'/inventory'},
      {path:'/seller',component:Seller},  
      {path:'/sellerpage',component:SellerPage},
      {path:'/region',component:Region},
      {path:'/inventory',component:Inventory},
      {path:'/trend',component:Trend},
      {path:'/map',component:Map},
      {path:'/hot',component:Hot},
      
    
  
]
const router = new Router({
  routes
})

export default  router
