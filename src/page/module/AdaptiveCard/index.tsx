import React from "react";
import { useNavigate } from "react-router-dom";
import { RightOutlined } from '@ant-design/icons';

import LogoSection from "src/component/LogoSection/index";
import CounterSection from "src/component/CounterSection/index";
import SwiperSection from "src/component/SwiperSection/index";

import { THEME_MAP, bannerList, productList } from "../../constants";
import { CardTheme, ProductItem, BannerItem } from "../../types";
import "./index.scss";

interface AdaptiveCardProps {
  theme?: CardTheme;
}

const AdaptiveCard: React.FC<AdaptiveCardProps> = ({ theme = "blue" }) => {
  const navigate = useNavigate();
  const t = THEME_MAP[theme];

//  处理商品点击跳转详情 
  const handleProductClick = (item: ProductItem | BannerItem) => {
    navigate(`/product/${item.id}`, { state: item });
  };

  // 处理优惠券条点击跳转
  const handleGoClick = () => {
    navigate("/coupons");
  };

//  生成动态 SVG 背景 URL（颜色改变）
  const voucherSvgUrl = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 375 14' preserveAspectRatio='none'%3E%3Cpath d='M0,0 Q187.5,28 375,0 L375,14 L0,14 Z' fill='${t.voucherSvg}'/%3E%3C/svg%3E")`;

  return (
    <div 
      className="adaptive-card" 
      style={{ "--card-primary": t.primary } as React.CSSProperties}
    >
      {/* 上半部分：品牌与优惠券入口 */}
      <div className="card-top">
        {/* 品牌logo */}
        <div className="cell cell-logo">
          <LogoSection />
        </div>
        {/* 优惠券 */}
        <div className="cell cell-counter">
          <CounterSection to={100} suffix="元" />
          {/* 优惠券条 */}
          <div
            className="floating-voucher-bar"
            style={{
              background: t.voucher,
              "--voucher-svg": voucherSvgUrl,
            } as React.CSSProperties}
          >
            <div className="voucher-content" onClick={handleGoClick} style={{ cursor: "pointer" }}>
              <span className="voucher-text">领大额券包</span>
              <div className="voucher-go-btn">
                GO <RightOutlined />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 下半部分：商品展示区 */}
      <div className="card-bottom">
        {/* 四张图片轮播 */}
        <div className="cell cell-swiper1">
          <SwiperSection<ProductItem>
            items={productList}
            mode="grid"
            onItemClick={handleProductClick}
            renderItem={(item) => (
                <img src={item.img} alt={item.name} />
            )}
          />
        </div>

        {/* 单张图片轮播*/}
        <div className="cell cell-swiper2" style={{ background: t.swiper2Bg }}>
          <SwiperSection<BannerItem>
            items={bannerList}
            mode="single"
            onItemClick={handleProductClick}
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
          {/* 装饰性价格底栏 */}
          <div className="static-price-frame" style={{ background: t.priceBarBg }}>
            <span className="float-right">+</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdaptiveCard;