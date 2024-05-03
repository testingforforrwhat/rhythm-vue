<template>
  <div>
    <h1>Login</h1>

<!--    <div v-if="!isRegistered">-->
<!--      <h2>Register</h2>-->
<!--      <input type="text" v-model="registerUsername" placeholder="Username">-->
<!--      <input type="password" v-model="registerPassword" placeholder="Password/ReceivedmessageCode">-->
<!--      <button @click="register">Register</button>-->
<!--      <button @click="getSms">getSms</button>-->
<!--    </div>-->

    <div v-if="!isLoggedIn">
      <input type="text" v-model="loginUsername" placeholder="Username">
      <input type="password" v-model="loginPassword" placeholder="Password">
      <button @click="login">Login</button>
    </div>

    <div v-if="isLoggedIn">
      <p>Welcome, {{ loggedInUser }}</p>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>

// import axios from "axios";
import { requestAll} from "@/utils/request";
// import store from "@/store";
// import router from "@/router";

export default {
  name: "LoginView",
  data() {
    return {
      // registerUsername: '',
      // registerPassword: '',
      loginUsername: '',
      loginPassword: '',
      // isRegistered: false,
      isLoggedIn: false,
      loggedInUser: '',
    };
  },
  methods: {
    // getSms() {
    //
    //   axios.get(`http://127.0.0.1:8001/sms/validate/${this.registerUsername}`)
    //       .then(() => {
    //         console.log('sending sms...');
    //       })
    //       .catch(error => {
    //         console.error('Error send sms', error);
    //       });
    //
    // },
    // register() {
    //   // Perform registration logic here
    //   // After successful registration, set isRegistered to true
    //
    //   const formData = new FormData();
    //   formData.append('userLoginName', this.registerUsername);
    //   formData.append('userValidate', this.registerPassword);
    //
    //   axios.post('http://127.0.0.1:8001/api/users/regist', formData)
    //       .then(response => {
    //         console.log('Registration successful:', response.data);
    //         // After successful registration, set isRegistered to true
    //         this.isRegistered = true;
    //       })
    //       .catch(error => {
    //         console.error('Registration failed:', error);
    //         // Handle registration error
    //         alert('Registration failed,')
    //         this.isRegistered = false;
    //       });
    // },
    login() {
      // Perform login logic here
      // After successful login, set isLoggedIn to true and store logged in user

      const formData = new FormData();
      formData.append('userLoginName', this.loginUsername);
      formData.append('userLoginPass', this.loginPassword);

      requestAll.post('users/login', formData)
          .then(response => {
            console.log('Login successful:', response.data);
            // After successful login, set isLoggedIn to true and store logged in user
            this.isLoggedIn = true;
            this.loggedInUser = this.loginUsername;

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