import {defineConfig} from "vite";
import path from "path";
import {fileURLToPath} from "url";
import fg from "fast-glob";
import react from '@vitejs/plugin-react';
import vitePluginImp from 'vite-plugin-imp';
import {vitePluginServe} from "@cherry/vite-plugin-serve";
import {analyzer} from "vite-bundle-analyzer";

// https://vitejs.dev/config/
/*export default defineConfig({
  plugins: [react()],
})*/
export default defineConfig((viteEnv) => {
  const root = path.dirname(fileURLToPath(import.meta.url));

  const srcName = "src";
  const src = path.resolve(root, srcName);

  const entryList = fg.sync(["*.ts", "*.tsx", "*.js", "*.jsx", "!*.d.ts"], {cwd: src})
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
      alias: [
        {
          find: /^src/,
          replacement: src
        },
        {find: /^~/, replacement: ''},
      ]
    },
    plugins: [
      react({
        jsxRuntime: viteEnv.command === "build" ? "classic" : undefined
      }),
      // vitePluginServerConfig(),
      // vitePluginReactDev(),
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
          javascriptEnabled: true, // 支持内联 JavaScript
        },
      },
    },
    build: {
      outDir,
      emptyOutDir: true,
      copyPublicDir: true,
      minify: true,
      manifest: true,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        input,
        output: {
          entryFileNames: "[name].js",
          chunkFileNames: "js/[name]-[hash].js",
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-redux'], // 将第三方库打包到 vendor.js
            ui: ['antd'],
            // md: ['react-markdown'],
          },
          assetFileNames(chunk) {
            let file = "[name]-[hash].[ext]";

            let filename = `assets/${file}`;

            if (chunk.name) {
              const extensions = [".css", ".js"];
              const index = extensions.indexOf(path.parse(chunk.name).ext);
              if (index >= 0) {
                if (index === 0) {
                  file = "[name].[ext]";
                }

                filename = `${extensions[index].slice(1)}/${file}`;
              }
            }

            return filename;

          }
        },
        preserveEntrySignatures: "exports-only",
      }
    },
    server: {
      port: 5176,
      cors: true, // 允许跨域
      proxy: {
        // '/api': {
        //   target: 'https://webim.made-in-china.com/',
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/api/, ''),
        // },
        // '/menta': {
        //   target: '//www.focusaim.com/',
        //   changeOrigin: true,
        //   rewrite: (path) => path,
        // },
      }
    }
  }
})
