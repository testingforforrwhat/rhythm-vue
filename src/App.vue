<template>
  <!--  https://element-plus.org/zh-CN/component/container.html-->
  <el-container>

      <!-- Header 组件 -->
      <el-header height="60px">
        <!-- 你的 Header 组件 -->

        <div>

          <!--    header 整个项目固定的部分-->
          <HeaderView class="HeaderView"></HeaderView>
        </div>

      </el-header>

      <!-- 主要内容区域 -->
      <el-main>
        <div class="music-view">

          <div>
            <!--    页面的中间部分 项目中每个页面不一样的部分-->
            <!--    使用路由视图 根据当前访问的路径, 映射页面级组件-->
            <router-view></router-view>
          </div>

        </div>
      </el-main>


      <el-footer>

        <div>
          <!--    footer 整个项目固定的部分-->
          <FooterView></FooterView>

        </div>

      </el-footer>

  </el-container>
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
