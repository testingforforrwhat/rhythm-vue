<template>
  <div>

  <HeaderView></HeaderView>

  <router-view></router-view>

  <FooterView></FooterView>

  </div>
<!--  <img alt="Vue logo" src="./assets/logo.png">-->
<!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
<!--  <musicCategoriesList msg="musicCategoriesList"/>-->
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import musicCategoriesList from "@/components/musicCategories/musicCategoriesList.vue";

import HeaderView from "@/components/Header.vue";
import FooterView from "@/components/Footer.vue";

export default {
  name: 'App',
  components: {
    HeaderView,
    FooterView,
  }
}
</script>

<style>
/*#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  !* 解决element table 表头和表体错版问题 *!
  body .el-table th.gutter{
    display: table-cell!important;
  }

}*/
</style>
