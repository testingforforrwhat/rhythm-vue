<template>
  <div class="music-categories-view">
    <!-- 页面标题区域 -->
    <div class="page-header">
      <h1>音乐分类管理</h1>
    </div>

    <!-- 工具栏区域 -->
    <div class="toolbar">
      <!-- 导入数据按钮 -->
      <el-upload
          class="upload-button"
          :show-file-list="false"
          :before-upload="beforeUpload"
          :on-success="onSuccess"
          :on-error="onError"
          :disabled="importDataDisabled"
          action="/api/basic/import"
      >
        <el-button
            :disabled="importDataDisabled"
            type="success"
            :icon="importDataBtnIcon"
        >
          {{ importDataBtnText }}
        </el-button>
      </el-upload>

      <!-- 导出数据按钮 -->
      <el-button
          type="success"
          @click="exportData"
          :icon="Download"
      >
        导出数据
      </el-button>

      <!-- 添加分类按钮 -->
      <el-button
          type="primary"
          @click="showAddCategoryDialog"
          :icon="Plus"
      >
        添加分类
      </el-button>
    </div>

    <!-- 分类列表表格 -->
    <div class="table-container">
      <el-table
          :data="pagedCategories"
          stripe
          border
          height="350px"
      >
        <!-- 选择列 -->
        <el-table-column type="selection" width="55" />

        <!-- 分类ID列 -->
        <el-table-column
            label="分类ID"
            prop="categoryId"
            width="120"
        />

        <!-- 分类名称列 -->
        <el-table-column
            label="分类名称"
            prop="categoryName"
            min-width="150"
        >
          <template #default="{ row }">
            <el-input
                v-if="row.editing"
                v-model="row.categoryName"
                @keyup.enter="saveCategory(row)"
                placeholder="请输入分类名称"
            />
            <span v-else>{{ row.categoryName }}</span>
          </template>
        </el-table-column>

        <!-- 创建时间列 -->
        <el-table-column
            label="创建时间"
            prop="createdAt"
            width="180"
            :formatter="formatDate"
        />

        <!-- 更新时间列 -->
        <el-table-column
            label="更新时间"
            prop="updatedAt"
            width="180"
            :formatter="formatDate"
        />

        <!-- 操作列 -->
        <el-table-column
            fixed="right"
            label="操作"
            width="250"
        >
          <template #default="{ row }">
            <div class="operation-buttons">
              <el-button
                  @click="toggleEditing(row)"
                  size="small"
                  type="primary"
              >
                {{ row.editing ? '保存' : '编辑' }}
              </el-button>
              <el-button
                  @click="deleteCategory(row)"
                  size="small"
                  type="danger"
              >
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页器 -->
    <div class="pagination-container">
      <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="totalRowsCount"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </div>

    <!-- 添加/编辑分类对话框 -->
    <el-dialog
        :title="dialogTitle"
        v-model="dialogVisible"
        width="500px"
    >
      <el-form
          :model="categoryForm"
          ref="categoryForm"
          label-width="80px"
      >
        <el-form-item
            label="分类名称"
            prop="categoryName"
            :rules="[
            { required: true, message: '请输入分类名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ]"
        >
          <el-input
              v-model="categoryForm.categoryName"
              placeholder="请输入分类名称"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitCategory">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import moment from 'moment'
// import { Download, Plus } from '@element-plus/icons-vue'
import { request } from '@/utils/request'

export default {
  name: 'MusicCategoriesView',

  setup() {
    // 状态定义
    const categoryList = ref([])
    const currentPage = ref(1)
    const pageSize = ref(10)
    const dialogVisible = ref(false)
    const categoryForm = ref({
      categoryName: ''
    })

    // 计算属性
    const pagedCategories = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value
      const end = start + pageSize.value
      return categoryList.value.slice(start, end)
    })

    const totalRowsCount = computed(() => categoryList.value.length)

    return {
      categoryList,
      currentPage,
      pageSize,
      dialogVisible,
      categoryForm,
      pagedCategories,
      totalRowsCount
    }
  },

  data() {
    return {
      importDataBtnText: '导入数据',
      importDataBtnIcon: 'Upload',
      importDataDisabled: false,
      dialogTitle: '添加分类'
    }
  },

  mounted() {
    this.fetchCategoryList()
  },

  methods: {
    // 获取分类列表
    async fetchCategoryList() {
      try {
        const response = await request.get('categories/queryAll')
        this.categoryList = response.data.data
      } catch (error) {
        ElMessage.error('获取分类列表失败')
        console.error('Error fetching categories:', error)
      }
    },

    // 格式化日期
    formatDate(row, column, cellValue) {
      return moment(cellValue).format('YYYY-MM-DD HH:mm:ss')
    },

    // 显示添加分类对话框
    showAddCategoryDialog() {
      this.dialogTitle = '添加分类'
      this.categoryForm = { categoryName: '' }
      this.dialogVisible = true
    },

    // 提交分类表单
    async submitCategory() {
      try {
        if (this.categoryForm.categoryId) {
          await this.saveCategory(this.categoryForm)
        } else {
          await this.addCategory()
        }
        this.dialogVisible = false
        await this.fetchCategoryList()
        ElMessage.success('操作成功')
      } catch (error) {
        ElMessage.error('操作失败')
        console.error('Error submitting category:', error)
      }
    },

    // 添加分类
    async addCategory() {
      await request.post('categories', {
        categoryName: this.categoryForm.categoryName
      })
    },

    // 切换编辑状态
    toggleEditing(category) {
      if (category.editing) {
        this.saveCategory(category)
      } else {
        this.categoryList = this.categoryList.map(c => ({
          ...c,
          editing: c.categoryId === category.categoryId
        }))
      }
    },

    // 保存分类
    async saveCategory(category) {
      try {
        await request.patch('categories', {
          categoryId: category.categoryId,
          categoryName: category.categoryName
        })
        category.editing = false
        await this.fetchCategoryList()
        ElMessage.success('保存成功')
      } catch (error) {
        ElMessage.error('保存失败')
        console.error('Error saving category:', error)
      }
    },

    // 删除分类
    async deleteCategory(category) {
      try {
        await request.delete(`categories/${category.categoryId}`)
        await this.fetchCategoryList()
        ElMessage.success('删除成功')
      } catch (error) {
        ElMessage.error('删除失败')
        console.error('Error deleting category:', error)
      }
    },

    // 处理分页大小变化
    handleSizeChange(size) {
      this.pageSize = size
    },

    // 处理当前页变化
    handleCurrentChange(page) {
      this.currentPage = page
    }
  }
}
</script>

<style scoped>
.music-categories-view {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.page-header {
  margin-bottom: 20px;
}

.page-header h1 {
  color: #303133;
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  text-align: center;
}

.toolbar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.table-container {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.operation-buttons {
  display: flex;
  gap: 8px;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.dialog-footer {
  text-align: right;
  margin-top: 20px;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .toolbar {
    flex-direction: column;
  }

  .operation-buttons {
    flex-direction: column;
  }
}
</style>
