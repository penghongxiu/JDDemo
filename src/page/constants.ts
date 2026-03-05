import { CardTheme, ThemeConfig, BannerItem, ProductItem } from "./types";
export const THEME_MAP: Record<CardTheme, ThemeConfig> = {
  blue: {
    primary:    "#397FFF",
    voucher:    "#3A6EFF",
    voucherSvg: "%233A6EFF",
    blob1:      "#667eea",
    blob2:      "#f093fb",
    blob3:      "#4facfe",
    swiper2Bg:  "linear-gradient(to bottom, #add8e6, #ffffff)",
    priceBarBg: "linear-gradient(to right, #196cd2, #8ec1ea)",
  },
  green: {
    primary:    "#2ECC71",
    voucher:    "#27AE60",
    voucherSvg: "%2327AE60",
    blob1:      "#a8ff78",
    blob2:      "#78ffa8",
    blob3:      "#56ab2f",
    swiper2Bg:  "linear-gradient(to bottom, #b2f7c1, #ffffff)",
    priceBarBg: "linear-gradient(to right, #1a7a40, #6fcf97)",
  },
  yellow: {
    primary:    "#F5A623",
    voucher:    "#E6951A",
    voucherSvg: "%23E6951A",
    blob1:      "#ffe066",
    blob2:      "#ffb347",
    blob3:      "#f7971e",
    swiper2Bg:  "linear-gradient(to bottom, #ffeaa7, #ffffff)",
    priceBarBg: "linear-gradient(to right, #b8740a, #f6d365)",
  },
};
export const PAGES: { theme: CardTheme; label: string; color: string }[] = [
  { theme: "blue",   label: "蓝", color: "#397FFF" },
  { theme: "green",  label: "绿", color: "#2ECC71" },
  { theme: "yellow", label: "黄", color: "#F5A623" },
];
export const bannerList: BannerItem[] = [
  { id: 1, img: "/src/assets/img/single/image1.png", title: "HUAWEI Mate 80 麒麟9020 16GB+512GB雪域白", price: 100, isSelfRun: true },
  { id: 2, img: "/src/assets/img/single/image2.png", title: "小米 17 Pro 妙享背屏 徕卡光影大师 12GB+256GB", price: 200, isSelfRun: true },
  { id: 3, img: "/src/assets/img/single/image3.png", title: "REDMI Turbo 5 Max 天玑9500s 9000mAh大电池", price: 300, isSelfRun: true },
  { id: 4, img: "/src/assets/img/single/image4.png", title: "一加 Ace 6 12GB+256GB 闪白 骁龙 8 至尊版", price: 400, isSelfRun: true },
  { id: 5, img: "/src/assets/img/single/image5.png", title: "vivo X300 Pro 蔡司2亿APO超级长焦 16GB+512GB", price: 500, isSelfRun: true },
  { id: 6, img: "/src/assets/img/single/image6.png", title: "APPLE 17 Pro 第五代 骁龙 8 至尊版 12GB+256GB", price: 600, isSelfRun: true },
];
export const productList: ProductItem[] = [
  { id: 1,  img: "/src/assets/img/grid/image1.png",  name: "Vivo"   },
  { id: 2,  img: "/src/assets/img/grid/image2.png",  name: "nubia"  },
  { id: 3,  img: "/src/assets/img/grid/image3.png",  name: "ONEPLUS"},
  { id: 4,  img: "/src/assets/img/grid/image4.png",  name: "iQOO"  },
  { id: 5,  img: "/src/assets/img/grid/image5.png",  name: "小米"  },
  { id: 6,  img: "/src/assets/img/grid/image6.png",  name: "红魔"  },
  { id: 7,  img: "/src/assets/img/grid/image7.png",  name: "MEIZU" },
  { id: 8,  img: "/src/assets/img/grid/image8.png",  name: "APPLE" },
  { id: 9,  img: "/src/assets/img/grid/image9.png",  name: "MOTO"  },
  { id: 10, img: "/src/assets/img/grid/image10.png", name: "photo" },
  { id: 11, img: "/src/assets/img/grid/image11.png", name: "OPPO"  },
  { id: 12, img: "/src/assets/img/grid/image12.png", name: "三星"  },
  { id: 13, img: "/src/assets/img/grid/image11.png", name: "华为"  },
];