<template>
  <div>

  <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="100px" class="register-form">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="registerForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="registerForm.password"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input type="password" v-model="registerForm.confirmPassword"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input                 v-model="registerForm.phone"></el-input>
    </el-form-item>
    <el-form-item label="短信验证码" prop="verificationCode">
      <el-input                 v-model="registerForm.verificationCode"></el-input>
      <el-button @click="sendVerificationCode" v-if="!verificationCodeSent">发送验证码</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
      <el-button @click="resetForm('registerForm')">重置</el-button>
    </el-form-item>
  </el-form>

  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";


// 导出一个vue实例 object
export default {
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
    var validateConfirmPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        username: '',
        password: '',
        confirmPassword: '',
        phone: '',
        verificationCode: ''
      },
      verificationCodeSent: false,
      rules: {
        username: [
          {validator: validateUsername, trigger: 'blur'}
        ],
        password: [
          {validator: validatePassword, trigger: 'blur'}
        ],
        confirmPassword: [
          {validator: validateConfirmPassword, trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    sendVerificationCode() {
      axios.get(`http://127.0.0.1:8001/sms/validate/${this.registerForm.phone}`)
          .then(() => {
            console.log('sending sms...');
            alert('验证码已发送，请查收短信');
          })
          .catch(error => {
            console.error('Error send sms', error);
          });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          // Perform registration logic here
          // After successful registration, set isRegistered to true

          const formData = new FormData();
          formData.append('userLoginName', this.registerForm.username);
          formData.append('userLoginPass', this.registerForm.password);
          formData.append('userPhone', this.registerForm.phone);
          formData.append('userValidate', this.registerForm.verificationCode);

          axios.post('http://127.0.0.1:8001/api/users/regist', formData)
              .then(response => {
                console.log('Registration successful:', response.data);
                // After successful registration, set isRegistered to true
                router.push( { name : "登录" } )
              })
              .catch(error => {
                console.error('Registration failed:', error);
                // Handle registration error
                alert('Registration failed,')
                this.isRegistered = false;
              });

          alert('注册成功!');
        } else {
          console.log('注册失败');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
