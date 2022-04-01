import http from "../http";

interface Params {
  pageNum: number;
}

export function getList(params: Params) {
  return http.post({ url: "/getList", data: params });
}
