<template>
  <!--
    顶部导航栏组件
    功能：提供网站主要导航功能，包括品牌展示、主要功能入口和用户操作
    特点：响应式设计、动画过渡效果、主题定制
  -->
  <header class="header-container">
    <el-menu
        :default-active="activeIndex"
        class="nav-menu"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
    >
      <!-- 品牌标识区域 -->
      <div class="brand-container" @click="navigateToHome">
        <img src="@/assets/logo.png" alt="Rhythm Logo" class="brand-logo" />
        <span class="brand-title">Rhythm</span>
      </div>

      <!-- 主导航区域 -->
      <div class="main-nav">
        <el-menu-item
            v-for="item in mainMenuItems"
            :key="item.index"
            :index="item.index"
            :route="item.route"
        >
          <router-link :to="item.route" class="nav-link">
            <el-icon><component :is="item.icon" /></el-icon>
            <span class="nav-text">{{ item.label }}</span>
          </router-link>
        </el-menu-item>
      </div>

      <!-- 用户操作区域 -->
      <div class="user-actions">
        <el-menu-item
            v-for="item in userMenuItems"
            :key="item.index"
            :index="item.index"
            :route="item.route"
        >
          <router-link :to="item.route" class="nav-link">
            <el-icon><component :is="item.icon" /></el-icon>
            <span class="nav-text">{{ item.label }}</span>
          </router-link>
        </el-menu-item>
      </div>
    </el-menu>
  </header>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import {
  HomeFilled,
  Promotion,
  Star,
  Headset,
  Menu as MenuIcon,
  User,
  Key,
  Plus
} from '@element-plus/icons-vue'

export default {
  name: 'HeaderView',
  components: {
    HomeFilled,
    Promotion,
    Star,
    Headset,
    MenuIcon,
    User,
    Key,
    Plus
  },

  setup() {
    const router = useRouter()
    const activeIndex = ref('1')

    // 主导航菜单配置
    const mainMenuItems = reactive([
      { index: '1', label: '首页', icon: 'HomeFilled', route: '/home' },
      { index: '2', label: '广告', icon: 'Promotion', route: '/ads' },
      { index: '3', label: '收藏', icon: 'Star', route: '/favourites' },
      { index: '4', label: '音乐', icon: 'Headset', route: '/music' },
      { index: '5', label: '分类', icon: 'MenuIcon', route: '/musicCategories' }
    ])

    // 用户菜单配置
    const userMenuItems = reactive([
      { index: '6', label: '用户', icon: 'User', route: '/users' },
      { index: '7', label: '登录', icon: 'Key', route: '/' },
      { index: '8', label: '注册', icon: 'Plus', route: '/register' }
    ])

    // 菜单选择处理
    const handleSelect = (index) => {
      activeIndex.value = index
    }

    // 品牌点击跳转
    const navigateToHome = () => {
      router.push('/home')
    }

    return {
      activeIndex,
      mainMenuItems,
      userMenuItems,
      handleSelect,
      navigateToHome
    }
  }
}
</script>

<style scoped>
/* 容器基础样式 */
.header-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--el-menu-bg-color);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

/* 导航菜单布局 */
.nav-menu {
  display: flex;
  align-items: center;
  height: 64px;
  border: none !important;
}

/* 品牌区域样式 */
.brand-container {
  display: flex;
  align-items: center;
  padding: 0 20px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.brand-container:hover {
  transform: scale(1.05);
}

.brand-logo {
  height: 36px;
  width: auto;
  margin-right: 12px;
  object-fit: contain;
}

.brand-title {
  font-size: 1.5rem;
  font-weight: 600;
  background: linear-gradient(45deg, #ffd04b, #ff9800);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.5px;
}

/* 主导航区域 */
.main-nav {
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 8px;
}

/* 用户操作区域 */
.user-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
  padding-right: 16px;
}

/* 导航链接样式 */
.nav-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 8px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  opacity: 0.9;
}

.el-icon {
  font-size: 18px;
  transition: transform 0.2s ease;
}

.nav-link:hover .el-icon {
  transform: scale(1.1);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .brand-title {
    font-size: 1.2rem;
  }

  .nav-text {
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  .header-container {
    position: sticky;
  }

  .brand-title {
    display: none;
  }

  .nav-text {
    display: none;
  }

  .el-icon {
    font-size: 20px;
    margin: 0;
  }

  .nav-menu {
    padding: 0 8px;
    height: 56px;
  }

  .main-nav {
    gap: 4px;
  }

  .user-actions {
    padding-right: 8px;
  }
}

/* 暗色主题适配 */
@media (prefers-color-scheme: dark) {
  .header-container {
    background: var(--el-bg-color-overlay);
  }
}
</style>
