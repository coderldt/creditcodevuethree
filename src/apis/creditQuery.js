import http from "./http";

export function getCreditDetail(params) {
  return http.get({ url: "/data/creditQuery.json", data: params });
}
