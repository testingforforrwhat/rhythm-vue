<template>
  <div>
    <h1>Category List</h1>
    <ul>
      <li v-for="category in paginatedCategories" :key="category.categoryId">
        {{ category.categoryName }}
        <button @click="editCategory(category)">Edit</button>
        <button @click="deleteCategory(category.categoryId)">Delete</button>
      </li>
    </ul>
    <button @click="addCategory">Add Category</button>
    <div>
      <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      categories: [],
      currentPage: 1,
      itemsPerPage: 5, // Number of items per page
    };
  },
  computed: {
    paginatedCategories() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.categories.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.categories.length / this.itemsPerPage);
    },
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      axios.get('http://127.0.0.1:8001/api/categories')
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
    },
    editCategory(category) {
      // Implement edit functionality here
      console.log('Editing category:', category);
    },
    deleteCategory(categoryId) {
      // Implement delete functionality here
      console.log('Deleting category with ID:', categoryId);
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