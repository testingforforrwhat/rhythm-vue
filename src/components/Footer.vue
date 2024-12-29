<template>
  <!-- 页脚容器 -->
  <footer class="footer">
    <div class="container">
      <!-- 页脚内容 -->
      <p>&copy; 2024 Rhythm. All rights reserved.</p>
      <p class="footer-links">
        <a href="https://example.com/privacy" target="_blank">隐私政策</a> |
        <a href="https://example.com/terms" target="_blank">服务条款</a> |
        <a href="https://example.com/contact" target="_blank">联系我们</a>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterView", // 组件名称
};
</script>

<style scoped>
/* 页脚整体样式 */
.footer {
  background-color: #545c64; /* 深灰色背景 */
  color: #fff; /* 白色文字 */
  padding: 15px 0; /* 上下内边距 */
  text-align: center; /* 居中对齐 */
  width: 100%; /* 占满宽度 */
  position: fixed; /* 固定在页面底部 */
  bottom: 0; /* 距离底部0 */
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); /* 添加顶部阴影 */
}

/* 容器样式 */
.container {
  max-width: 1200px; /* 最大宽度 */
  margin: 0 auto; /* 居中 */
}

/* 页脚链接样式 */
.footer-links {
  margin-top: 10px; /* 与上方文字的间距 */
  font-size: 14px; /* 字体大小 */
}

.footer-links a {
  color: #ffd04b; /* 链接颜色 */
  text-decoration: none; /* 去掉下划线 */
  margin: 0 5px; /* 链接之间的间距 */
}

.footer-links a:hover {
  text-decoration: underline; /* 鼠标悬停时显示下划线 */
}
</style>
