// src/page/module/AdaptiveCard/types.ts
export type CardTheme = "blue" | "green" | "yellow";

export interface ThemeConfig {
  primary: string;
  voucher: string;
  voucherSvg: string;
  blob1: string;
  blob2: string;
  blob3: string;
  swiper2Bg: string;
  priceBarBg: string;
}

export interface SwiperItem {
  id: string | number;
  [key: string]: any;
}

export interface BannerItem extends SwiperItem {
  id: number;
  img: string;
  title: string;
  price: number;
  isSelfRun: boolean;
}

export interface ProductItem extends SwiperItem {
  id: number;
  img: string;
  name: string;
}
export interface ProductDetailState {
  id: number;
  img: string;
  title?: string;
  name?: string;
  price?: number;
  isSelfRun?: boolean;
}