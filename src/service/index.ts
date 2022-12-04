import { BizRequest } from "./lib/request";

export const bizRequest = new BizRequest({
  timeout: 15000,
  withCredentials: true,
  baseURL: "/api"
});
