# Titan Vite
现代开发框架，使用原生 ESM
## Available Scripts

```bash
$ npm run dev      # 开发模式
```

## 配置

现在 Titan 会自动设置项目 `BASE` 而无需手动设置

在 `.env.production` 中增加 `BASE` 字段可以覆盖自动生成的规则


### 本地开发

1. 修改 `index.html`，修改 `<script type="module" src="/src/main.tsx"></script>`，将 `src` 属性改为待开发的入口文件
2. 执行 `npm run dev`
3. 在浏览器中访问 `https://<你的ip>:5176/` (注意：ip 和端口号会在控制台打印出来)


### 目录结构
````
└── dist--打包生成静态资源引用目录
└── src
    ├── api--接口
    ├── assets--静态资源
    ├── common--公共方法
    ├── components--公共组件
    ├── page--页面
    ├── router--路由
    ├── store--redux store
    ├── main.tsx--入口文件
└── vite.config.ts--vite配置文件
    
````
