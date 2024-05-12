<template>
  <div>
    <h1>Category List</h1>
<!--    <ul>-->
<!--      <li v-for="category in paginatedCategories" :key="category.categoryId">-->
<!--&lt;!&ndash;        {{ category.categoryName }}&ndash;&gt;-->
<!--&lt;!&ndash;        <button @click="editCategory(category)">Edit</button>&ndash;&gt;-->
<!--&lt;!&ndash;        <button @click="deleteCategory(category.categoryId)">Delete</button>&ndash;&gt;-->
<!--        <span v-if="!category.editing">{{ category.categoryName }}</span>-->
<!--        <input v-else v-model="category.categoryName" @keyup.enter="saveCategory(category)" />-->
<!--        <button v-if="!category.editing" @click="enableEditing(category)">Edit</button>-->
<!--        <button v-if="category.editing" @click="saveCategory(category)">Save</button>-->
<!--        <button @click="deleteCategory(category.categoryId)">Delete</button>-->
<!--      </li>-->


    <div>

      <el-upload
          :show-file-list="false"
          :before-upload="beforeUpload"
          :on-success="onSuccess"
          :on-error="onError"
          :disabled="importDataDisabled"
          style="display: inline-flex;margin-right: 8px"
          action="/api/basic/import">

        <el-button :disabled="importDataDisabled" type="success" :icon="importDataBtnIcon">
          {{importDataBtnText}}
        </el-button>

      </el-upload>

      <el-button type="success" @click="exportData" :icon="Download">
        导出数据
      </el-button>

      <el-button type="primary" @click="addCategory" :icon="Plus">
        添加用户
      </el-button>
    </div>

    <div>
        <el-table
            :data="pagedCategories"
            stripe
            border
            style="width: 100%"
              >

          <el-table-column
              type="selection"></el-table-column>

          <el-table-column
              label="分类ID"
              prop="categoryId"
              width="150px"></el-table-column>

          <el-table-column
              label="分类名称"
              prop="categoryName"
              width="150px"
              v-slot="scope">
            <el-input v-if="scope.row.editing"
                      v-model="scope.row.categoryName"
                      @keyup.enter="saveCategory(scope.row.categoryName)" />
          </el-table-column>

          <el-table-column
              label="创建时间"
              prop="createdAt"
              width="120px"
              :formatter="formatDate"></el-table-column>

          <el-table-column
              label="更新时间"
              prop="updatedAt"
              width="120px"></el-table-column>

          <el-table-column
              fixed="right"
              width="250"
              label="操作">
            <template v-slot="scope">
              <el-input v-if="scope.row.editing" v-model="scope.row.categoryName" @keyup.enter="saveCategory(scope.row.categoryName)" />
              <el-button @click="toggleEditing(scope.row)" style="padding: 3px" size="small">
                {{ scope.row.editing ? '保存' : '编辑' }}
              </el-button>
              <el-button style="padding: 3px" size="small" type="primary">查看详细资料</el-button>
              <el-button @click="deleteCategory(scope.row)" style="padding: 3px" size="small" type="danger">删除
              </el-button>
            </template>
          </el-table-column>

        </el-table>

    <div class="demo-pagination-block">
      <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          v-model:total="totalRowsCount"
          :page-sizes="[10, 20, 30, 40]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          @prev-click="previousPage"
          @next-click="nextPage"
      />
    </div>
    </div>




<!--    </ul>-->

<!--    <form @submit.prevent="addCategory">-->
<!--      <label for="categoryName">Category Name:</label>-->
<!--      <input type="text" id="categoryName" v-model="newCategory.categoryName">-->

<!--      <button type="submit">Add Category</button>-->
<!--    </form>-->

<!--    <div>-->
<!--      <button @click="previousPage" :disabled="currentPage === 1">Previous</button>-->
<!--      <span>{{ currentPage }} / {{ totalPages }}</span>-->
<!--      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>-->
<!--    </div>-->
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import {Download, Plus} from "@element-plus/icons-vue";
import {requestAll} from "@/utils/request"; // 引入 moment.js 用于时间格式化

