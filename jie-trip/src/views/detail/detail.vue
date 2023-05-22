<template>
   <van-nav-bar
  title="旅途"
  left-text="房屋详情"
  left-arrow
  @click-left="onClickLeft"
/>
<div class="main" v-if="detailInfos">
    <!-- 给组件传入对应的数据 -->
    <detailSwipe :swipe-data="detailInfos.mainPart.topModule.housePicture.housePics"/>
</div>


</template>

<script setup>
import detailSwipe from './cpns/detail-swipe.vue';
import { useRouter,useRoute } from 'vue-router';
import { useDetailStore } from '@/stores/modules/detail.js';
import {storeToRefs} from "pinia"
import { computed} from "vue"

const route =useRoute()
const router=useRouter()
//拿到对应的房间请求id
const houseId=route.params.id
//使用Detail仓库，并发起数据请求，最后把对应的数据传到组件中
const detailStore=useDetailStore()
detailStore.fetchDetailInfos(houseId)
const {detailInfos}=storeToRefs(detailStore)
// const mainPart=computed(()=> detailInfos.value.mainPart)

//返回按钮
const onClickLeft = () => {
    router.back()
}
</script>

<style lang="less" scoped>

</style>