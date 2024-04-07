<template>
  <div>
    <h1>Music Categories</h1>
    <ul>
      <li v-for="category in musicCategories" :key="category.id">
        {{ category.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      musicCategories: []
    };
  },
  mounted() {
    this.fetchMusicCategories();
  },
  methods: {
    fetchMusicCategories() {
      axios.get('http://127.0.0.1:8001/api/categories')
          .then(response => {
            this.musicCategories = response.data.data.musicCategoriesList;
          })
          .catch(error => {
            console.error('Failed to fetch music categories', error);
          });
    }
  }
}
</script>
