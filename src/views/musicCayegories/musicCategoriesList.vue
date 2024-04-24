<template>
  <div>
    <h1>Music Categories</h1>
    <ul>
      <li v-for="category in categories" :key="category.categoryId">
        {{ category.categoryName }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      categories: []
    };
  },
  mounted() {
    this.fetchMusicCategories();
  },
  methods: {
    fetchMusicCategories() {
      axios.get('http://127.0.0.1:8001/api/categories')
          .then(response => {
            this.categories = response.data.data;
          })
          .catch(error => {
            console.error('Failed to fetch music categories', error);
          });
    }
  }
}
</script>
