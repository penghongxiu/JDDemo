declare global {
    interface Window {
      RdcTest: any;
    }
  }

// 添加图片文件的类型声明
declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.jpeg" {
  const value: string;
  export default value;
}

declare module "*.gif" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const value: string;
  export default value;
}

declare module "*.webp" {
  const value: string;
  export default value;
}

declare module "*.ico" {
  const value: string;
  export default value;
}

// 添加对src路径的模块声明
declare module "src/*" {
  const value: any;
  export default value;
}

// 添加对相对路径的模块声明
declare module "../../assets/img/*" {
  const value: string;
  export default value;
}

declare module "../assets/img/*" {
  const value: string;
  export default value;
}

declare module "./assets/img/*" {
  const value: string;
  export default value;
}

export {};