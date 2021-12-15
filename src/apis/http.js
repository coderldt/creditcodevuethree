import axios from "axios";
import { ElMessage } from "element-plus";
import router from "@/router/index";

axios.defaults.baseURL = "/";
axios.defaults.headers["Content-Type"] = "application/json;charset=UTF-8;";
axios.defaults.headers["Accept"] = "application/json; charset=utf-8";
// axios.defaults["responseType"] = "application/json;charset=UTF-8;";

// 请求拦截器，内部根据返回值，重新组装，统一管理。
axios.interceptors.response.use((res) => {
  console.log(res, typeof res.data !== "object");
  if (typeof res.data !== "object") {
    ElMessage.error("服务端异常！");
    return Promise.reject(res);
  }
  if (res.data.code != 200) {
    if (res.data.message) ElMessage.error(res.data.msg);
    if (res.data.code == 419) {
      router.push({ path: "/login" });
    }
    return Promise.reject(res.data);
  }

  return res.data.data;
});

const http = {
  get: function ({ data = {}, url, headers = {} }) {
    let query = "";
    Object.entries(data).forEach(([key, value]) => {
      query += `${key}=${value}&`;
    });

    if (query) {
      query = query.slice(0, -1);
    }

    return this.http({ url: `${url}?${query}`, headers });
  },
  post: function ({ data = {}, url, headers = {} }) {
    return this.http({ methods: "POST", url, headers, data });
  },
  http: ({ methods = "GET", url, data, headers, params }) => {
    return new Promise((resolve, reject) => {
      // axios.defaults.headers['token'] = localGet('token') || ''
      return axios
        .request({
          methods,
          url,
          data,
          headers,
          params,
        })
        .then(
          (res) => {
            resolve(res);
          },
          (error) => {
            console.log(error);
            reject(error);
          }
        );
    });
  },
};

export default http;
