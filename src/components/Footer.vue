<script>
export default {
  name: "FooterView"
}
</script>

<template>
  <footer class="footer">
    <div class="container">
      <p>&copy; 2024 Rhythm. </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #545c64;
  color: #fff;
  padding: 15px 0;
  text-align: center;
  width: 100%;
  position: fixed;
  bottom: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
