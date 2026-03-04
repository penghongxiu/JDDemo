// src/components/SwiperSection/index.tsx
import React, { useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
// import type { SwiperSectionProps, SwiperItem } from "../../types/swiper";



// ✅ 引入 swiper 样式
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import "./index.scss";

/**
 * 通用 Swiper 组件
 * mode="single"  → 每页展示1个item，占满整个区域
 * mode="grid"    → 每页展示4个item，2×2 四宫格布局
 */

// src/types/swiper.ts
import { ReactNode } from "react";

// 单个 slide 数据项
export interface SwiperItem {
  id: string | number;
  [key: string]: any;
}

// 布局模式
export type SwiperLayoutMode = "single" | "grid";

// 组件 Props
export interface SwiperSectionProps<T extends SwiperItem> {
  /** 数据列表 */
  items: T[];
  /** 布局模式：single=一张占满 | grid=四宫格(2x2) */
  mode?: SwiperLayoutMode;
  /** 自定义渲染每个item */
  renderItem: (item: T, index: number) => ReactNode;
  /** 自动播放，传 false 关闭，传数字设置间隔ms */
  autoPlay?: boolean | number;
  /** 是否循环 */
  loop?: boolean;
  /** 是否显示指示器 */
  showIndicator?: boolean;
  /** 是否显示前后箭头 */
  showArrows?: boolean;
  /** 切换回调 */
  onChange?: (index: number) => void;
  /** 自定义类名 */
  className?: string;
  /** grid 模式下的间距(px) */
  gridGap?: number;
}

function SwiperSection<T extends SwiperItem>({
  items = [],
  mode = "single",
  renderItem,
  autoPlay = true,
  loop = true,
  showIndicator = true,
  showArrows = false,
  onChange,
  className = "",
  gridGap = 8,
}: SwiperSectionProps<T>) {
  const swiperRef = useRef<SwiperType | null>(null);

  // grid 模式：每4个item分成一组，每组是一个 slide
  // single 模式：每个item就是一个 slide
  const slides = useMemo(() => {
    if (mode === "grid") {
      const groups: T[][] = [];
      for (let i = 0; i < items.length; i += 4) {
        groups.push(items.slice(i, i + 4));
      }
      return groups;
    }
    // single 模式，每项包成数组统一结构
    return items.map((item) => [item]);
  }, [items, mode]);

  // 自动播放配置
  const autoPlayConfig = useMemo(() => {
    if (!autoPlay) return false;
    return {
      delay: typeof autoPlay === "number" ? autoPlay : 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    };
  }, [autoPlay]);

  // slide 切换回调
  const handleSlideChange = (swiper: SwiperType) => {
    onChange?.(swiper.realIndex);
  };

  if (items.length === 0) return null;

  return (
    <div className={`swiper-section swiper-section--${mode} ${className}`}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
        autoplay={autoPlayConfig}
        loop={loop && slides.length > 1}
        pagination={
          showIndicator
            ? {
              clickable: true,
              el: `.swiper-section--${mode} .custom-pagination`,
              bulletClass: "custom-bullet",
              bulletActiveClass: "custom-bullet-active",
            }
            : false
        }
        navigation={
          showArrows
            ? {
              prevEl: `.swiper-section--${mode} .custom-prev`,
              nextEl: `.swiper-section--${mode} .custom-next`,
            }
            : false
        }
        spaceBetween={0}
        slidesPerView={1}
        speed={500}
        className="swiper-main"
      >
        {slides.map((group, slideIndex) => (
          <SwiperSlide key={slideIndex}>
            {mode === "grid" ? (
              /* ====== grid 模式：四宫格 ====== */
              <div
                className="grid-layout"
                style={{ gap: `${gridGap}px` }}
              >
                {group.map((item, itemIndex) => (
                  <div key={item.id} className="grid-item">
                    {renderItem(item, slideIndex * 4 + itemIndex)}
                  </div>
                ))}
                {/* 不足4个时用空占位 */}
                {group.length < 4 &&
                  Array.from({ length: 4 - group.length }).map((_, i) => (
                    <div key={`empty-${i}`} className="grid-item grid-item--empty" />
                  ))}
              </div>
            ) : (
              /* ====== single 模式：单张占满 ====== */
              /* ====== single 模式：单张占满 ====== */
              <div className="single-layout">
                {/* 新增：自营标签 (假设 item 中有 isSelfRun 属性) */}
                {group[0].isSelfRun && (
                  <div className="tag-self-run">
                    自营
                  </div>
                )}
                {renderItem(group[0], slideIndex)}
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 自定义指示器 */}
      {showIndicator && slides.length > 1 && (
        <div className="custom-pagination" />
      )}

    </div>
  );
}

export default SwiperSection;
