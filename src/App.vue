<template>

  <div id="app">

  <HeaderView class="HeaderView"></HeaderView>

  <router-view></router-view>

  <FooterView></FooterView>

  </div>

</template>


<script>
import HeaderView from "@/components/Header.vue";
import FooterView from "@/components/Footer.vue";


/*使用export语句只能导出已经命名的变量、函数或类。而使用export default语句的默认导出则可以导出任意表达式，包括匿名函数。

一个模块只能有一个默认导出，因此export default在一个模块中只能使用一次。*/

// 导出一个vue实例 object
// 根实例
// json对象
export default {
  name: 'App',
  components: {
    HeaderView,
    FooterView,
  }
}
</script>


<style>

.HeaderView{
  width: 100%;
}

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
