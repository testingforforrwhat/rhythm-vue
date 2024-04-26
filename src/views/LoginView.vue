<template>
  <div>
    <h1>Login/Register</h1>

    <div v-if="!isRegistered">
      <h2>Register</h2>
      <input type="text" v-model="registerUsername" placeholder="Username">
      <input type="password" v-model="registerPassword" placeholder="Password/ReceivedmessageCode">
      <button @click="register">Register</button>
      <button @click="getSms">getSms</button>
    </div>

    <div v-if="isRegistered || isLoggedIn">
      <h2>Login</h2>
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

import axios from "axios";

export default {
  name: "LoginView",
  data() {
    return {
      registerUsername: '',
      registerPassword: '',
      loginUsername: '',
      loginPassword: '',
      isRegistered: false,
      isLoggedIn: false,
      loggedInUser: '',
    };
  },
  methods: {
    getSms() {

      axios.get(`http://127.0.0.1:8001/sms/validate/${this.registerUsername}`)
          .then(() => {
            console.log('sending sms...');
          })
          .catch(error => {
            console.error('Error send sms', error);
          });

    },
    register() {
      // Perform registration logic here
      // After successful registration, set isRegistered to true
      axios.post('http://127.0.0.1:8001/api/users/regist', {
        userLoginName: this.registerUsername,
        userValidate: this.registerPassword
      })
          .then(response => {
            console.log('Registration successful:', response.data);
            // After successful registration, set isRegistered to true
            this.isRegistered = true;
          })
          .catch(error => {
            console.error('Registration failed:', error);
            // Handle registration error
            alert('Registration failed,')
            this.isRegistered = false;
          });
    },
    login() {
      // Perform login logic here
      // After successful login, set isLoggedIn to true and store logged in user
      axios.post('http://127.0.0.1:8001/api/users/login', {
        username: this.loginUsername,
        password: this.loginPassword
      })
          .then(response => {
            console.log('Login successful:', response.data);
            // After successful login, set isLoggedIn to true and store logged in user
            this.isLoggedIn = true;
            this.loggedInUser = this.loginUsername;
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
    },
  },
};
</script>