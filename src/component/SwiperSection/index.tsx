// src/components/SwiperSection/index.tsx
import React, { useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ReactNode } from "react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./index.scss";


/** 轮播数据基础接口 */
export interface SwiperItem {
  id: string | number;
  [key: string]: any;
}

/** 轮播模式：single-单图模式，grid-四宫格模式 */
export type SwiperLayoutMode = "single" | "grid";

/** 组件属性接口 */
export interface SwiperSectionProps<T extends SwiperItem> {
  items: T[];                                // 原始数据列表
  mode?: SwiperLayoutMode;                   // 展示模式
  renderItem: (item: T, index: number) => ReactNode; // 自定义渲染函数
  autoPlay?: boolean | number;               // 自动播放配置
  loop?: boolean;                            // 是否循环
  showIndicator?: boolean;                   // 是否显示指示点
  showArrows?: boolean;                      // 是否显示切换箭头
  onChange?: (index: number) => void;        // 切换回调
  onItemClick?: (item: T, index: number) => void; // 点击回调
  className?: string;                        // 自定义类名
  gridGap?: number;                          // 格子间距 (仅grid模式)
}

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
  showArrows = false,
  onChange,
  onItemClick, 
  className = "",
  gridGap = 8,
}: SwiperSectionProps<T>) {
  const swiperRef = useRef<SwiperType | null>(null);

  /** 核心逻辑：根据模式处理数据分组 */
  const slides = useMemo(() => {
    // 如果是网格模式，每 4 个数据分为一组（一屏显示四个）
    if (mode === "grid") {
      const groups: T[][] = [];
      for (let i = 0; i < items.length; i += 4) {
        groups.push(items.slice(i, i + 4));
      }
      return groups;
    }
    // 单图模式，每个数据独立作为一组
    return items.map((item) => [item]);
  }, [items, mode]);

  /** 自动播放参数配置 */
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
        loop={loop && slides.length > 1}
        pagination={showIndicator && slides.length > 1 ? { clickable: true } : false}
        navigation={showArrows}
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
                style={{ cursor: onItemClick ? "pointer" : "default" }}
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