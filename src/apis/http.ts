import axios from "axios";
import { ElMessage } from "element-plus";
import router from "@/router/index";

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
      router.push({ path: "/login" }).then();
    }
    return Promise.reject(res.data);
  }

  return res.data.data;
});

const http = axios.create({
  baseURL: "/",
});

function get({ data = {}, url = "", headers = {} }) {
  return http({ url, headers, params: data });
}

function post({ data = {}, url = "", headers = {} }) {
  return http({ method: "POST", url, headers, data });
}

export default {
  get,
  http,
};
