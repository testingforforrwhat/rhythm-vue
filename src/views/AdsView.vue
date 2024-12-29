<template>
  <div class="ads-container">
    <!-- 页面标题区域 -->
    <div class="page-header">
      <h2>广告管理</h2>
      <el-button type="primary" @click="showAddDialog">
        <el-icon><Plus /></el-icon>新增广告
      </el-button>
    </div>

    <!-- 搜索筛选区域 -->
    <div class="search-section">
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="广告标题">
          <el-input
              v-model="searchForm.title"
              placeholder="请输入广告标题"
              clearable
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option label="启用" value="active" />
            <el-option label="禁用" value="inactive" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 广告列表区域 -->
    <el-table
        :data="adsList"
        border
        stripe
        v-loading="loading"
        class="ads-table"
    >
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column prop="title" label="广告标题" min-width="200" />
      <el-table-column prop="image" label="广告图片" width="180">
        <template #default="scope">
          <el-image
              :src="scope.row.image"
              :preview-src-list="[scope.row.image]"
              fit="cover"
              class="ad-image"
          />
        </template>
      </el-table-column>
      <el-table-column prop="position" label="投放位置" width="150" />
      <el-table-column prop="startTime" label="开始时间" width="180" />
      <el-table-column prop="endTime" label="结束时间" width="180" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <el-tag :type="scope.row.status === 'active' ? 'success' : 'info'">
            {{ scope.row.status === 'active' ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template #default="scope">
          <el-button-group>
            <el-button
                type="primary"
                size="small"
                @click="handleEdit(scope.row)"
            >
              编辑
            </el-button>
            <el-button
                type="danger"
                size="small"
                @click="handleDelete(scope.row)"
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
          :total="total"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </div>

    <!-- 添加/编辑广告对话框 -->
    <el-dialog
        :title="dialogType === 'add' ? '新增广告' : '编辑广告'"
        v-model="dialogVisible"
        width="600px"
    >
      <el-form
          ref="adsFormRef"
          :model="adsForm"
          :rules="adsRules"
          label-width="100px"
      >
        <el-form-item label="广告标题" prop="title">
          <el-input v-model="adsForm.title" placeholder="请输入广告标题" />
        </el-form-item>
        <el-form-item label="广告图片" prop="image">
          <el-upload
              class="avatar-uploader"
              action="/api/upload"
              :show-file-list="false"
              :on-success="handleUploadSuccess"
              :before-upload="beforeUpload"
          >
            <img v-if="adsForm.image" :src="adsForm.image" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="投放位置" prop="position">
          <el-select v-model="adsForm.position" placeholder="请选择投放位置">
            <el-option label="首页轮播" value="home_banner" />
            <el-option label="侧边栏" value="sidebar" />
            <el-option label="弹窗广告" value="popup" />
          </el-select>
        </el-form-item>
        <el-form-item label="投放时间" prop="timeRange">
          <el-date-picker
              v-model="adsForm.timeRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
              v-model="adsForm.status"
              :active-value="'active'"
              :inactive-value="'inactive'"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

export default {
  name: 'AdsView',
  components: {
    Plus
  },

  setup() {
    // 数据状态定义
    const loading = ref(false)
    const currentPage = ref(1)
    const pageSize = ref(10)
    const total = ref(0)
    const dialogVisible = ref(false)
    const dialogType = ref('add')
    const adsFormRef = ref(null)

    // 搜索表单数据
    const searchForm = reactive({
      title: '',
      status: ''
    })

    // 广告表单数据
    const adsForm = reactive({
      title: '',
      image: '',
      position: '',
      timeRange: [],
      status: 'active'
    })

    // 表单验证规则
    const adsRules = {
      title: [
        { required: true, message: '请输入广告标题', trigger: 'blur' },
        { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
      ],
      image: [
        { required: true, message: '请上传广告图片', trigger: 'change' }
      ],
      position: [
        { required: true, message: '请选择投放位置', trigger: 'change' }
      ],
      timeRange: [
        { required: true, message: '请选择投放时间', trigger: 'change' }
      ]
    }

    // 模拟广告数据
    const adsList = ref([
      {
        id: 1,
        title: '双11促销活动',
        image: 'https://placeholder.com/300x200',
        position: '首页轮播',
        startTime: '2024-11-01',
        endTime: '2024-11-12',
        status: 'active'
      }
      // 更多数据...
    ])

    // 方法定义
    const handleSearch = () => {
      // 实现搜索逻辑
      console.log('搜索条件：', searchForm)
      loadAdsData()
    }

    const resetSearch = () => {
      // 重置搜索表单
      Object.keys(searchForm).forEach(key => {
        searchForm[key] = ''
      })
      handleSearch()
    }

    const showAddDialog = () => {
      dialogType.value = 'add'
      dialogVisible.value = true
      // 重置表单
      if (adsFormRef.value) {
        adsFormRef.value.resetFields()
      }
    }

    const handleEdit = (row) => {
      dialogType.value = 'edit'
      dialogVisible.value = true
      // 填充表单数据
      Object.keys(adsForm).forEach(key => {
        adsForm[key] = row[key]
      })
    }

    const handleDelete = (row) => {
      console.log('确定要删除该广告吗：', row);
      ElMessageBox.confirm(
          '确定要删除该广告吗？',
          '警告',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
      ).then(() => {
        // 实现删除逻辑
        ElMessage.success('删除成功')
        loadAdsData()
      }).catch(() => {
        ElMessage.info('已取消删除')
      })
    }

    const handleSubmit = async () => {
      if (!adsFormRef.value) return

      try {
        await adsFormRef.value.validate()
        // 实现提交逻辑
        ElMessage.success(dialogType.value === 'add' ? '添加成功' : '更新成功')
        dialogVisible.value = false
        loadAdsData()
      } catch (error) {
        console.error('表单验证失败：', error)
      }
    }

    const handleSizeChange = (val) => {
      pageSize.value = val
      loadAdsData()
    }

    const handleCurrentChange = (val) => {
      currentPage.value = val
      loadAdsData()
    }

    const loadAdsData = () => {
      loading.value = true
      // 模拟API调用
      setTimeout(() => {
        loading.value = false
      }, 500)
    }

    // 图片上传相关方法
    const handleUploadSuccess = (response) => {
      adsForm.image = response.url
      ElMessage.success('上传成功')
    }

    const beforeUpload = (file) => {
      const isImage = file.type.startsWith('image/')
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isImage) {
        ElMessage.error('上传文件只能是图片格式!')
        return false
      }
      if (!isLt2M) {
        ElMessage.error('上传图片大小不能超过 2MB!')
        return false
      }
      return true
    }

    // 生命周期钩子
    onMounted(() => {
      loadAdsData()
    })

    return {
      loading,
      currentPage,
      pageSize,
      total,
      dialogVisible,
      dialogType,
      adsFormRef,
      searchForm,
      adsForm,
      adsRules,
      adsList,
      handleSearch,
      resetSearch,
      showAddDialog,
      handleEdit,
      handleDelete,
      handleSubmit,
      handleSizeChange,
      handleCurrentChange,
      handleUploadSuccess,
      beforeUpload
    }
  }
}
</script>

<style scoped>
.ads-container {
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-section {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.ads-table {
  margin-bottom: 20px;
}

.ad-image {
  width: 100px;
  height: 60px;
  border-radius: 4px;
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  line-height: 178px;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

:deep(.el-upload) {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

:deep(.el-upload:hover) {
  border-color: #409eff;
}
</style>
