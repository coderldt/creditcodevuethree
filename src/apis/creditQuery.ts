import http from "./http";

export function getCreditDetail(params: object) {
  return http.get({ url: "/data/creditQuery.json", data: params });
}
