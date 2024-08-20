<template>

  <div v-if="!isLoggedIn">
  <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="login-form">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="loginForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="loginForm.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
      <el-button @click="resetForm('loginForm')">重置</el-button>
    </el-form-item>
  </el-form>
  </div>

  <div v-if="isLoggedIn">
    <p>Welcome, {{ loggedInUser }}</p>
    <el-button @click="logout">Logout</el-button>
  </div>

</template>

<script>
import {request} from "@/utils/request";


// 导出一个vue实例 object
export default {
  name: 'LoginView',
  data() {
    var validateUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入用户名'));
      }
      callback();
    };
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: '',
        password: ''
      },
      isLoggedIn: false,
      loggedInUser: '',
      rules: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          // Perform login logic here
          // After successful login, set isLoggedIn to true and store logged in user

          const formData = new FormData();
          formData.append('userLoginName', this.loginForm.username);
          formData.append('userLoginPass', this.loginForm.password);

          request.post('springSecurity/login', formData)
              .then(response => {
                console.log('Login successful:', response.data);
                // After successful login, set isLoggedIn to true and store logged in user
                this.isLoggedIn = true;
                this.loggedInUser = this.loginForm.username;

                alert("Login successful")
                // 将登陆成功后 服务器签发的token令牌 存入到本地缓存 LocalStorage(f12-application-storage-localstorage/sessionstorage)
                // 如果不存储token,因为router index.js的设置, 登录也无法访问相关页面 index.js if( localStorage.getItem("token") == null )
                // LocalStorage本次会话存储,关闭浏览器(不是标签页)=会话关闭,localstorage存储数据empty,如果关闭浏览器重新打开,sessionStorage
                localStorage.setItem("token", response.data.data);
                // 路由重定向到home首页
                // router.push( { name : "首页" } )
                // 登录成功后保存登录状态到本地存储
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('loggedInUser', this.loggedInUser);
                // 在 Vuex 状态管理中保存登录状态
                // store.commit('isLoggedIn', true);
              })
              .catch(error => {
                console.error('Login failed:', error);
                alert("手机号或密码错误，请重新填写")
                // Handle login error
              });

          alert('登录成功!');
        } else {
          console.log('登录失败');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    logout() {
      // Perform logout logic here
      this.isLoggedIn = false;
      this.loggedInUser = '';
      localStorage.clear()
    },
  },
  mounted() {
    // 页面加载时检查本地存储中的登录状态
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      // 显示“已登录”状态
      console.log('已登录');
      this.isLoggedIn = true;
      this.loggedInUser = localStorage.getItem('loggedInUser');
    } else {
      // 显示登录界面
      console.log('显示登录界面');
    }
  }
};
</script>
