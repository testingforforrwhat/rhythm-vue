<template>
  <div class="favourites-container">
    <!-- 页面头部 -->
    <div class="favourites-header">
      <h1 class="page-title">我的收藏</h1>
      <div class="header-actions">
        <el-input
            v-model="searchQuery"
            placeholder="搜索收藏内容"
            prefix-icon="el-icon-search"
            clearable
            @input="handleSearch"
            class="search-input"
        />
        <el-select v-model="sortBy" placeholder="排序方式" @change="handleSort">
          <el-option label="最新收藏" value="newest" />
          <el-option label="最早收藏" value="oldest" />
          <el-option label="名称排序" value="name" />
        </el-select>
      </div>
    </div>

    <!-- 收藏内容列表 -->
    <div class="favourites-list" v-if="filteredFavourites.length">
      <el-card v-for="item in filteredFavourites"
               :key="item.id"
               class="favourite-item"
               :body-style="{ padding: '0px' }">
        <div class="favourite-content">
          <img :src="item.image" :alt="item.title" class="favourite-image" />
          <div class="favourite-info">
            <h3 class="favourite-title">{{ item.title }}</h3>
            <p class="favourite-description">{{ item.description }}</p>
            <p class="favourite-date">收藏于: {{ formatDate(item.date) }}</p>
          </div>
        </div>
        <div class="favourite-actions">
          <el-button type="primary" size="small" @click="viewDetail(item)">
            查看详情
          </el-button>
          <el-button type="danger" size="small" @click="removeFavourite(item)">
            取消收藏
          </el-button>
        </div>
      </el-card>
    </div>

    <!-- 空状态展示 -->
    <el-empty
        v-else
        description="暂无收藏内容"
        :image-size="200"
    >
      <el-button type="primary" @click="goToExplore">去发现内容</el-button>
    </el-empty>

    <!-- 确认删除对话框 -->
    <el-dialog
        title="确认删除"
        v-model="dialogVisible"
        width="30%"
    >
      <span>确定要取消收藏该内容吗？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="danger" @click="confirmRemove">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "FavouritesView",

  data() {
    return {
      // 搜索关键词
      searchQuery: "",
      // 排序方式
      sortBy: "newest",
      // 删除确认对话框显示状态
      dialogVisible: false,
      // 待删除的收藏项
      itemToRemove: null,
      // 收藏列表数据
      favourites: [
        {
          id: 1,
          title: "示例收藏 1",
          description: "这是一个示例收藏内容的描述",
          image: "https://via.placeholder.com/200x150",
          date: new Date("2024-01-01"),
        },
        {
          id: 2,
          title: "示例收藏 2",
          description: "另一个示例收藏内容的描述",
          image: "https://via.placeholder.com/200x150",
          date: new Date("2024-01-02"),
        },
      ],
    };
  },

  computed: {
    /**
     * 根据搜索和排序过滤后的收藏列表
     * @returns {Array} 过滤后的收藏列表
     */
    filteredFavourites() {
      let result = [...this.favourites];

      // 搜索过滤
      if (this.searchQuery) {
        result = result.filter(item =>
            item.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      // 排序
      result.sort((a, b) => {
        switch (this.sortBy) {
          case "newest":
            return b.date - a.date;
          case "oldest":
            return a.date - b.date;
          case "name":
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });

      return result;
    },
  },

  methods: {
    /**
     * 格式化日期
     * @param {Date} date - 需要格式化的日期
     * @returns {string} 格式化后的日期字符串
     */
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },

    /**
     * 处理搜索输入
     */
    handleSearch() {
      // 可以添加防抖逻辑
      console.log("搜索:", this.searchQuery);
    },

    /**
     * 处理排序变更
     */
    handleSort() {
      console.log("排序方式:", this.sortBy);
    },

    /**
     * 查看收藏详情
     * @param {Object} item - 收藏项
     */
    viewDetail(item) {
      console.log("查看详情:", item);
      // 实现查看详情逻辑，例如：
      // this.$router.push(`/detail/${item.id}`);
    },

    /**
     * 删除收藏
     * @param {Object} item - 要删除的收藏项
     */
    removeFavourite(item) {
      this.itemToRemove = item;
      this.dialogVisible = true;
    },

    /**
     * 确认删除收藏
     */
    confirmRemove() {
      if (this.itemToRemove) {
        this.favourites = this.favourites.filter(
            item => item.id !== this.itemToRemove.id
        );
        this.$message.success("已取消收藏");
      }
      this.dialogVisible = false;
      this.itemToRemove = null;
    },

    /**
     * 跳转到发现页面
     */
    goToExplore() {
      // 实现跳转逻辑，例如：
      // this.$router.push('/explore');
    },
  },

  // 生命周期钩子：组件挂载时
  mounted() {
    // 这里可以添加获取收藏列表数据的逻辑
    // this.fetchFavourites();
  },
};
</script>

<style scoped>
.favourites-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.favourites-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.page-title {
  font-size: 24px;
  color: #303133;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 15px;
}

.search-input {
  width: 250px;
}

.favourites-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.favourite-item {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.favourite-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.favourite-content {
  padding: 14px;
}

.favourite-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
}

.favourite-info {
  padding: 14px 0;
}

.favourite-title {
  margin: 0 0 10px;
  font-size: 18px;
  color: #303133;
}

.favourite-description {
  margin: 0 0 10px;
  font-size: 14px;
  color: #606266;
  line-height: 1.4;
}

.favourite-date {
  margin: 0;
  font-size: 12px;
  color: #909399;
}

.favourite-actions {
  padding: 10px 14px;
  border-top: 1px solid #ebeef5;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .favourites-header {
    flex-direction: column;
    gap: 15px;
  }

  .header-actions {
    width: 100%;
    flex-direction: column;
  }

  .search-input {
    width: 100%;
  }
}
</style>
