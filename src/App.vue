<template>
  <div>
  <div class="header">

<!--    <a class="nav" href="">首页</a>-->
<!--    <a class="nav" href="">ads</a>-->
<!--    <a class="nav" href="">favourites</a>-->
<!--    <a class="nav" href="">music</a>-->
<!--    <a class="nav" href="/musicCayegories">musicCategories</a>-->
    <router-link to= "/home" class="nav" >首页</router-link>
    <router-link to= "/ads" class="nav" >ads</router-link>
    <router-link to= "/favourites" class="nav" >favourites</router-link>
    <router-link to= "/music" class="nav" >music</router-link>
    <router-link to= "/musicCategories" class="nav" >musicCategories</router-link>
    <router-link to= "/users" class="nav" >user</router-link>

    <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
    >
      <el-menu-item index="1">首页</el-menu-item>
      <el-sub-menu index="2">ads</el-sub-menu>
      <el-menu-item index="3" disabled>favourites</el-menu-item>
      <el-menu-item index="4">music</el-menu-item>
      <el-menu-item index="4">musicCategories</el-menu-item>
      <el-menu-item index="4">user</el-menu-item>
      <el-menu-item index="4">Register</el-menu-item>
      <el-menu-item index="4">Login</el-menu-item>
    </el-menu>

  </div>

  <router-view></router-view>

  <div class="footer">
    this is footer
  </div>

  </div>
<!--  <img alt="Vue logo" src="./assets/logo.png">-->
<!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
<!--  <musicCategoriesList msg="musicCategoriesList"/>-->
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import musicCategoriesList from "@/components/musicCategories/musicCategoriesList.vue";

export default {
  name: 'App',
  // components: {
  //   HelloWorld,
  //   // eslint-disable-next-line vue/no-unused-components
  //   musicCategoriesList
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
