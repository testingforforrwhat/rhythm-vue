<template>
  <div class="register-container">
    <el-card class="register-card">
      <h2 class="register-title">用户注册</h2>

      <el-form
          :model="registerForm"
          status-icon
          :rules="rules"
          ref="registerForm"
          label-width="100px"
          class="register-form"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
              v-model.trim="registerForm.username"
              prefix-icon="el-icon-user"
              placeholder="请输入用户名"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
              type="password"
              v-model="registerForm.password"
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
              show-password
          ></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
              type="password"
              v-model="registerForm.confirmPassword"
              prefix-icon="el-icon-lock"
              placeholder="请再次输入密码"
              show-password
          ></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="phone">
          <el-input
              v-model.trim="registerForm.phone"
              prefix-icon="el-icon-mobile-phone"
              placeholder="请输入手机号"
          ></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="verificationCode">
          <div class="verification-code-container">
            <el-input
                v-model.trim="registerForm.verificationCode"
                placeholder="请输入验证码"
                class="verification-input"
            ></el-input>
            <el-button
                type="primary"
                @click="sendVerificationCode"
                :disabled="cooldown > 0"
                class="send-code-btn"
            >
              {{ cooldown > 0 ? `${cooldown}秒后重试` : '发送验证码' }}
            </el-button>
          </div>
        </el-form-item>

        <el-form-item class="form-buttons">
          <el-button
              type="primary"
              @click="submitForm('registerForm')"
              :loading="loading"
          >注册</el-button>
          <el-button @click="resetForm('registerForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  name: 'RegisterForm',
  data() {
    // 用户名验证规则
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入用户名'));
      }
      if (value.length < 3 || value.length > 20) {
        return callback(new Error('用户名长度应在3-20个字符之间'));
      }
      callback();
    };

    // 密码验证规则
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入密码'));
      }
      if (value.length < 6) {
        return callback(new Error('密码长度不能少于6个字符'));
      }
      callback();
    };

    // 确认密码验证规则
    const validateConfirmPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请再次输入密码'));
      }
      if (value !== this.registerForm.password) {
        return callback(new Error('两次输入密码不一致'));
      }
      callback();
    };

    // 手机号验证规则
    const validatePhone = (rule, value, callback) => {
      const phoneRegex = /^1[3-9]\d{9}$/;
      if (!value) {
        return callback(new Error('请输入手机号'));
      }
      if (!phoneRegex.test(value)) {
        return callback(new Error('请输入有效的手机号'));
      }
      callback();
    };

    return {
      registerForm: {
        username: '',
        password: '',
        confirmPassword: '',
        phone: '',
        verificationCode: ''
      },
      loading: false,
      cooldown: 0,
      rules: {
        username: [
          {validator: validateUsername, trigger: 'blur'}
        ],
        password: [
          {validator: validatePassword, trigger: 'blur'}
        ],
        confirmPassword: [
          {validator: validateConfirmPassword, trigger: 'blur'}
        ],
        phone: [
          {validator: validatePhone, trigger: 'blur'}
        ],
        verificationCode: [
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    async sendVerificationCode() {
      if (!this.registerForm.phone) {
        this.$message.error('请先输入手机号');
        return;
      }

      try {
        await axios.get(`http://127.0.0.1:8001/sms/validate/${this.registerForm.phone}`);
        this.$message.success('验证码已发送，请查收短信');
        this.startCooldown();
      } catch (error) {
        this.$message.error('验证码发送失败，请稍后重试');
        console.error('Error sending SMS:', error);
      }
    },

    startCooldown() {
      this.cooldown = 60;
      const timer = setInterval(() => {
        this.cooldown--;
        if (this.cooldown <= 0) {
          clearInterval(timer);
        }
      }, 1000);
    },

    async submitForm(formName) {
      try {
        const valid = await this.$refs[formName].validate();
        if (!valid) return;

        this.loading = true;
        const formData = new FormData();
        formData.append('userLoginName', this.registerForm.username);
        formData.append('userLoginPass', this.registerForm.password);
        formData.append('userPhone', this.registerForm.phone);
        formData.append('userValidate', this.registerForm.verificationCode);

        await axios.post('http://127.0.0.1:8001/api/users/regist', formData);
        this.$message.success('注册成功！');
        router.push({name: "登录"});
      } catch (error) {
        this.$message.error('注册失败，请检查输入信息或稍后重试');
        console.error('Registration failed:', error);
      } finally {
        this.loading = false;
      }
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.cooldown = 0;
    }
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 20px;
}

.register-card {
  width: 100%;
  max-width: 500px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.register-title {
  text-align: center;
  margin-bottom: 30px;
  color: #303133;
  font-size: 24px;
}

.register-form {
  padding: 20px;
}

.verification-code-container {
  display: flex;
  gap: 10px;
}

.verification-input {
  flex: 1;
}

.send-code-btn {
  width: 120px;
}

.form-buttons {
  margin-top: 30px;
  text-align: center;
}

.form-buttons .el-button {
  width: 120px;
  margin: 0 10px;
}
</style>
