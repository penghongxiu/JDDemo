// src/components/SwiperSection/index.tsx
import React, { useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { SwiperItem, SwiperSectionProps } from "../type";
import "./index.scss";


/**
 * 通用轮播组件：支持单图展示与四宫格展示
 */
function SwiperSection<T extends SwiperItem>({
  items = [],
  mode = "single",
  renderItem,
  autoPlay = true,
  loop = true,
  showIndicator = true,
  onChange,
  onItemClick, 
  className = "",
  gridGap = 8,
}: SwiperSectionProps<T>) {
  const swiperRef = useRef<SwiperType | null>(null);

  // 1. 直接计算分组，不再使用 useMemo
  // const getSlides = () => {
  //   if (mode !== "grid") return items.map(item => [item]);
  //   const groups: T[][] = [];
  //   for (let i = 0; i < items.length; i += 4) {
  //     groups.push(items.slice(i, i + 4));
  //   }
  //   return groups;
  // };
  // const slides = getSlides();

  //2.useMemo
  const slides = useMemo(() => {
    if (mode === "grid") {
      const groups: T[][] = [];
      for (let i = 0; i < items.length; i += 4) {
        groups.push(items.slice(i, i + 4));
      }
      return groups;
    }
    return items.map((item) => [item]);
  }, [items, mode]);

  // 自动播放参数配置
  const autoPlayConfig = useMemo(() => {
    if (!autoPlay) return false;
    return {
      delay: typeof autoPlay === "number" ? autoPlay : 3000, // 默认3秒
      disableOnInteraction: false, // 用户操作后不停止播放
      pauseOnMouseEnter: true,     // 鼠标悬停暂停
    };
  }, [autoPlay]);

  // 无数据时不渲染
  if (items.length === 0) return null;

  return (
    <div className={`swiper-section swiper-section--${mode} ${className}`}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => onChange?.(swiper.realIndex)}
        autoplay={autoPlayConfig}
        // autoplay={autoPlay ? { delay: 3000, disableOnInteraction: false } : false}
        loop={loop && slides.length > 1}
        pagination={showIndicator && slides.length > 1 ? { clickable: true } : false}
        spaceBetween={0}
        slidesPerView={1}
        speed={500}
        className="swiper-main"
      >
        {slides.map((group, slideIndex) => (
          <SwiperSlide key={slideIndex}>
            {mode === "grid" ? (
              /* 四宫格布局渲染 */
              <div className="grid-layout" style={{ gap: `${gridGap}px` }}>
                {group.map((item, itemIndex) => {
                  const actualIndex = slideIndex * 4 + itemIndex;
                  return (
                    <div
                      key={item.id}
                      className="grid-item"
                      onClick={() => onItemClick?.(item, actualIndex)}
                      style={{ cursor: onItemClick ? "pointer" : "default" }}
                    >
                      {renderItem(item, actualIndex)}
                    </div>
                  );
                })}
                {/* 如果末尾不满4个，填充空白占位符保持布局整齐 */}
                {group.length < 4 &&
                  Array.from({ length: 4 - group.length }).map((_, i) => (
                    <div key={`empty-${i}`} className="grid-item grid-item--empty" />
                  ))}
              </div>
            ) : (
              /* 单图布局渲染 */
              <div
                className="single-layout"
                onClick={() => onItemClick?.(group[0], slideIndex)}
              >
                {/* 支持自营标签展示 */}
                {group[0].isSelfRun && (
                  <div className="tag-self-run">自营</div>
                )}
                {renderItem(group[0], slideIndex)}
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SwiperSection;