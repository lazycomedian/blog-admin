import { ServerOptions } from "vite";

export default (env: ImportMetaEnv): ServerOptions["proxy"] => ({
  "/api": {
    target: env.VITE_BASE_URL,
    changeOrigin: true
  }
});
