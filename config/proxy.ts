import { ServerOptions } from "vite";

export default (env: ImportMetaEnv): ServerOptions["proxy"] => ({
  "/login": {
    target: env.VITE_BASE_URL,
    changeOrigin: true
  }
});
