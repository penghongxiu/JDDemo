# Titan Vite

现代开发框架，使用原生 ESM

## Available Scripts

```bash
$ npm run dev      # 开发模式
$ npm run build    # 构建生产代码
$ npm run preview  # 启动一个静态服务并且启动 watch，默认以 dist 作为根目录
```

## 配置

现在 Titan 会自动设置项目 `BASE` 而无需手动设置

在 `.env.production` 中增加 `BASE` 字段可以覆盖自动生成的规则

## 组件注意事项+组件类型结构


## 接口文档


## 开发调试


### 本地开发

1. 修改 `index.html`，修改 `<script type="module" src="/src/main.tsx"></script>`，将 `src` 属性改为待开发的入口文件
2. 执行 `npm run dev`
3. 在浏览器中访问 `https://<你的ip>:5176/` (注意：ip 和端口号会在控制台打印出来)

### 联网调试 - dev 模式

1. 执行 `npm run dev`，启动地址为 `https://<你的ip>:5176/`
2. 使用 [Resource Override](https://chrome.google.com/webstore/detail/pkoacgokdfckfpndoffpifphamojphii)，也可以使用
   Charles、Fiddler
3. 在 Resource Override 中导入预制规则 `out/resource_override_dev.json`

如何在 Resource Override 导入规则：

进入 `Resource Override` -> 点击右上角 `Options` 按钮 -> 选择 `Load Rules` -> 选择规则文件


### 联网调试 - preview 模式

1. 执行 `npm run preview`
2. 使用预制规则 `out/resource_override_preview.json`

注意，该模式打包出来的代码只能做调试用，最终上线的代码需要使用 `npm run build`


### 联网调试 - build 模式

1. 执行 `npm run build` 或 `npm run build:watch`
2. 使用 `jaguar -P https` 启动 mstatic 服务
3. 在 Resource Override 中导入预制规则 `out/resource_override_build.json`
4. 或者，在 Resource Override 中增加规则：
    - `https://www.micstatic.com/envo/xxx/dist/*_**.js` -> `https://127.0.0.1:5176/envo/xxx/dist/*.js`
    - `https://www.micstatic.com/envo/xxx/dist/*/**` -> `https://127.0.0.1:5176/envo/xxx/dist/*/**`


### 目录结构
````
└── dist--打包生成静态资源引用目录
└── src
    ├── api--接口
    ├── assets--静态资源
    ├── common--公共方法
    ├── components--公共组件
        └── Loading--全局加载组件
        └── Layout--全局框架
        
    ├── css--样式
    ├── page--页面
    ├── router--路由
    ├── store--redux store
    ├── main.tsx--入口文件
└── vite.config.ts--vite配置文件
    
````
