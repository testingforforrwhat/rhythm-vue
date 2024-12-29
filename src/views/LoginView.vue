<template>
  <div class="login-container">
    <!-- 登录表单 -->
    <div v-if="!isLoggedIn">
      <el-form
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
          label-width="100px"
          class="login-form"
      >
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="用户名" prop="username">
              <el-input
                  v-model="loginForm.username"
                  placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="密码" prop="password">
              <el-input
                  type="password"
                  v-model="loginForm.password"
                  placeholder="请输入密码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item>
              <el-space>
                <el-button
                    type="primary"
                    @click="submitForm('loginForm')"
                >
                  登录
                </el-button>
                <el-button @click="resetForm('loginForm')">重置</el-button>
              </el-space>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- 登录成功后的欢迎界面 -->
    <div v-if="isLoggedIn" class="welcome-container">
      <p>欢迎, {{ loggedInUser }}</p>
      <el-button type="danger" @click="logout">退出登录</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginView",
  data() {
    return {
      // 登录表单数据
      loginForm: {
        username: "",
        password: "",
      },
      // 登录状态
      isLoggedIn: false,
      // 当前登录用户
      loggedInUser: "",
      // 表单校验规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    /**
     * 提交登录表单
     * @param {String} formName 表单名称
     */
    async submitForm(formName) {
      // 表单校验
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            // 调用登录接口
            const response = await axios.post("api/springSecurity/login", {
              adminName: this.loginForm.username,
              adminPass: this.loginForm.password,
            });

            // 登录成功逻辑
            console.log("登录成功:", response.data);
            this.isLoggedIn = true;
            this.loggedInUser = this.loginForm.username;

            // 存储登录状态和用户信息到本地存储
            localStorage.setItem("token", response.data.data);
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("loggedInUser", this.loggedInUser);

            // 提示用户登录成功
            this.$message.success("登录成功！");
          } catch (error) {
            // 登录失败逻辑
            console.error("登录失败:", error);
            this.$message.error("用户名或密码错误，请重新输入！");
          }
        } else {
          this.$message.error("请检查表单填写是否正确！");
        }
      });
    },

    /**
     * 重置表单
     * @param {String} formName 表单名称
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    /**
     * 退出登录
     */
    logout() {
      // 清除登录状态和本地存储
      this.isLoggedIn = false;
      this.loggedInUser = "";
      localStorage.clear();
      this.$message.success("已退出登录！");
    },
  },
  mounted() {
    // 页面加载时检查本地存储中的登录状态
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      this.isLoggedIn = true;
      this.loggedInUser = localStorage.getItem("loggedInUser");
    }
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
.login-form {
  margin-top: 20px;
}
.welcome-container {
  text-align: center;
  margin-top: 50px;
}
</style>
