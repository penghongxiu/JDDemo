// vite.config.ts
import { defineConfig } from "file:///D:/work/JDDemo/node_modules/vite/dist/node/index.js";
import path from "path";
import { fileURLToPath } from "url";
import fg from "file:///D:/work/JDDemo/node_modules/fast-glob/out/index.js";
import react from "file:///D:/work/JDDemo/node_modules/@vitejs/plugin-react/dist/index.mjs";
import vitePluginImp from "file:///D:/work/JDDemo/node_modules/vite-plugin-imp/dist/index.mjs";
import { vitePluginServe } from "file:///D:/work/JDDemo/node_modules/@cherry/vite-plugin-serve/dist/index.js";
import { analyzer } from "file:///D:/work/JDDemo/node_modules/vite-bundle-analyzer/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///D:/work/JDDemo/vite.config.ts";
var vite_config_default = defineConfig((viteEnv) => {
  const root = path.dirname(fileURLToPath(__vite_injected_original_import_meta_url));
  const srcName = "src";
  const src = path.resolve(root, srcName);
  const entryList = fg.sync(["*.ts", "*.tsx", "*.js", "*.jsx", "!*.d.ts"], { cwd: src }).map((filename) => `${srcName}/${filename}`);
  const input = entryList.reduce((map, entry) => {
    const name = path.parse(entry).name;
    map[name] = entry;
    return map;
  }, {});
  const outDir = "dist";
  return {
    root,
    resolve: {
      alias: [
        {
          find: /^src/,
          replacement: src
        },
        { find: /^~/, replacement: "" }
      ]
    },
    plugins: [
      react({
        jsxRuntime: viteEnv.command === "build" ? "classic" : void 0
      }),
      // 注意：确保此插件在 react 插件之后
      vitePluginServe(),
      vitePluginImp({
        optimize: true,
        libList: [
          {
            libName: "antd",
            libDirectory: "es",
            style: (name) => `antd/es/${name}/style`
          }
        ]
      }),
      analyzer({
        analyzerMode: "static",
        fileName: "../out/stats"
      })
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
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
        }
      }
    },
    // ======= 核心修改部分 =======
    server: {
      host: "localhost",
      // 👈 必须设为 localhost，强制插件生成基于 localhost 的图片链接
      port: 5176,
      https: false,
      // 👈 显式关闭 https，防止生成 https://... 的错误链接
      cors: true,
      strictPort: true
      // 如果 5176 被占用则报错，而不是随机换端口
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx3b3JrXFxcXEpERGVtb1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcd29ya1xcXFxKRERlbW9cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3dvcmsvSkREZW1vL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSBcInVybFwiO1xuaW1wb3J0IGZnIGZyb20gXCJmYXN0LWdsb2JcIjtcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgdml0ZVBsdWdpbkltcCBmcm9tICd2aXRlLXBsdWdpbi1pbXAnO1xuaW1wb3J0IHsgdml0ZVBsdWdpblNlcnZlIH0gZnJvbSBcIkBjaGVycnkvdml0ZS1wbHVnaW4tc2VydmVcIjtcbmltcG9ydCB7IGFuYWx5emVyIH0gZnJvbSBcInZpdGUtYnVuZGxlLWFuYWx5emVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygodml0ZUVudikgPT4ge1xuICBjb25zdCByb290ID0gcGF0aC5kaXJuYW1lKGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKSk7XG5cbiAgY29uc3Qgc3JjTmFtZSA9IFwic3JjXCI7XG4gIGNvbnN0IHNyYyA9IHBhdGgucmVzb2x2ZShyb290LCBzcmNOYW1lKTtcblxuICAvLyBcdTYyNkJcdTYzQ0ZcdTYyNDBcdTY3MDlcdTUxNjVcdTUzRTNcdTY1ODdcdTRFRjZcbiAgY29uc3QgZW50cnlMaXN0ID0gZmcuc3luYyhbXCIqLnRzXCIsIFwiKi50c3hcIiwgXCIqLmpzXCIsIFwiKi5qc3hcIiwgXCIhKi5kLnRzXCJdLCB7IGN3ZDogc3JjIH0pXG4gICAgLm1hcChmaWxlbmFtZSA9PiBgJHtzcmNOYW1lfS8ke2ZpbGVuYW1lfWApO1xuXG4gIGNvbnN0IGlucHV0ID0gZW50cnlMaXN0LnJlZHVjZSgobWFwLCBlbnRyeSkgPT4ge1xuICAgIGNvbnN0IG5hbWUgPSBwYXRoLnBhcnNlKGVudHJ5KS5uYW1lO1xuICAgIG1hcFtuYW1lXSA9IGVudHJ5O1xuICAgIHJldHVybiBtYXA7XG4gIH0sIHt9KTtcblxuICBjb25zdCBvdXREaXIgPSBcImRpc3RcIjtcblxuICByZXR1cm4ge1xuICAgIHJvb3QsXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGZpbmQ6IC9ec3JjLyxcbiAgICAgICAgICByZXBsYWNlbWVudDogc3JjXG4gICAgICAgIH0sXG4gICAgICAgIHsgZmluZDogL15+LywgcmVwbGFjZW1lbnQ6ICcnIH0sXG4gICAgICBdXG4gICAgfSxcbiAgICBwbHVnaW5zOiBbXG4gICAgICByZWFjdCh7XG4gICAgICAgIGpzeFJ1bnRpbWU6IHZpdGVFbnYuY29tbWFuZCA9PT0gXCJidWlsZFwiID8gXCJjbGFzc2ljXCIgOiB1bmRlZmluZWRcbiAgICAgIH0pLFxuICAgICAgLy8gXHU2Q0U4XHU2MTBGXHVGRjFBXHU3ODZFXHU0RkREXHU2QjY0XHU2M0QyXHU0RUY2XHU1NzI4IHJlYWN0IFx1NjNEMlx1NEVGNlx1NEU0Qlx1NTQwRVxuICAgICAgdml0ZVBsdWdpblNlcnZlKCksIFxuICAgICAgdml0ZVBsdWdpbkltcCh7XG4gICAgICAgIG9wdGltaXplOiB0cnVlLFxuICAgICAgICBsaWJMaXN0OiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbGliTmFtZTogJ2FudGQnLFxuICAgICAgICAgICAgbGliRGlyZWN0b3J5OiAnZXMnLFxuICAgICAgICAgICAgc3R5bGU6IChuYW1lKSA9PiBgYW50ZC9lcy8ke25hbWV9L3N0eWxlYCxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSksXG4gICAgICBhbmFseXplcih7XG4gICAgICAgIGFuYWx5emVyTW9kZTogXCJzdGF0aWNcIixcbiAgICAgICAgZmlsZU5hbWU6IFwiLi4vb3V0L3N0YXRzXCJcbiAgICAgIH0pXG4gICAgXSxcbiAgICBjc3M6IHtcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgICAgbGVzczoge1xuICAgICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICBvdXREaXIsXG4gICAgICBlbXB0eU91dERpcjogdHJ1ZSxcbiAgICAgIGNvcHlQdWJsaWNEaXI6IHRydWUsXG4gICAgICBtaW5pZnk6IHRydWUsXG4gICAgICBtYW5pZmVzdDogdHJ1ZSxcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgaW5wdXQsXG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiBcIltuYW1lXS5qc1wiLFxuICAgICAgICAgIGNodW5rRmlsZU5hbWVzOiBcImpzL1tuYW1lXS1baGFzaF0uanNcIixcbiAgICAgICAgICBhc3NldEZpbGVOYW1lczogXCJhc3NldHMvW25hbWVdLVtoYXNoXS5bZXh0XVwiXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgfSxcbiAgICAvLyA9PT09PT09IFx1NjgzOFx1NUZDM1x1NEZFRVx1NjUzOVx1OTBFOFx1NTIwNiA9PT09PT09XG4gICAgc2VydmVyOiB7XG4gICAgICBob3N0OiAnbG9jYWxob3N0JywgLy8gXHVEODNEXHVEQzQ4IFx1NUZDNVx1OTg3Qlx1OEJCRVx1NEUzQSBsb2NhbGhvc3RcdUZGMENcdTVGM0FcdTUyMzZcdTYzRDJcdTRFRjZcdTc1MUZcdTYyMTBcdTU3RkFcdTRFOEUgbG9jYWxob3N0IFx1NzY4NFx1NTZGRVx1NzI0N1x1OTRGRVx1NjNBNVxuICAgICAgcG9ydDogNTE3NixcbiAgICAgIGh0dHBzOiBmYWxzZSwgICAgICAvLyBcdUQ4M0RcdURDNDggXHU2NjNFXHU1RjBGXHU1MTczXHU5NUVEIGh0dHBzXHVGRjBDXHU5NjMyXHU2QjYyXHU3NTFGXHU2MjEwIGh0dHBzOi8vLi4uIFx1NzY4NFx1OTUxOVx1OEJFRlx1OTRGRVx1NjNBNVxuICAgICAgY29yczogdHJ1ZSxcbiAgICAgIHN0cmljdFBvcnQ6IHRydWUgICAvLyBcdTU5ODJcdTY3OUMgNTE3NiBcdTg4QUJcdTUzNjBcdTc1MjhcdTUyMTlcdTYyQTVcdTk1MTlcdUZGMENcdTgwMENcdTRFMERcdTY2MkZcdTk2OEZcdTY3M0FcdTYzNjJcdTdBRUZcdTUzRTNcbiAgICB9XG4gIH07XG59KTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQWtPLFNBQVMsb0JBQW9CO0FBQy9QLE9BQU8sVUFBVTtBQUNqQixTQUFTLHFCQUFxQjtBQUM5QixPQUFPLFFBQVE7QUFDZixPQUFPLFdBQVc7QUFDbEIsT0FBTyxtQkFBbUI7QUFDMUIsU0FBUyx1QkFBdUI7QUFDaEMsU0FBUyxnQkFBZ0I7QUFQZ0gsSUFBTSwyQ0FBMkM7QUFTMUwsSUFBTyxzQkFBUSxhQUFhLENBQUMsWUFBWTtBQUN2QyxRQUFNLE9BQU8sS0FBSyxRQUFRLGNBQWMsd0NBQWUsQ0FBQztBQUV4RCxRQUFNLFVBQVU7QUFDaEIsUUFBTSxNQUFNLEtBQUssUUFBUSxNQUFNLE9BQU87QUFHdEMsUUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLFFBQVEsU0FBUyxRQUFRLFNBQVMsU0FBUyxHQUFHLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFDbEYsSUFBSSxjQUFZLEdBQUcsT0FBTyxJQUFJLFFBQVEsRUFBRTtBQUUzQyxRQUFNLFFBQVEsVUFBVSxPQUFPLENBQUMsS0FBSyxVQUFVO0FBQzdDLFVBQU0sT0FBTyxLQUFLLE1BQU0sS0FBSyxFQUFFO0FBQy9CLFFBQUksSUFBSSxJQUFJO0FBQ1osV0FBTztBQUFBLEVBQ1QsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLFNBQVM7QUFFZixTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0w7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLGFBQWE7QUFBQSxRQUNmO0FBQUEsUUFDQSxFQUFFLE1BQU0sTUFBTSxhQUFhLEdBQUc7QUFBQSxNQUNoQztBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE1BQU07QUFBQSxRQUNKLFlBQVksUUFBUSxZQUFZLFVBQVUsWUFBWTtBQUFBLE1BQ3hELENBQUM7QUFBQTtBQUFBLE1BRUQsZ0JBQWdCO0FBQUEsTUFDaEIsY0FBYztBQUFBLFFBQ1osVUFBVTtBQUFBLFFBQ1YsU0FBUztBQUFBLFVBQ1A7QUFBQSxZQUNFLFNBQVM7QUFBQSxZQUNULGNBQWM7QUFBQSxZQUNkLE9BQU8sQ0FBQyxTQUFTLFdBQVcsSUFBSTtBQUFBLFVBQ2xDO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUFBLE1BQ0QsU0FBUztBQUFBLFFBQ1AsY0FBYztBQUFBLFFBQ2QsVUFBVTtBQUFBLE1BQ1osQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNILHFCQUFxQjtBQUFBLFFBQ25CLE1BQU07QUFBQSxVQUNKLG1CQUFtQjtBQUFBLFFBQ3JCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMO0FBQUEsTUFDQSxhQUFhO0FBQUEsTUFDYixlQUFlO0FBQUEsTUFDZixRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixlQUFlO0FBQUEsUUFDYjtBQUFBLFFBQ0EsUUFBUTtBQUFBLFVBQ04sZ0JBQWdCO0FBQUEsVUFDaEIsZ0JBQWdCO0FBQUEsVUFDaEIsZ0JBQWdCO0FBQUEsUUFDbEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBO0FBQUEsSUFFQSxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUE7QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQTtBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sWUFBWTtBQUFBO0FBQUEsSUFDZDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
