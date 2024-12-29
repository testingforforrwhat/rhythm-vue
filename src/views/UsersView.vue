<template>
  <div class="users-container">
    <!-- 页面标题区域 -->
    <div class="page-header">
      <h1 class="page-title">用户管理中心</h1>
      <div class="header-actions">
        <el-button type="primary" @click="showAddUserDialog">
          <el-icon><Plus /></el-icon>新增用户
        </el-button>
      </div>
    </div>

    <!-- 统计卡片区域 -->
    <div class="stats-cards">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card shadow="hover" class="stats-card">
            <div class="stats-content">
              <div class="stats-icon total-users">
                <el-icon><User /></el-icon>
              </div>
              <div class="stats-info">
                <div class="stats-number">{{ totalUsers }}</div>
                <div class="stats-label">总用户数</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" class="stats-card">
            <div class="stats-content">
              <div class="stats-icon active-users">
                <el-icon><UserFilled /></el-icon>
              </div>
              <div class="stats-info">
                <div class="stats-number">{{ activeUsers }}</div>
                <div class="stats-label">活跃用户</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" class="stats-card">
            <div class="stats-content">
              <div class="stats-icon new-users">
                <el-icon><Plus /></el-icon>
              </div>
              <div class="stats-info">
                <div class="stats-number">{{ newUsers }}</div>
                <div class="stats-label">新增用户</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" class="stats-card">
            <div class="stats-content">
              <div class="stats-icon vip-users">
                <el-icon><Star /></el-icon>
              </div>
              <div class="stats-info">
                <div class="stats-number">{{ vipUsers }}</div>
                <div class="stats-label">VIP用户</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 用户列表区域 -->
    <el-card class="user-list-card">
      <template #header>
        <div class="card-header">
          <span>用户列表</span>
          <div class="header-actions">
            <el-input
                v-model="searchQuery"
                placeholder="搜索用户"
                prefix-icon="Search"
                class="search-input"
            />
            <el-button type="success" @click="exportUserData">
              <el-icon><Download /></el-icon>导出数据
            </el-button>
          </div>
        </div>
      </template>

      <el-table
          :data="filteredUsers"
          style="width: 100%"
          border
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="avatar" label="头像" width="80">
          <template #default="scope">
            <el-avatar :size="40" :src="scope.row.avatar" />
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="role" label="角色" width="120" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.status === 'active' ? 'success' : 'danger'">
              {{ scope.row.status === 'active' ? '活跃' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="scope">
            <el-button-group>
              <el-button size="small" @click="editUser(scope.row)">
                编辑
              </el-button>
              <el-button
                  size="small"
                  type="danger"
                  @click="deleteUser(scope.row)"
              >
                删除
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <div class="pagination-container">
        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :total="totalUsers"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { Plus, Download, User, UserFilled, Star } from '@element-plus/icons-vue'

export default {
  name: "UsersView",
  components: {
    Plus,
    Download,
    User,
    UserFilled,
    Star
  },
  setup() {
    // 用户数据
    const users = ref([
      {
        id: 1,
        username: '张三',
        email: 'zhangsan@example.com',
        role: '管理员',
        status: 'active',
        avatar: 'https://placeholder.com/150'
      },
      // 可以添加更多模拟数据
    ])

    // 统计数据
    const totalUsers = ref(100)
    const activeUsers = ref(80)
    const newUsers = ref(15)
    const vipUsers = ref(30)

    // 分页相关
    const currentPage = ref(1)
    const pageSize = ref(10)
    const searchQuery = ref('')

    // 计算属性：过滤后的用户列表
    const filteredUsers = computed(() => {
      return users.value.filter(user =>
          user.username.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    })

    // 方法定义
    const showAddUserDialog = () => {
      // 实现添加用户的逻辑
      console.log('显示添加用户对话框')
    }

    const editUser = (user) => {
      // 实现编辑用户的逻辑
      console.log('编辑用户:', user)
    }

    const deleteUser = (user) => {
      // 实现删除用户的逻辑
      console.log('删除用户:', user)
    }

    const exportUserData = () => {
      // 实现导出用户数据的逻辑
      console.log('导出用户数据')
    }

    const handleSizeChange = (val) => {
      pageSize.value = val
      // 重新加载数据
    }

    const handleCurrentChange = (val) => {
      currentPage.value = val
      // 重新加载数据
    }

    return {
      users,
      totalUsers,
      activeUsers,
      newUsers,
      vipUsers,
      currentPage,
      pageSize,
      searchQuery,
      filteredUsers,
      showAddUserDialog,
      editUser,
      deleteUser,
      exportUserData,
      handleSizeChange,
      handleCurrentChange
    }
  }
}
</script>

<style scoped>
.users-container {
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-title {
  font-size: 24px;
  color: #1f2f3d;
  margin: 0;
}

.stats-cards {
  margin-bottom: 24px;
}

.stats-card {
  height: 100%;
}

.stats-content {
  display: flex;
  align-items: center;
  padding: 10px;
}

.stats-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
}

.stats-icon :deep(svg) {
  font-size: 24px;
  color: white;
}

.total-users {
  background-color: #409EFF;
}

.active-users {
  background-color: #67C23A;
}

.new-users {
  background-color: #E6A23C;
}

.vip-users {
  background-color: #F56C6C;
}

.stats-info {
  flex-grow: 1;
}

.stats-number {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  line-height: 1;
  margin-bottom: 8px;
}

.stats-label {
  font-size: 14px;
  color: #909399;
}

.user-list-card {
  margin-bottom: 24px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.search-input {
  width: 200px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

:deep(.el-card__header) {
  padding: 15px 20px;
}

:deep(.el-button-group) {
  display: flex;
  gap: 8px;
}
</style>
