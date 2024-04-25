<template>
  <div>
  <div class="header">

<!--    <a class="nav" href="">首页</a>-->
<!--    <a class="nav" href="">ads</a>-->
<!--    <a class="nav" href="">favourites</a>-->
<!--    <a class="nav" href="">music</a>-->
<!--    <a class="nav" href="/musicCayegories">musicCategories</a>-->
    <router-link to= "/home" class="nav" >首页</router-link>
    <router-link to= "/home/ads" class="nav" >ads</router-link>
    <router-link to= "/home/favourites" class="nav" >favourites</router-link>
    <router-link to= "/home/music" class="nav" >music</router-link>
    <router-link to= "/home/musicCayegories" class="nav" >musicCategories</router-link>
    <router-link to= "/home/users" class="nav" >user</router-link>

  </div>

  <router-view></router-view>

  <div class="footer">
    this is footer
  </div>

  </div>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <musicCategoriesList msg="musicCategoriesList"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import musicCategoriesList from "@/components/musicCategories/musicCategoriesList.vue";

export default {
  name: 'App',
  components: {
    HelloWorld,
    // eslint-disable-next-line vue/no-unused-components
    musicCategoriesList
  }
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
