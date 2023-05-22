<template>
    <div class="city-group">
      <van-index-bar >
      <van-index-anchor index="热门" />
      <div class="list">
        <template v-for="(city, index) in groupData.hotCities">
          <div class="city" @click="cityClick(city)">{{ city.cityName }}</div>
        </template>
      </div>
                <template v-for="(group,index) in groupData.cities" :key="index">
                <van-index-anchor :index="group.group"></van-index-anchor>
                <template v-for="(item,index) in group.cities" :key="index">
                  <van-cell  :title="item.cityName" @click="cityClick(item)" />
                </template> 
              </template>
        </van-index-bar>
    </div>
</template>

<script setup>
import { useCityStore } from '@/stores/modules/city';
import { useRouter } from 'vue-router';


const props = defineProps({
  groupData:{
    type:Object,
    default:()=>({})
  }
})
const cityStore = useCityStore()
const router =useRouter()
const cityClick = (city) => {
  cityStore.currentCity=city.cityName
  router.back()
}
</script>

<style lang="less" scoped>

.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px;
  padding-right: 25px;

  .city {
    width: 60px;
    height: 28px;
    border-radius: 14px;
    font-size: 12px;
    color: #000;
    text-align: center;
    line-height: 28px;
    background-color: #fff4ec;
    margin: 6px 0;
  }
}

</style>