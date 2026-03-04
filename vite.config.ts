import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fg from "fast-glob";
import react from '@vitejs/plugin-react';
import vitePluginImp from 'vite-plugin-imp';
import { vitePluginServe } from "@cherry/vite-plugin-serve";
import { analyzer } from "vite-bundle-analyzer";

export default defineConfig((viteEnv) => {
  const root = path.dirname(fileURLToPath(import.meta.url));

  const srcName = "src";
  const src = path.resolve(root, srcName);

  // 扫描所有入口文件
  const entryList = fg.sync(["*.ts", "*.tsx", "*.js", "*.jsx", "!*.d.ts"], { cwd: src })
    .map(filename => `${srcName}/${filename}`);

  const input = entryList.reduce((map, entry) => {
    const name = path.parse(entry).name;
    map[name] = entry;
    return map;
  }, {});

  const outDir = "dist";

  return {
    root,
    resolve: {
      alias: {
        "src": src,
        "~": root,
      }
    },
    plugins: [
      react({
        jsxRuntime: viteEnv.command === "build" ? "classic" : undefined
      }),
      // 注意：确保此插件在 react 插件之后
      vitePluginServe(),
      vitePluginImp({
        optimize: true,
        libList: [
          {
            libName: 'antd',
            libDirectory: 'es',
            style: (name) => `antd/es/${name}/style`,
          },
        ],
      }),
      analyzer({
        analyzerMode: "static",
        fileName: "../out/stats"
      })
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    build: {
      outDir,
      emptyOutDir: true,
      copyPublicDir: true,
      minify: true,
      manifest: true,
      rollupOptions: {
        input,
        output: {
          entryFileNames: "[name].js",
          chunkFileNames: "js/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash].[ext]"
        },
      }
    },
    server: {
      host: '192.168.100.198',
      port: 5124,
      cors: true,
      strictPort: true
    }
  };
});