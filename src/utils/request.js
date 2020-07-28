import axios from 'axios';
// import router from '../router/index';
// import store from "../store";
// import {stringify} from "qs";
// import {baseURL} from "../config";

axios.defaults.withCredentials = true;

// 创建axios实例
const request = axios.create({
  // baseURL,
  baseURL: location.hostname === 'localhost' ? '/r' : 'http://localhost:8088',
  timeout: 4000 // 请求超时时间
});

// request拦截器
request.interceptors.request.use(config => {
  console.log(config);
  // config.data = config.data || {};
  config.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
  // config.headers.Referer = 'http://123624.12301.local/wx/login.html?plat=c';
  // config.data = stringify(config.data || {});
  return config
}, error => {
  console.log(error); // for debug
  return Promise.reject(error)
});

// respone拦截器
request.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错
     */
    const { data, data: { code } } = response;
    if (!code) {
      return Promise.reject(response.data || response)
    }
    if (code !== 200) {
      // 登录失败
      /* if (code === 202) {
           store.dispatch('logoutAction').finally(() => (router.currentRoute.name === 'Login') || router.replace({
               name: "Login",
               query: {oldPath: router.currentRoute.fullPath}
           }));
       } */
      return Promise.reject(data);
    }
    return Promise.resolve(data)
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default request;
export { request }
