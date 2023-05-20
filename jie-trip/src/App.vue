<script setup>
import { useRoute } from 'vue-router';
import tabBar from './components/tab-bar/tab-bar.vue';
import loading from './components/loading/loading.vue';
const route=useRoute()
</script>

<template>
    <div class="app">
      <loading/>
      <RouterView />
      <tabBar v-if="!route.meta.hideTabBar" />
    </div>


</template>

<style scoped>

</style>
 