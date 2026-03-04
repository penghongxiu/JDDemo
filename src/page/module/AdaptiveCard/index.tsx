// src/components/AdaptiveCard/index.tsx
import React from "react";
import "@nutui/nutui-react/dist/style.css";
import LogoSection from "src/component/LogoSection/index";
import CounterSection from "src/component/CounterSection/index";
import SwiperSection from "src/component/SwiperSection/index";
import { RightOutlined } from '@ant-design/icons';
import "./index.scss";

// ===== 主题配置 =====
export type CardTheme = "blue" | "green" | "yellow";

interface ThemeConfig {
  primary: string;       // 主背景色
  voucher: string;       // 凹条颜色
  voucherSvg: string;    // SVG URL编码颜色
  blob1: string;
  blob2: string;
  blob3: string;
  swiper2Bg: string;     // 右下角渐变
  priceBarBg: string;    // 价格条渐变
}

const THEME_MAP: Record<CardTheme, ThemeConfig> = {
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

interface BannerItem extends SwiperItem {
  id: number;
  img: string;
  title: string;
  price: number;
  isSelfRun: boolean;
}

const bannerList: BannerItem[] = [
  { id: 1, img: "/src/assets/img/single/image1.png", title: "HUAWEI Mate 80 麒麟9020 16GB+512GB雪域白", price: 100, isSelfRun: true },
  { id: 2, img: "/src/assets/img/single/image2.png", title: "小米 17 Pro 妙享背屏 徕卡光影大师 12GB+256GB", price: 200, isSelfRun: true },
  { id: 3, img: "/src/assets/img/single/image3.png", title: "REDMI Turbo 5 Max 天玑9500s 9000mAh大电池", price: 300, isSelfRun: true },
  { id: 4, img: "/src/assets/img/single/image4.png", title: "一加 Ace 6 12GB+256GB 闪白 骁龙 8 至尊版", price: 400, isSelfRun: true },
  { id: 5, img: "/src/assets/img/single/image5.png", title: "vivo X300 Pro 蔡司2亿APO超级长焦 16GB+512GB", price: 500, isSelfRun: true },
  { id: 6, img: "/src/assets/img/single/image6.png", title: "APPLE 17 Pro 第五代 骁龙 8 至尊版 12GB+256GB", price: 600, isSelfRun: true },
];

export interface SwiperItem {
  id: string | number;
  [key: string]: any;
}

interface ProductItem extends SwiperItem {
  id: number;
  img: string;
  name: string;
}

const productList: ProductItem[] = [
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
];

// ==================== Props ====================
interface AdaptiveCardProps {
  theme?: CardTheme;
}

// ==================== 主组件 ====================
const AdaptiveCard: React.FC<AdaptiveCardProps> = ({ theme = "blue" }) => {
  const t = THEME_MAP[theme];

  return (
    <div
      className="adaptive-card"
      style={{ "--card-primary": t.primary } as React.CSSProperties}
    >
      {/* 背景光晕 */}
      <div className="card-bg-deco">
        <div className="blob blob-1" style={{ background: t.blob1 }} />
        <div className="blob blob-2" style={{ background: t.blob2 }} />
        <div className="blob blob-3" style={{ background: t.blob3 }} />
      </div>

      {/* ====== 上半区域 ====== */}
      <div className="card-top">
        <div className="cell cell-logo">
          <LogoSection />
        </div>

        <div className="cell cell-counter">
          <CounterSection from={1} to={100} duration={1000} suffix="元" />

          {/* 悬浮凹型条 */}
          <div
            className="floating-voucher-bar"
            style={{
              background: t.voucher,
              // 动态替换 SVG 颜色
              "--voucher-svg": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 375 14' preserveAspectRatio='none'%3E%3Cpath d='M0,0 Q187.5,28 375,0 L375,14 L0,14 Z' fill='${t.voucherSvg}'/%3E%3C/svg%3E")`,
            } as React.CSSProperties}
          >
            <div className="voucher-content">
              <span className="voucher-text">领大额券包</span>
              <div className="voucher-go-btn">
                GO <RightOutlined />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====== 下半区域 ====== */}
      <div className="card-bottom">
        <div className="cell cell-swiper1">
          <SwiperSection<ProductItem>
            items={productList}
            mode="grid"
            autoPlay={4000}
            loop={true}
            showIndicator={true}
            gridGap={6}
            renderItem={(item) => (
              <div className="product-card">
                <img src={item.img} alt={item.name} />
              </div>
            )}
          />
        </div>

        <div
          className="cell cell-swiper2"
          style={{ background: t.swiper2Bg }}
        >
          <SwiperSection<BannerItem>
            items={bannerList}
            mode="single"
            autoPlay={3000}
            loop={true}
            showIndicator={true}
            renderItem={(item) => (
              <div className="banner-slide">
                <img src={item.img} alt={item.title} />
                <div className="banner-title">{item.title}</div>
                <div className="float-price-content">
                  <div className="float-left">
                    <span className="float-price-label">¥</span>
                    <span className="float-price-value">{item.price}</span>
                  </div>
                </div>
              </div>
            )}
          />
          <div
            className="static-price-frame"
            style={{ background: t.priceBarBg }}
          >
            <span className="float-right">+</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdaptiveCard;