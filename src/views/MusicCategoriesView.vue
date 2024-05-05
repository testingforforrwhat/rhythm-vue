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



        <el-table :data="pagedCategories" style="width: 100%"  >
          <el-table-column prop="categoryName" label="cateGoryName" width="150" v-model="pagedCategories.categoryName" />
          <el-table-column prop="createdAt" label="createdAt" width="120" v-model="pagedCategories.createdAt"/>
          <el-table-column prop="updatedAt" label="updatedAt" width="120" v-model="pagedCategories.updatedAt"/>
        </el-table>

    <div class="demo-pagination-block">
      <div class="demonstration">All combined</div>
      <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          v-model:total="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="100"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
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

export default {
  data() {
    return {
      categories: [],
      currentPage: 1,
      pageSize: 10,
      small: false,
      disabled: false,
      background: false,
    };
  },
  computed: {
    pagedCategories() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.categories.slice(start, end);
    },
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {

    handleSizeChange(size) {
      this.pageSize = size;
    },
    handleCurrentChange(page) {
      this.currentPage = page;
    },

    fetchCategories() {
      axios.get('http://127.0.0.1:8080/api/api/categories')
          .then(response => {
            this.categories = response.data.data;
          })
          .catch(error => {
            console.error('Error fetching categories:', error);
          });
    },
    addCategory() {
      // Implement add category functionality here
      console.log('Adding a new category');

      const formData = new FormData();
      formData.append('categoryName', this.newCategory.categoryName);

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
    enableEditing(category) {
      this.categories = this.categories.map(c => {
        if (c.categoryId === category.categoryId) {
          return { ...c, editing: true };
        }
        return c;
      });
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
            this.fetchCategories();
          })
          .catch(error => {
            console.error('Error updating category:', error);
          });
    },
    editCategory(category) {
      // Implement edit functionality here
      console.log('Editing category:', category);
    },
    deleteCategory(categoryId) {
      // Implement delete functionality here

      console.log('Deleting category with ID:', categoryId);

      axios.delete(`http://127.0.0.1:8001/api/categories/${categoryId}`)
          .then(response => {
            console.log('Category deleted successfully:', response.data);
            // Handle success response
            // Manually update the category list by fetching the updated data
            this.fetchCategories();
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