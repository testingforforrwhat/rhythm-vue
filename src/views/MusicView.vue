<template>
  <div class="music-view">
    <!-- 音乐列表容器 -->
    <div class="music-list-container">
      <h1 class="page-title">音乐列表</h1>

      <!-- 音乐表格 -->
      <el-table
          :data="pagedMusicList"
          stripe
          border
          height="450"
          class="music-table"
      >
        <!-- 选择列 -->
        <el-table-column type="selection" width="55" />

        <!-- 基本信息列 -->
        <el-table-column
            label="音乐ID"
            prop="musicId"
            width="100"
            align="center"
        />
        <el-table-column
            label="歌曲名称"
            prop="title"
            width="180"
            show-overflow-tooltip
        />
        <el-table-column
            label="歌手"
            prop="artist"
            width="150"
            show-overflow-tooltip
        />
        <el-table-column
            label="专辑"
            prop="album"
            width="150"
            show-overflow-tooltip
        />

        <!-- 时间信息列 -->
        <el-table-column
            label="创建时间"
            prop="createdAt"
            width="160"
            :formatter="formatDate"
            align="center"
        />
        <el-table-column
            label="更新时间"
            prop="updatedAt"
            width="160"
            :formatter="formatDate"
            align="center"
        />

        <!-- 播放统计列 -->
        <el-table-column
            label="本周播放次数"
            prop="musicPlayCountWeek"
            width="120"
            align="center"
        >
          <template #header>
            <div class="column-header-with-icon">
              <span>本周播放次数</span>
              <el-tooltip
                  content="每天同步一次播放数据"
                  placement="top"
              >
                <el-icon class="header-icon"><Notification /></el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>

        <!-- 音频播放器列 -->
        <el-table-column
            label="播放器"
            width="300"
            align="center"
        >
          <template #default="{ row }">
            <audio
                v-if="row.audioUrl"
                ref="audioPlayer"
                controls
                class="audio-player"
                @play="handlePlay(row)"
            >
              <source :src="row.audioUrl" type="audio/wav">
              您的浏览器不支持音频播放
            </audio>
          </template>
        </el-table-column>

        <!-- 操作按钮列 -->
        <el-table-column
            label="操作"
            width="200"
            fixed="right"
            align="center"
        >
          <template #default="{ row }">
            <el-space>
              <el-button
                  v-if="!row.audioUrl"
                  type="primary"
                  size="small"
                  @click="playAudio(row)"
              >
                播放
              </el-button>
              <el-button
                  type="success"
                  size="small"
                  @click="handleUpload(row)"
              >
                上传
              </el-button>
              <el-button
                  type="info"
                  size="small"
                  @click="handleDownload(row)"
              >
                下载
              </el-button>
            </el-space>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <div class="pagination-container">
        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :total="totalRowsCount"
            :page-sizes="[10, 20, 30, 40]"
            background
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Notification } from '@element-plus/icons-vue'
import moment from 'moment'
import { request } from '@/utils/request'

export default {
  name: 'MusicView',
  components: { Notification },

  setup() {
    // 数据状态
    const musicList = ref([])
    const currentPage = ref(1)
    const pageSize = ref(10)

    // 计算属性
    const pagedMusicList = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value
      const end = start + pageSize.value
      return musicList.value.slice(start, end)
    })

    const totalRowsCount = computed(() => musicList.value.length)

    // 方法
    const fetchMusicList = async () => {
      try {
        const response = await request.get('music/queryAll')
        musicList.value = response.data.data
      } catch (error) {
        console.error('获取音乐列表失败:', error)
        ElMessage.error('获取音乐列表失败')
      }
    }

    const playAudio = async (row) => {
      try {
        const response = await request.get(`playAudio/${row.musicId}`)
        const audioData = response.data.data

        // 处理音频数据
        const cleanString = audioData.substring(1, audioData.length - 1).replace(/\s+/g, '')
        const byteArray = cleanString.split(',').map(Number)
        const uint8Array = new Uint8Array(byteArray)

        // 创建音频 Blob 和 URL
        const audioBlob = new Blob([uint8Array], { type: 'audio/wav' })
        row.audioUrl = URL.createObjectURL(audioBlob)

        ElMessage.success('音频加载成功')
      } catch (error) {
        console.error('音频加载失败:', error)
        ElMessage.error('音频加载失败')
      }
    }

    const handlePlay = (row) => {
      row.musicPlayCountWeek++
      console.log(`播放音乐 ID: ${row.musicId}`)
    }

    // 分页处理
    const handleSizeChange = (val) => {
      pageSize.value = val
      currentPage.value = 1
    }

    const handleCurrentChange = (val) => {
      currentPage.value = val
    }

    // 格式化日期
    const formatDate = (row, column, value) => {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    }

    // 生命周期钩子
    onMounted(() => {
      fetchMusicList()
    })

    return {
      musicList,
      currentPage,
      pageSize,
      pagedMusicList,
      totalRowsCount,
      playAudio,
      handlePlay,
      handleSizeChange,
      handleCurrentChange,
      formatDate
    }
  }
}
</script>

<style scoped>
.music-view {
  padding: 20px;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.music-list-container {
  max-width: 1400px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.page-title {
  font-size: 24px;
  color: #303133;
  margin-bottom: 20px;
  text-align: center;
}

.music-table {
  margin-bottom: 20px;
}

.column-header-with-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.header-icon {
  font-size: 16px;
  color: #909399;
}

.audio-player {
  width: 250px;
  height: 32px;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

/* 响应式布局 */
@media (max-width: 1200px) {
  .music-list-container {
    margin: 0 20px;
  }
}

@media (max-width: 768px) {
  .music-list-container {
    padding: 10px;
  }

  .page-title {
    font-size: 20px;
  }
}
</style>
