

/*在这个文件中我们对请求和响应进行封装*/


import axios from "axios";

/**
 * qs 模块是一个用于序列化和反序列化 URL 查询字符串的库。
 * 通常与 Axios 等 HTTP 请求库一起使用，用于处理 URL 查询参数的编码和解码
 */
// import qs from 'qs';

// import router from "@/router/index.js";


// 创建axios异步请求对象 进行初始化 配置
const requestAll = axios.create(
    {
        baseURL: "/api/",
        // 发送 post/put/patch/delete 请求之前 对 data 参数进行统一处理
        // transformRequest(data){
        //     return qs.stringify(data)
        // }
    }
)

// 配置 axios 请求 拦截器
requestAll.interceptors.request.use( config => {
    // 将当前登录的用户的token令牌 设置到 request header
    config.headers.Authorization = localStorage.getItem("token")
    return config
})


// 导出
export {requestAll}