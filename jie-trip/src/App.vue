<script setup>
import { useRoute } from 'vue-router';
import tabBar from './components/tab-bar/tab-bar.vue';
const route=useRoute()
</script>

<template>
    <div class="app">
      <RouterView />
      <tabBar v-if="!route.meta.hideTabBar" />
    </div>


</template>

<style scoped>

</style>
 