<template>
    <div class="home" ref="homeRef">
        <homeTabBar/>
        <div class="search-bar" v-if="inShowSearchBar">
          <search-bar :start-date="'09.19'" :end-date="'09.20'"/>
          </div>
          <homeSearchBox  />
        <homeCategories />
        <div class="banner">
            <img src="@/assets/img/home/banner.webp" alt="">
        </div>

        <homeContent/>
    </div>
</template>
<script>
 export default { name: "home" }
 </script>

<script setup>
import homeTabBar from './cpns/home-tab-bar.vue'
import homeSearchBox from './cpns/home-search-box.vue'
import homeCategories from './cpns/home-categories.vue'
import homeContent from './cpns/home-content.vue'
import searchBar from '@/components/search-bar/search-bar.vue'
import { useHomeStore } from '@/stores/modules/home' 
import {useScroll}  from "@/hooks/useScroll.js"
import { onActivated, ref, watch,computed } from 'vue'

const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fetchCategoriesData()
homeStore.fetchHouselistData()


//实现滚动到底部重新获取新的一页数据
const homeRef = ref()
const { isReachBottom, scrollTop } = useScroll()
watch(isReachBottom, (newValue) => {
  if (newValue) {
    homeStore.fetchHouselistData().then(() => {
      isReachBottom.value = false
    })
  }
})
//解构出useScroll函数中return出的数据


//监听scrollTop的值，等它大于等于200就把inShowSearchBar变为true
// const inShowSearchBar =ref(false)
// watch(scrollTop,(newTop)=>{
//   if(newTop >=200){
//     inShowSearchBar.value=true
//   }else{
//     inShowSearchBar.value=false
//   }
//   console.log(newTop);
// })

// 用计算属性来监听可以提高代码质量
const inShowSearchBar = computed(()=>{
  return scrollTop.value >200
})



//发起请求拿到数据 再传到子组件中
// const hotSuggest=ref([])
// YJRequest.get({
//   url: "/home/hotSuggests"
// }).then(res => {
//   hotSuggest.value=res.data

// })

// 跳转回home时, 保留原来的位置
onActivated(() => {
  homeRef.value?.scrollTo({
    top: scrollTop.value
  })
})


</script>

<style lang="less" scoped>
.home {

  padding-bottom: 60px;

}

.banner {
  img {
    width: 100%;
  }
}

.search-bar {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  padding: 16px 16px 10px;
  background-color: #fff;
}

</style>