export default {
  data() {
    return {
      categoryList: [],
      currentPage: 1, // 当前页数
      pageSize: 10, // 每页条数
      total: 0, // 总条数
      small: false,
      disabled: false,
      background: false,

      importDataBtnText: '导入数据',
      importDataBtnIcon: 'Upload',
      importDataDisabled: false,

      category: {
        categoryId: 1,
        categoryName: "test",
        createdAt: 0,
        updatedAt: 0,
      }
    };
  },
  computed: {
    Plus() {
      return Plus
    },
    Download() {
      return Download
    },
    pagedCategories() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.categoryList.slice(start, end);
    },
    totalPages() {
      console.log(`总页数为: ${Math.ceil(this.categoryList.length / this.pageSize)}`)
      return Math.ceil(this.categoryList.length / this.pageSize)*10;
    },
    totalRowsCount() {
      console.log(`总数据量数目为: ${Math.ceil(this.categoryList.length)}`)
      return Math.ceil(this.categoryList.length);
    },
  },
  mounted() {
    this.fetchCategoryList();
  },
  methods: {

    handleSizeChange(size) {
      this.pageSize = size;
    },
    handleCurrentChange(page) {
      this.currentPage = page;
    },

    fetchCategoryList() {
      requestAll.get('categories')
          .then(response => {
            this.categoryList = response.data.data;
          })
          .catch(error => {
            console.error('Error fetching categories:', error);
          });
    },
    formatDate(row, column, cellValue) {
      return moment(cellValue).format('YYYY-MM-DD HH:mm:ss'); // 格式化日期时间
    },
    addCategory() {
      // Implement add category functionality here
      console.log('Adding a new category');

      const formData = new FormData();
      formData.append('categoryName', this.categoryList.categoryName);

      axios.post('http://127.0.0.1:8001/api/categories', formData)
          .then(response => {
            console.log('Category added successfully:', response.data);
            // Handle success response
            // Optionally, update the category list with the new data
            // Manually update the category list by fetching the updated data
            this.fetchCategories();
          })
          .catch(error => {
            console.error('Error adding category:', error);
            // Handle error
          });

    },
    // enableEditing(category) {
    //   this.categoryList = this.categoryList.map(c => {
    //     if (c.categoryId === category.categoryId) {
    //       return { ...c, editing: true };
    //     }
    //     return c;
    //   });
    // },
    enableEditing(category) {
      this.categoryList = this.categoryList.map(c => {
        if (c.categoryId === category.categoryId) {
          return { ...c, editing: true };
        }
        return c;
      });
    },
    toggleEditing(category) {
      if (category.editing) {
        this.saveCategory(category);
      } else {
        this.enableEditing(category);
      }
    },
    saveCategory(category) {
      const formData = new FormData();
      formData.append('categoryId', category.categoryId);
      formData.append('categoryName', category.categoryName);
      axios.patch('http://127.0.0.1:8001/api/categories', formData)
          .then(response => {
            console.log('Category updated successfully:', response.data);
            category.editing = false; // Turn off editing mode
            // Manually update the category list by fetching the updated data
            this.fetchCategoryList();
          })
          .catch(error => {
            console.error('Error updating category:', error);
          });
    },
    editCategory(category) {
      // Implement edit functionality here
      console.log('Editing category:', category);
    },
    deleteCategory(category) {
      // Implement delete functionality here

      console.log('Deleting category with ID:', category.categoryId);

      axios.delete("http://127.0.0.1:8001/api/categories/" + category.categoryId)
          .then(response => {
            console.log('Category deleted successfully:', response.data);
            // Handle success response
            // Manually update the category list by fetching the updated data
            this.fetchCategoryList();
          })
          .catch(error => {
            console.error('Error deleting category:', error);
            // Handle error
          });

    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
};
</script>