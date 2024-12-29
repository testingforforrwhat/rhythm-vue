<template>
  <!-- 页脚容器 -->
  <footer class="footer">
    <div class="footer-container">
      <!-- 主要内容区域 -->
      <div class="footer-content">
        <!-- 品牌信息 -->
        <div class="footer-brand">
          <h3>Rhythm</h3>
          <p>让音乐触动心灵</p>
        </div>

        <!-- 链接区域 -->
        <div class="footer-links">
          <div class="links-group">
            <h4>关于我们</h4>
            <ul>
              <li><a href="/about">公司介绍</a></li>
              <li><a href="/team">团队成员</a></li>
              <li><a href="/contact">联系方式</a></li>
            </ul>
          </div>

          <div class="links-group">
            <h4>帮助中心</h4>
            <ul>
              <li><a href="/faq">常见问题</a></li>
              <li><a href="/support">技术支持</a></li>
              <li><a href="/feedback">意见反馈</a></li>
            </ul>
          </div>

          <div class="links-group">
            <h4>法律信息</h4>
            <ul>
              <li><a href="/privacy">隐私政策</a></li>
              <li><a href="/terms">服务条款</a></li>
              <li><a href="/copyright">版权声明</a></li>
            </ul>
          </div>
        </div>

        <!-- 社交媒体图标 -->
        <div class="social-media">
          <a href="#" class="social-icon" title="微信">
            <i class="el-icon-wechat"></i>
          </a>
          <a href="#" class="social-icon" title="微博">
            <i class="el-icon-weibo"></i>
          </a>
          <a href="#" class="social-icon" title="QQ">
            <i class="el-icon-qq"></i>
          </a>
        </div>
      </div>

      <!-- 版权信息 -->
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Rhythm. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterView",

  // 计算属性
  computed: {
    /**
     * 获取当前年份
     * @returns {number} 当前年份
     */
    currentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style scoped>
/* 页脚基础样式 */
.footer {
  background-color: #2c3e50;
  color: #ffffff;
  padding: 40px 0 20px;
  width: 100%;
  position: relative;
  bottom: 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

/* 容器样式 */
.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 主要内容区域样式 */
.footer-content {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 40px;
  margin-bottom: 30px;
}

/* 品牌区域样式 */
.footer-brand h3 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #ffd04b;
}

.footer-brand p {
  font-size: 14px;
  color: #a8b2b9;
}

/* 链接区域样式 */
.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.links-group h4 {
  color: #ffd04b;
  margin-bottom: 15px;
  font-size: 16px;
}

.links-group ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.links-group ul li {
  margin-bottom: 8px;
}

.links-group ul li a {
  color: #a8b2b9;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 14px;
}

.links-group ul li a:hover {
  color: #ffffff;
}

/* 社交媒体图标样式 */
.social-media {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  align-items: flex-start;
}

.social-icon {
  color: #a8b2b9;
  font-size: 24px;
  transition: color 0.3s ease;
}

.social-icon:hover {
  color: #ffd04b;
}

/* 版权信息样式 */
.footer-bottom {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #a8b2b9;
  font-size: 14px;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .footer-links {
    grid-template-columns: 1fr;
  }

  .social-media {
    justify-content: center;
    margin-top: 20px;
  }

  .links-group {
    margin-bottom: 20px;
  }
}
</style>
