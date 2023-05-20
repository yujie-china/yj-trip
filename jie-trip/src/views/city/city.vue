<template>
    <div class="city top-page">
       <!-- 1.搜索框 -->
        <van-search 
        v-model="searchValue" 
        shape="round"
        show-action
        @cancel="onCancel" 
        placeholder="城市/区域/位置" 
        />
        <!-- 2.tab的切换 -->
      <!-- tabActive默认索引 -->
          <van-tabs v-model:active = "tabActive" >
            <template v-for="(value,key,index) in allCities" key="key">
              <van-tab :title="value.title" :name="key"></van-tab>
            </template>
          </van-tabs>
          <!-- content -->
          <div class="content">
            <!-- <template v-for="item in currentGroup?.cities" key="key">
              <div> {{ item }}</div>
            </template> -->
            <!-- <van-index-bar > -->
              <!-- <van-index-anchor :index="value.cities.group" /> -->
              <!-- <van-cell :title="item" /> -->
            <!-- </van-index-bar> -->
          
             <template v-for="(value,key,index) in allCities" key="key">
              <div v-show="tabActive === key">
               <cityGroup :groupData="value" ></cityGroup>
              </div>
            </template> 
          </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCityStore} from "@/stores/modules/city.js"
import { storeToRefs } from "pinia";
import { computed } from "vue";
import cityGroup from "./cpns/city-group.vue";
const router=useRouter()

//搜索内容
const searchValue =ref("")
//点击取消返回home页面
const onCancel = () =>{
    router.push("/home")
}

//tab的切换
const tabActive = ref(0);


//拿到city的数据
// const allCity=ref({})

// getCityAll().then(res => {
//   allCity.value = res.data
//   console.log(allCity.title);
// })
// 把上面的拿数据代码抽取到pinia中的action中
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities }=storeToRefs(cityStore)

//const currentGroup = allCities.value[tabActive.value]  因为.value这样是失去响应式的
//用computed就会变成响应是  因为改变后会计算
const currentGroup = computed( () => allCities.value[tabActive.value]) 



</script>

<style lang="less" scoped>

.city {
  // --van-tabs-line-height: 30px;

  // top固定定位
  // .top {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  // }

  // .content {
  //   margin-top: 98px;
  // }

  .top {
    position: relative;
    z-index: 9;
  }

  // 布局滚动
  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}
</style>