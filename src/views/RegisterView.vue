<template>
  <div>
    <h1>注册页面</h1>
    <!--    el-form 的 v-model="" ref="" 在vue3中值不能相同, 否则输入框一次只能输入一个字符-->
    <el-form ref="registerFormData" :model="registerForm" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="registerForm.username"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="registerForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="短信验证码" prop="verificationCode">
        <el-input v-model="registerForm.verificationCode"></el-input>
        <el-button @click="sendVerificationCode" v-if="!verificationCodeSent">发送验证码</el-button>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="registerForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';
import axios from "axios";

export default {
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton
  },
  setup() {
    const registerForm = ref({
      username: '',
      phone: '',
      verificationCode: '',
      password: ''
    });

    const rules = {
      username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
      verificationCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
    };

    const verificationCodeSent = ref(false);

    const sendVerificationCode = () => {
      // 发送短信验证码的逻辑
      // 这里只是简单示例，实际应用中需要调用真实的短信服务

      axios.get(`http://127.0.0.1:8001/sms/validate/${registerForm.value.phone}`)
          .then(() => {
            console.log('sending sms...');
            alert('验证码已发送，请查收短信');
            verificationCodeSent.value = true;
          })
          .catch(error => {
            console.error('Error send sms', error);
          });


    };

    const handleSubmit = () => {
      const formRef = ref('registerForm');
      formRef.value.validate((valid) => {
        if (valid) {
          // 表单验证通过，可以发送注册请求
          alert('用户注册成功！');
        } else {
          return false;
        }
      });
    };

    return {
      registerForm,
      rules,
      verificationCodeSent,
      sendVerificationCode,
      handleSubmit
    };
  }
}
</script>