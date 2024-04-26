<template>
  <div>
    <h1>Login/Register</h1>

    <div v-if="!isRegistered">
      <h2>Register</h2>
      <input type="text" v-model="registerUsername" placeholder="Username">
      <input type="password" v-model="registerPassword" placeholder="Password">
      <button @click="register">Register</button>
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
    register() {
      // Perform registration logic here
      // After successful registration, set isRegistered to true
      this.isRegistered = true;
    },
    login() {
      // Perform login logic here
      // After successful login, set isLoggedIn to true and store logged in user
      this.isLoggedIn = true;
      this.loggedInUser = this.loginUsername;
    },
    logout() {
      // Perform logout logic here
      this.isLoggedIn = false;
      this.loggedInUser = '';
    },
  },
};
</script>