<script>
export default {
  name: "HeaderView"
}
</script>

<template>
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
      <el-menu-item index="1"><router-link to= "/home" class="nav" >首页</router-link></el-menu-item>
      <el-menu-item index="2"><router-link to= "/ads" class="nav" >ads</router-link></el-menu-item>
      <el-menu-item index="3"><router-link to= "/favourites" class="nav" >favourites</router-link></el-menu-item>
      <el-menu-item index="4"><router-link to= "/music" class="nav" >music</router-link></el-menu-item>
      <el-menu-item index="5"><router-link to= "/musicCategories" class="nav" >musicCategories</router-link></el-menu-item>
      <el-menu-item index="6"><router-link to= "/users" class="nav" >user</router-link></el-menu-item>
      <el-menu-item index="7"><router-link to= "/" class="nav" >Login</router-link></el-menu-item>
      <el-menu-item index="8"><router-link to= "/register" class="nav" >Register</router-link></el-menu-item>
    </el-menu>

  </div>
</template>

<style scoped>

</style>