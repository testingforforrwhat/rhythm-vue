<template>
  <!-- 音乐页面容器 -->
  <div class="music-view">
    <!-- 搜索区域 -->
    <div class="search-section">
      <el-input
          v-model="searchQuery"
          placeholder="搜索音乐..."
          prefix-icon="el-icon-search"
          clearable
          @input="handleSearch"
      >
        <template #append>
          <el-button icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </template>
      </el-input>
    </div>

    <!-- 音乐列表区域 -->
    <div class="music-list">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="music in musicList" :key="music.id">
          <!-- 音乐卡片 -->
          <el-card class="music-card" shadow="hover">
            <!-- 音乐封面 -->
            <div class="music-cover">
              <img :src="music.coverUrl" :alt="music.title">
              <!-- 播放按钮 -->
              <div class="play-overlay" @click="playMusic(music)">
                <i class="el-icon-video-play"></i>
              </div>
            </div>
            <!-- 音乐信息 -->
            <div class="music-info">
              <h3 class="music-title">{{ music.title }}</h3>
              <p class="music-artist">{{ music.artist }}</p>
              <!-- 操作按钮 -->
              <div class="music-actions">
                <el-button type="text" @click="addToFavorites(music)">
                  <i class="el-icon-star-off"></i>
                </el-button>
                <el-button type="text" @click="showMusicDetails(music)">
                  <i class="el-icon-info"></i>
                </el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 分页器 -->
    <div class="pagination">
      <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[12, 24, 36, 48]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </div>

    <!-- 音乐播放器 -->
    <div class="music-player" v-if="currentMusic">
      <div class="player-info">
        <img :src="currentMusic.coverUrl" :alt="currentMusic.title" class="player-cover">
        <div class="player-details">
          <h4>{{ currentMusic.title }}</h4>
          <p>{{ currentMusic.artist }}</p>
        </div>
      </div>
      <div class="player-controls">
        <el-button icon="el-icon-video-play" circle @click="togglePlay"></el-button>
        <el-slider v-model="playProgress" :show-tooltip="false" @change="handleProgressChange"></el-slider>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MusicView",
  data() {
    return {
      // 搜索相关
      searchQuery: "", // 搜索关键词

      // 分页相关
      currentPage: 1, // 当前页码
      pageSize: 12, // 每页显示数量
      total: 0, // 总数据量

      // 音乐列表
      musicList: [
        {
          id: 1,
          title: "示例音乐1",
          artist: "艺术家1",
          coverUrl: "https://via.placeholder.com/200",
          duration: "03:30"
        },
        // 更多音乐数据...
      ],

      // 当前播放的音乐
      currentMusic: null,
      playProgress: 0, // 播放进度
      isPlaying: false // 是否正在播放
    };
  },

  methods: {
    /**
     * 处理搜索
     */
    handleSearch() {
      console.log("搜索关键词:", this.searchQuery);
      // 实现搜索逻辑
    },

    /**
     * 播放音乐
     * @param {Object} music 音乐对象
     */
    playMusic(music) {
      this.currentMusic = music;
      this.isPlaying = true;
      console.log("播放音乐:", music.title);
    },

    /**
     * 添加到收藏
     * @param {Object} music 音乐对象
     */
    addToFavorites(music) {
      console.log("添加到收藏:", music.title);
      // 实现收藏逻辑
    },

    /**
     * 显示音乐详情
     * @param {Object} music 音乐对象
     */
    showMusicDetails(music) {
      console.log("显示详情:", music.title);
      // 实现显示详情逻辑
    },

    /**
     * 切换播放状态
     */
    togglePlay() {
      this.isPlaying = !this.isPlaying;
      console.log("播放状态:", this.isPlaying ? "播放" : "暂停");
    },

    /**
     * 处理进度条变化
     * @param {Number} value 进度值
     */
    handleProgressChange(value) {
      console.log("进度更新:", value);
      // 实现进度更新逻辑
    },

    /**
     * 处理页码变化
     * @param {Number} page 页码
     */
    handleCurrentChange(page) {
      this.currentPage = page;
      // 实现页码变化逻辑
    },

    /**
     * 处理每页显示数量变化
     * @param {Number} size 显示数量
     */
    handleSizeChange(size) {
      this.pageSize = size;
      // 实现显示数量变化逻辑
    }
  }
};
</script>

<style scoped>
/* 页面整体样式 */
.music-view {
  padding: 20px;
  min-height: 100vh;
  background-color: #f5f7fa;
}

/* 搜索区域样式 */
.search-section {
  max-width: 600px;
  margin: 0 auto 30px;
}

/* 音乐列表样式 */
.music-list {
  margin-bottom: 30px;
}

/* 音乐卡片样式 */
.music-card {
  margin-bottom: 20px;
  transition: transform 0.3s ease;
}

.music-card:hover {
  transform: translateY(-5px);
}

/* 音乐封面样式 */
.music-cover {
  position: relative;
  padding-top: 100%;
  overflow: hidden;
}

.music-cover img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 播放按钮遮罩层 */
.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;
}

.play-overlay i {
  font-size: 48px;
  color: white;
}

.music-cover:hover .play-overlay {
  opacity: 1;
}

/* 音乐信息样式 */
.music-info {
  padding: 15px;
}

.music-title {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: #303133;
}

.music-artist {
  margin: 5px 0;
  font-size: 14px;
  color: #909399;
}

/* 音乐操作按钮样式 */
.music-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

/* 分页器样式 */
.pagination {
  text-align: center;
  margin-top: 30px;
}

/* 音乐播放器样式 */
.music-player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 15px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.player-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.player-cover {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

.player-details h4 {
  margin: 0;
  font-size: 14px;
}

.player-details p {
  margin: 5px 0 0;
  font-size: 12px;
  color: #909399;
}

.player-controls {
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 1;
  max-width: 500px;
  margin: 0 20px;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .music-player {
    flex-direction: column;
    padding: 10px;
  }

  .player-controls {
    width: 100%;
    margin: 15px 0;
  }
}
</style>
