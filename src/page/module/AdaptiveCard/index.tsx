// src/components/AdaptiveCard/index.tsx

import React from "react";
import "@nutui/nutui-react/dist/style.css";
import LogoSection from "src/component/LogoSection/index";
import CounterSection from "src/component/CounterSection/index";
import SwiperSection from "src/component/SwiperSection/index";
import { RightOutlined } from '@ant-design/icons';
import "./index.scss";


interface BannerItem extends SwiperItem {
  id: number;
  img: string;
  title: string;
}

const bannerList: BannerItem[] = [
  { id: 1, img: "/src/assets/img/single/image1.png", title: "HUAWEI Mate 80 麒麟9020 16GB+512GB雪域白 第二代红枫影像 鸿蒙AI 超可靠玄武架构 【春晚直播手机】", price: 100, isSelfRun: true },
  { id: 2, img: "/src/assets/img/single/image2.png", title: "小米（MI）小米 17 Pro 妙享背屏 徕卡光影大师 第五代 骁龙 8 至尊版 白色 12GB+256GB 5G手机", price: 200, isSelfRun: true },
  { id: 3, img: "/src/assets/img/single/image3.png", title: "小米（MI）REDMI Turbo 5 Max 天玑9500s 9000mAh大电池 1.5K阳光屏 12+256祥云白 小米红米5G手机", price: 300, isSelfRun: true },
  { id: 1, img: "/src/assets/img/single/image4.png", title: "一加 Ace 6 12GB+256GB 闪白 oppo 骁龙 8 至尊版 165Hz 超高刷护眼电竞屏 游戏电竞5G手机 国家补贴", price: 400, isSelfRun: true },
  { id: 2, img: "/src/assets/img/single/image5.png", title: "vivo X300 Pro 16GB+512GB 旷野棕 蔡司2亿APO超级长焦 蓝图影像双芯 5年持久流畅OriginOS 6 AI手机", price: 500, isSelfRun: true },
  { id: 3, img: "/src/assets/img/single/image6.png", title: "APPLE 17 Pro 妙享背屏 徕卡光影大师 第五代 骁龙 8 至尊版 白色 12GB+256GB 5G手机", price: 600, isSelfRun: true },
];
export interface SwiperItem {
  id: string | number;
  [key: string]: any;
}
// ===== 示例数据：四宫格模式 =====
interface ProductItem extends SwiperItem {
  id: number;
  img: string;
  name: string;
}

const productList: ProductItem[] = [
  { id: 1, img: "/src/assets/img/grid/image1.png", name: "Vivo" },
  { id: 2, img: "/src/assets/img/grid/image2.png", name: "nubia" },
  { id: 3, img: "/src/assets/img/grid/image3.png", name: "ONEPLUS" },
  { id: 4, img: "/src/assets/img/grid/image4.png", name: "iQOO" },
  { id: 5, img: "/src/assets/img/grid/image5.png", name: "小米" },
  { id: 6, img: "/src/assets/img/grid/image6.png", name: "红魔" },
  { id: 7, img: "/src/assets/img/grid/image7.png", name: "MEIZU" },
  { id: 8, img: "/src/assets/img/grid/image8.png", name: "APPLE" },
  { id: 9, img: "/src/assets/img/grid/image9.png", name: "MOTO" },
  { id: 10, img: "/src/assets/img/grid/image10.png", name: "photo" },
  { id: 11, img: "/src/assets/img/grid/image11.png", name: "OPPO" },
  { id: 12, img: "/src/assets/img/grid/image12.png", name: "三星" },
];

// ==================== 主组件 ====================
const AdaptiveCard: React.FC = () => {
  return (
    <div className="adaptive-card">
      {/* 背景光晕 */}
      <div className="card-bg-deco">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* ====== 上半区域 ====== */}
      <div className="card-top">
        {/* 左上角：Logo */}
        <div className="cell cell-logo">
          <LogoSection />
        </div>
        {/* 右上角：数字动画 */}
        <div className="cell cell-counter">
          <CounterSection
            from={1}
            to={100}
            duration={1000}
            suffix="元"
          />

          {/* 悬浮波浪蓝色长方形 */}
          <div className="floating-voucher-bar">
            <div className="voucher-content">
              <span className="voucher-text">领大额券包</span>
              <div className="voucher-go-btn">
                GO <RightOutlined /> <i className="fa-solid fa-chevron-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* ====== 下半区域 ====== */}
        <div className="card-bottom">
          {/* 左下角：Swiper A */}
          <div className="cell cell-swiper1">
            <SwiperSection<ProductItem>
              items={productList}
              mode="grid"
              autoPlay={4000}
              loop={true}
              showIndicator={true}
              showArrows={false}
              gridGap={6}
              renderItem={(item) => (
                <div className="product-card">
                  <img src={item.img} alt={item.name} />
                </div>
              )}
            />
          </div>


          {/* 右下角：Swiper B */}
          <div className="cell cell-swiper2">
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
                    <div className='float-left'>
                      <span className="float-price-label">¥</span>
                      <span className="float-price-value">{item.price}</span>
                    </div>

                  </div>
                </div>
              )}
            />
            <div className="static-price-frame">
              <span className='float-right'>+</span>
            </div>
          </div>
        </div>
      </div>
      );
};

      export default AdaptiveCard;
