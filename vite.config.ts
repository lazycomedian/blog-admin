import react from "@vitejs/plugin-react";
import { join, resolve } from "path";
import { defineConfig, loadEnv } from "vite";
import viteCompression from "vite-plugin-compression";
import { createHtmlPlugin } from "vite-plugin-html";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import getProxy from "./config/proxy";
import { version } from "./package.json";

const envDir = join(__dirname, "env");

export default defineConfig(({ mode, command }) => {
  const env = <ImportMetaEnv>loadEnv(mode, envDir);

  return {
    plugins: [
      react(),
      createHtmlPlugin({
        inject: {
          data: { title: env.VITE_APP_TITLE }
        }
      }),
      // eslintPlugin(), // EsLint 报错信息显示在浏览器界面上
      // 使用 svg 图标
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), "src/assets/svgs")],
        symbolId: "icon-[dir]-[name]"
      }),
      viteCompression({
        // gzip静态资源压缩配置
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: "gzip",
        ext: ".gz"
      })
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
          // additionalData: `@import "@/assets/styles/index.less";`
        }
      }
    },
    optimizeDeps: {
      esbuildOptions: { target: "es2020" }
    },
    resolve: {
      alias: {
        "~": join(__dirname, "./"), // 根路径
        "@": join(__dirname, "src")
      }
    },
    build: {
      outDir: "dist",
      minify: "terser",
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: true // 清除console
        }
      },
      // chunk 大小警告的限制
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        input: "index.html",
        output: {
          // 静态资源打包做处理
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id.toString().split("node_modules/")[1].split("/")[0].toString();
            }
          }
        }
      }
    },
    base: "./",
    envDir,
    define: {
      __APP_VERSION__: JSON.stringify(version),
      __ISDEV__: command === "serve",
      __ISPROD__: command === "build"
    },
    server: {
      proxy: getProxy(env),
      port: env.VITE_PORT,
      open: true,
      host: "0.0.0.0" // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
    }
  };
});
