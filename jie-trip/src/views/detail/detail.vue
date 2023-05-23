<template>
     <tab-control
      v-if="showTabControl"
      class="tabs"
      :titles="names"
      @tabItemClick="tabClick"
      ref="tabControlRef"
    />
   <van-nav-bar
  title="旅途"
  left-text="房屋详情"
  left-arrow
  @click-left="onClickLeft"
/>
<div class="main" v-if="mainPart">
    <!-- 给组件传入对应的数据 -->
    <detailSwipe :swipe-data="mainPart.topModule.housePicture.housePics"/>
    <detailinfos name="描述" :ref="getSectionRef" :top-infos="mainPart.topModule"/>
    <detailFacility name="设施" :ref="getSectionRef" :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"/>
    <detail-landlord name="房东" :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule"/>
    <detail-comment name="评论" :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule"/>
    <detail-notice name="须知" :ref="getSectionRef" :order-rules="mainPart.dynamicModule.rulesModule.orderRules"/>
    <detail-map name="周边" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule"/>
    <detail-intro :price-intro="mainPart.introductionModule"/>
</div>
<div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="">
      <div class="text">弘源旅途, 永无止境!</div>
</div>


</template>

<script setup>
import TabControl from "@/components/tab-control/tab-control.vue"
import detailSwipe from "./cpns/detail_01-swipe.vue"
import detailinfos from "./cpns/detail_02-infos.vue"
import detailFacility from "./cpns/detail_03-facility.vue"
import DetailLandlord from "./cpns/detail_04-landlord.vue"
import DetailComment from "./cpns/detail_05-comment.vue"
import DetailNotice from "./cpns/detail_06-notice.vue"
import DetailMap from "./cpns/detail_07-map.vue"
import DetailIntro from "./cpns/detail_08-intro.vue"
import { useRouter,useRoute } from 'vue-router'
import { useDetailStore } from '@/stores/modules/detail.js'
import {storeToRefs} from "pinia"
import { ref, computed, watch,onMounted} from "vue"
import {useScroll } from "@/hooks/useScroll" 

const route =useRoute()
const router=useRouter()
//拿到对应的房间请求id
const houseId=route.params.id
//使用Detail仓库，并发起数据请求，最后把对应的数据传到组件中
const detailStore=useDetailStore()
detailStore.fetchDetailInfos(houseId)
const {detailInfos}=storeToRefs(detailStore)
const mainPart=computed(()=> detailInfos.value.mainPart)

//返回按钮
const onClickLeft = () => {
    router.back()
}
const tabControlRef = ref()
const {scrollTop}=useScroll(tabControlRef)
const showTabControl = computed(()=>{
        return scrollTop.value >300
})



</script>

<style lang="less" scoped>
.tabs {
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>