### Introduction
这是一个在京东原有的设计图进行创新的电商展示卡片，采用"书本堆叠翻页"的交互设计，为用户提高商品浏览体验。项目通过多层卡片堆叠、3D翻页动画、轮播展示等现代化UI设计，设计形成视觉效果相对出色、交互流畅的前端应用。
### 技术栈
技术栈+TypeScript+AntDesign+Swiper+Vite
### 运行
1、npm i
2、执行 `npm run dev` 即可看到展示效果

### src目录结构

└── src
|    ├── api--接口
|    ├── assets--静态资源
|    ├── common--公共方法
|    ├── components--公共组件
|    |        ├── CounterSection 计数器组件
|    |        ├── Loading 加载组件
|    |        ├── LogoSection 图标展示组件
|    |        └── SwiperSection 轮播组件
|    ├── page--页面
|    |        ├── module 
|    |        |      ├── AdativeCard 卡片页面
|    |        |      ├── BookCard 书页面
|    |        |      ├── Coupons 优惠页面
|    |        |      └── ProductDetail 产品细节页面
|    |        └── index 主页面
|    |        └── constnts 常量 
|    |        └── types 接口类型
|    ├── router--路由
|    ├── store--redux store
|    └── main.tsx--入口文件
└── vite.config.ts--vite配置文件
### 展示效果
