<template>
  <div>
    <h1>Music List</h1>
    <ul>
      <li v-for="music in paginatedMusic" :key="music.musicId">
        <!--        {{ music.title }}-->
        <!--        <button @click="editMusic(music)">Edit</button>-->
        <!--        <button @click="deleteMusic(music.music_id)">Delete</button>-->
        <span v-if="!music.editing">
          {{ music.title }},
          {{ music.artist }},
          {{ music.album }},
          {{ music.categoryId }},
          {{ music.musiFile }},
          {{ music.createdAt }},
          {{ music.updatedAt }}</span>
        <input v-else v-model="music.title" @keyup.enter="saveMusic(music)" />
        <button v-if="!music.title.editing" @click="enableEditing(music)">Edit</button>
        <button v-if="music.editing" @click="saveMusic(music)">Save</button>
        <button @click="deleteMusic(music.musicId)">Delete</button>
      </li>
    </ul>

    <form @submit.prevent="addMusic">
      <label for="title">Music Name:</label>
      <input type="text" id="title" v-model="newMusic.title">

      <button type="submit">Add Music</button>
    </form>

    <div>
      <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>

  <div>
    <button @click="playAudio">Play Audio</button>
    <audio ref="audio" @play="incrementPlayCount"></audio>
  </div>

</template>

<script>
import axios from 'axios';
import {requestAll} from "@/utils/request";

export default {
  data() {
    return {
      music: [],
      newMusic: {
        title: ''
      },
      currentPage: 1,
      itemsPerPage: 5, // Number of items per page
    };
  },
  computed: {
    paginatedMusic() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.music.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.music.length / this.itemsPerPage);
    },
  },
  mounted() {
    this.fetchMusic();
  },
  methods: {
    playAudio() {
      const audio = this.$refs.audio;
      audio.src = this.audioUrl;
      audio.play();
    },
    incrementPlayCount() {
      axios.post('http://localhost:8080/api/increment-play-count', {
        songId: 1 // 假设歌曲ID为1
      });
    },
    fetchMusic() {
      requestAll.get('music')
          .then(response => {
            this.music = response.data.data;
          })
          .catch(error => {
            console.error('Error fetching music:', error);
          });
    },
    addMusic() {
      // Implement add music functionality here
      console.log('Adding a new music');

      const formData = new FormData();
      formData.append('title', this.newMusic.title);

      axios.post('http://127.0.0.1:8001/api/music', formData)
          .then(response => {
            console.log('Music added successfully:', response.data);
            // Handle success response
            // Optionally, update the music list with the new data
            // Manually update the music list by fetching the updated data
            this.fetchMusic();
          })
          .catch(error => {
            console.error('Error adding music:', error);
            // Handle error
          });

    },
    enableEditing(music) {
      this.music = this.music.map(c => {
        if (c.musicId === music.musicId) {
          return { ...c, editing: true };
        }
        return c;
      });
    },
    saveMusic(music) {
      const formData = new FormData();
      formData.append('music_id', music.music_id);
      formData.append('title', music.title);
      axios.patch('http://127.0.0.1:8001/api/music', formData)
          .then(response => {
            console.log('Music updated successfully:', response.data);
            music.editing = false; // Turn off editing mode
            // Manually update the music list by fetching the updated data
            this.fetchMusic();
          })
          .catch(error => {
            console.error('Error updating music:', error);
          });
    },
    editMusic(music) {
      // Implement edit functionality here
      console.log('Editing music:', music);
    },
    deleteMusic(music_id) {
      // Implement delete functionality here

      console.log('Deleting music with ID:', music_id);

      axios.delete(`http://127.0.0.1:8001/api/music/${music_id}`)
          .then(response => {
            console.log('Music deleted successfully:', response.data);
            // Handle success response
            // Manually update the music list by fetching the updated data
            this.fetchMusic();
          })
          .catch(error => {
            console.error('Error deleting music:', error);
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