<template>
    <div class="tabbar">
        <van-tabbar 
        v-model="currentIndex" 
        active-color="#ee0a24" 
        route>
            <template v-for="(item,index) in tabbarData" :key="index">
                <van-tabbar-item  replace :to="item.path">
                    <template #default>
                        <span>{{ item.text }}</span>
                    </template>
                     <template #icon>
                         <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
                         <img v-else :src="getAssetURL(item.imageActive)" alt="">
                     </template>
                </van-tabbar-item>
            </template>
        </van-tabbar>
    </div>
</template>

<script setup>
import tabbarData from '@/assets/data/tabbar'
import { getAssetURL } from "@/utils/load_assets.js"
import { watch,computed } from 'vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const currentIndex=ref(0)
watch(route,(newRoute)=>{
    const index = tabbarData.findIndex(item => item.path===newRoute.path)
if(index===-1) return
    currentIndex.value=index
})


</script>

<style lang="less" scoped>
.tabbar{

    :deep(.van-tabbar-item__icon){
   font-size: 50px;
    }

    img{
    height: 26px;
    }

}



</style>