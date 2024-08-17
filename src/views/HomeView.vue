<template>

  HomeView

  <!--  使用注册组件 component - AdsView -->
  <AdsView></AdsView>

</template>

<script>
import AdsView from "@/views/AdsView.vue";


// 导出一个vue实例 object
export default {
  name: "HomeView",
  components: {AdsView}
}
</script>

<style scoped>

</style>
