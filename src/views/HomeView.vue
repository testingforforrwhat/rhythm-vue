<template>
  <div class="home-container">
    <!-- 欢迎区域 -->
    <div class="welcome-section">
      <h1 class="welcome-title">欢迎使用音乐管理系统</h1>
      <p class="welcome-subtitle">今天是 {{ currentDate }}</p>
    </div>

    <!-- 统计卡片区域 -->
    <div class="stats-container">
      <el-row :gutter="20">
        <!-- 音乐总数统计 -->
        <el-col :xs="24" :sm="12" :md="6">
          <el-card class="stats-card">
            <div class="stats-icon">
              <el-icon><MusicNote /></el-icon>
            </div>
            <div class="stats-info">
              <div class="stats-value">{{ statsData.totalSongs }}</div>
              <div class="stats-label">音乐总数</div>
            </div>
          </el-card>
        </el-col>

        <!-- 分类总数统计 -->
        <el-col :xs="24" :sm="12" :md="6">
          <el-card class="stats-card">
            <div class="stats-icon">
              <el-icon><Folder /></el-icon>
            </div>
            <div class="stats-info">
              <div class="stats-value">{{ statsData.totalCategories }}</div>
              <div class="stats-label">分类总数</div>
            </div>
          </el-card>
        </el-col>

        <!-- 今日新增统计 -->
        <el-col :xs="24" :sm="12" :md="6">
          <el-card class="stats-card">
            <div class="stats-icon">
              <el-icon><Plus /></el-icon>
            </div>
            <div class="stats-info">
              <div class="stats-value">{{ statsData.todayNew }}</div>
              <div class="stats-label">今日新增</div>
            </div>
          </el-card>
        </el-col>

        <!-- 系统状态 -->
        <el-col :xs="24" :sm="12" :md="6">
          <el-card class="stats-card">
            <div class="stats-icon">
              <el-icon><Monitor /></el-icon>
            </div>
            <div class="stats-info">
              <div class="stats-value">{{ systemStatus }}</div>
              <div class="stats-label">系统状态</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 快捷功能区域 -->
    <div class="quick-actions">
      <h2 class="section-title">快捷功能</h2>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="8" v-for="action in quickActions" :key="action.id">
          <el-card class="action-card" @click="handleQuickAction(action.id)">
            <div class="action-icon">
              <el-icon><component :is="action.icon" /></el-icon>
            </div>
            <div class="action-title">{{ action.title }}</div>
            <div class="action-desc">{{ action.description }}</div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {ref, onMounted} from 'vue'
import {Folder, Plus, Monitor} from '@element-plus/icons-vue'

export default {
  name: "HomeView",

  setup() {
    // 统计数据
    const statsData = ref({
      totalSongs: 0,
      totalCategories: 0,
      todayNew: 0
    })

    // 系统状态
    const systemStatus = ref('正常运行')

    // 快捷功能列表
    const quickActions = ref([
      {
        id: 1,
        title: '添加音乐',
        description: '快速添加新的音乐到系统',
        icon: Plus
      },
      {
        id: 2,
        title: '分类管理',
        description: '管理音乐分类',
        icon: Folder
      },
      {
        id: 3,
        title: '数据统计',
        description: '查看系统数据统计',
        icon: Monitor
      }
    ])

    // 获取当前日期
    const currentDate = ref(new Date().toLocaleDateString())

    // 初始化数据
    const initData = async () => {
      try {
        // 这里可以添加实际的数据获取逻辑
        statsData.value = {
          totalSongs: 1234,
          totalCategories: 56,
          todayNew: 7
        }
      } catch (error) {
        console.error('获取数据失败:', error)
      }
    }

    // 快捷功能处理
    const handleQuickAction = (actionId) => {
      console.log('执行快捷功能:', actionId)
      // 这里可以添加具体的功能处理逻辑
    }

    onMounted(() => {
      initData()
    })

    return {
      statsData,
      systemStatus,
      quickActions,
      currentDate,
      handleQuickAction
    }
  }
}
</script>

<style scoped>
.home-container {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.welcome-section {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 0;
  background: linear-gradient(135deg, #409EFF 0%, #36cfc9 100%);
  border-radius: 8px;
  color: white;
}

.welcome-title {
  font-size: 32px;
  margin-bottom: 10px;
}

.welcome-subtitle {
  font-size: 16px;
  opacity: 0.8;
}

.stats-container {
  margin-bottom: 40px;
}

.stats-card {
  padding: 20px;
  display: flex;
  align-items: center;
  transition: transform 0.3s;
}

.stats-card:hover {
  transform: translateY(-5px);
}

.stats-icon {
  font-size: 40px;
  color: #409EFF;
  margin-right: 20px;
}

.stats-info {
  flex: 1;
}

.stats-value {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
}

.stats-label {
  font-size: 14px;
  color: #909399;
  margin-top: 5px;
}

.section-title {
  font-size: 20px;
  color: #303133;
  margin-bottom: 20px;
}

.quick-actions {
  margin-top: 40px;
}

.action-card {
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.action-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.action-icon {
  font-size: 36px;
  color: #409EFF;
  margin-bottom: 15px;
}

.action-title {
  font-size: 18px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 10px;
}

.action-desc {
  font-size: 14px;
  color: #909399;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .welcome-title {
    font-size: 24px;
  }

  .stats-card {
    margin-bottom: 20px;
  }

  .action-card {
    margin-bottom: 20px;
  }
}
</style>
