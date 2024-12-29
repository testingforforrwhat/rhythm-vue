<template>
  <!-- 页脚容器 -->
  <footer class="footer">
    <div class="footer-container">
      <!-- 主要内容区域 -->
      <div class="footer-content">
        <!-- 品牌信息 -->
        <div class="footer-brand">
          <h3 class="brand-title">Rhythm</h3>
          <p class="brand-slogan">让音乐触动心灵</p>
          <p class="brand-description">
            我们致力于为用户提供最优质的音乐体验，
            让每个人都能找到属于自己的音乐世界。
          </p>
        </div>

        <!-- 链接区域 -->
        <div class="footer-links">
          <div class="links-group" v-for="(group, index) in linkGroups" :key="index">
            <h4>{{ group.title }}</h4>
            <ul>
              <li v-for="(link, linkIndex) in group.links" :key="linkIndex">
                <a :href="link.url" @mouseover="handleLinkHover">
                  {{ link.text }}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- 社交媒体和订阅 -->
        <div class="footer-social">
          <h4>关注我们</h4>
          <!-- 社交媒体图标 -->
          <div class="social-icons">
            <a v-for="(social, index) in socialMedia"
               :key="index"
               :href="social.url"
               :title="social.name"
               class="social-icon"
               target="_blank"
               rel="noopener noreferrer">
              <i :class="social.icon"></i>
            </a>
          </div>
          <!-- 订阅区域 -->
          <div class="newsletter">
            <h4>订阅最新资讯</h4>
            <div class="newsletter-form">
              <input
                  type="email"
                  v-model="email"
                  placeholder="请输入您的邮箱"
                  @keyup.enter="handleSubscribe"
              >
              <button @click="handleSubscribe">订阅</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 版权信息 -->
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Rhythm. All rights reserved.</p>
        <p class="icp">京ICP备xxxxxxxx号</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterView",

  data() {
    return {
      email: '', // 订阅邮箱
      // 链接组数据
      linkGroups: [
        {
          title: '关于我们',
          links: [
            { text: '公司介绍', url: '/about' },
            { text: '团队成员', url: '/team' },
            { text: '联系方式', url: '/contact' }
          ]
        },
        {
          title: '帮助中心',
          links: [
            { text: '常见问题', url: '/faq' },
            { text: '技术支持', url: '/support' },
            { text: '意见反馈', url: '/feedback' }
          ]
        },
        {
          title: '法律信息',
          links: [
            { text: '隐私政策', url: '/privacy' },
            { text: '服务条款', url: '/terms' },
            { text: '版权声明', url: '/copyright' }
          ]
        }
      ],
      // 社交媒体数据
      socialMedia: [
        { name: '微信', icon: 'el-icon-wechat', url: '#' },
        { name: '微博', icon: 'el-icon-weibo', url: '#' },
        { name: 'QQ', icon: 'el-icon-qq', url: '#' }
      ]
    }
  },

  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  },

  methods: {
    /**
     * 处理链接悬停效果
     * @param {Event} event - 鼠标事件对象
     */
    handleLinkHover(event) {
      console.log(event)
      // 可以添加自定义悬停效果
    },

    /**
     * 处理订阅操作
     */
    handleSubscribe() {
      if (!this.email) {
        this.$message.warning('请输入邮箱地址')
        return
      }
      // 这里添加订阅逻辑
      this.$message.success('订阅成功！')
      this.email = ''
    }
  }
}
</script>

<style scoped>
/* 页脚基础样式 */
.footer {
  background-color: #2c3e50;
  color: #ffffff;
  padding: 60px 0 30px;
  width: 100%;
  position: relative;
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
  grid-template-columns: 1.2fr 2fr 1.2fr;
  gap: 40px;
  margin-bottom: 40px;
}

/* 品牌区域样式 */
.brand-title {
  font-size: 28px;
  margin-bottom: 10px;
  color: #ffd04b;
  font-weight: 600;
}

.brand-slogan {
  font-size: 16px;
  color: #ffffff;
  margin-bottom: 15px;
}

.brand-description {
  font-size: 14px;
  color: #a8b2b9;
  line-height: 1.6;
}

/* 链接区域样式 */
.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.links-group h4 {
  color: #ffd04b;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 600;
}

.links-group ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.links-group ul li {
  margin-bottom: 12px;
}

.links-group ul li a {
  color: #a8b2b9;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 14px;
  position: relative;
}

.links-group ul li a:hover {
  color: #ffffff;
  padding-left: 5px;
}

/* 社交媒体区域样式 */
.footer-social {
  text-align: right;
}

.social-icons {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-bottom: 30px;
}

.social-icon {
  color: #a8b2b9;
  font-size: 24px;
  transition: all 0.3s ease;
}

.social-icon:hover {
  color: #ffd04b;
  transform: translateY(-3px);
}

/* 订阅区域样式 */
.newsletter {
  margin-top: 20px;
}

.newsletter h4 {
  color: #ffd04b;
  margin-bottom: 15px;
  font-size: 16px;
}

.newsletter-form {
  display: flex;
  gap: 10px;
}

.newsletter-form input {
  padding: 8px 12px;
  border: 1px solid #a8b2b9;
  border-radius: 4px;
  background: transparent;
  color: #ffffff;
  width: 200px;
}

.newsletter-form button {
  padding: 8px 20px;
  background-color: #ffd04b;
  border: none;
  border-radius: 4px;
  color: #2c3e50;
  cursor: pointer;
  transition: all 0.3s ease;
}

.newsletter-form button:hover {
  background-color: #ffdb6f;
}

/* 版权信息样式 */
.footer-bottom {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-bottom p {
  color: #a8b2b9;
  font-size: 14px;
  margin: 5px 0;
}

/* 响应式布局 */
@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
  }

  .footer-social {
    grid-column: span 2;
    text-align: center;
  }

  .social-icons {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .footer-links {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .social-icons {
    justify-content: center;
  }

  .newsletter-form {
    flex-direction: column;
    align-items: center;
  }

  .newsletter-form input {
    width: 100%;
    max-width: 300px;
  }
}
</style>
