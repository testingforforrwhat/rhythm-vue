<template>
  <!-- 头部导航容器 -->
  <header class="header">
    <!-- Element Plus 导航菜单 -->
    <el-menu
        :default-active="activeIndex"
        class="nav-menu"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
    >
      <!-- 品牌Logo -->
      <div class="brand">
        <img src="@/assets/logo.png" alt="Rhythm" class="logo" />
        <span class="brand-name">Rhythm</span>
      </div>

      <!-- 导航菜单项 -->
      <el-menu-item index="1">
        <router-link to="/home" class="nav-link">
          <el-icon><HomeFilled /></el-icon>
          <span>首页</span>
        </router-link>
      </el-menu-item>

      <el-menu-item index="2">
        <router-link to="/ads" class="nav-link">
          <el-icon><Promotion /></el-icon>
          <span>广告</span>
        </router-link>
      </el-menu-item>

      <el-menu-item index="3">
        <router-link to="/favourites" class="nav-link">
          <el-icon><Star /></el-icon>
          <span>收藏</span>
        </router-link>
      </el-menu-item>

      <el-menu-item index="4">
        <router-link to="/music" class="nav-link">
          <el-icon><Headset /></el-icon>
          <span>音乐</span>
        </router-link>
      </el-menu-item>

      <el-menu-item index="5">
        <router-link to="/musicCategories" class="nav-link">
          <el-icon><Menu /></el-icon>
          <span>分类</span>
        </router-link>
      </el-menu-item>

      <!-- 右侧用户相关菜单 -->
      <div class="user-menu">
        <el-menu-item index="6">
          <router-link to="/users" class="nav-link">
            <el-icon><User /></el-icon>
            <span>用户</span>
          </router-link>
        </el-menu-item>

        <el-menu-item index="7">
          <router-link to="/" class="nav-link">
            <el-icon><Key /></el-icon>
            <span>登录</span>
          </router-link>
        </el-menu-item>

        <el-menu-item index="8">
          <router-link to="/register" class="nav-link">
            <el-icon><Plus /></el-icon>
            <span>注册</span>
          </router-link>
        </el-menu-item>
      </div>
    </el-menu>
  </header>
</template>

<script>
import { ref } from 'vue'
import {
  HomeFilled,
  Promotion,
  Star,
  Headset,
  Menu,
  User,
  Key,
  Plus
} from '@element-plus/icons-vue'

export default {
  name: "HeaderView",

  // 注册图标组件
  components: {
    HomeFilled,
    Promotion,
    Star,
    Headset,
    Menu,
    User,
    Key,
    Plus
  },

  setup() {
    // 当前激活的菜单项
    const activeIndex = ref('1')

    /**
     * 处理菜单选择事件
     * @param {string} index - 被选中菜单项的索引
     */
    const handleSelect = (index) => {
      console.log('选中的菜单项:', index)
    }

    return {
      activeIndex,
      handleSelect
    }
  }
}
</script>

<style scoped>
/* 头部导航样式 */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* 导航菜单样式 */
.nav-menu {
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 20px;
}

/* 品牌区域样式 */
.brand {
  display: flex;
  align-items: center;
  margin-right: 40px;
  padding: 0 15px;
}

.logo {
  height: 32px;
  margin-right: 10px;
}

.brand-name {
  color: #ffd04b;
  font-size: 20px;
  font-weight: bold;
}

/* 导航链接样式 */
.nav-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  gap: 5px;
}

/* 右侧用户菜单样式 */
.user-menu {
  margin-left: auto;
  display: flex;
  align-items: center;
}

/* 图标样式 */
.el-icon {
  margin-right: 4px;
  font-size: 18px;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .brand-name {
    display: none;
  }

  .nav-menu {
    padding: 0 10px;
  }

  .el-menu-item span {
    display: none;
  }

  .el-icon {
    margin-right: 0;
    font-size: 20px;
  }
}
</style>
