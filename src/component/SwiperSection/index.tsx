// src/components/SwiperSection/index.tsx
import React, { useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./index.scss";
import { ReactNode } from "react";

export interface SwiperItem {
  id: string | number;
  [key: string]: any;
}

export type SwiperLayoutMode = "single" | "grid";

export interface SwiperSectionProps<T extends SwiperItem> {
  items: T[];
  mode?: SwiperLayoutMode;
  renderItem: (item: T, index: number) => ReactNode;
  autoPlay?: boolean | number;
  loop?: boolean;
  showIndicator?: boolean;
  showArrows?: boolean;
  onChange?: (index: number) => void;
  className?: string;
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

  const autoPlayConfig = useMemo(() => {
    if (!autoPlay) return false;
    return {
      delay: typeof autoPlay === "number" ? autoPlay : 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    };
  }, [autoPlay]);

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
              <div className="grid-layout" style={{ gap: `${gridGap}px` }}>
                {group.map((item, itemIndex) => (
                  <div key={item.id} className="grid-item">
                    {renderItem(item, slideIndex * 4 + itemIndex)}
                  </div>
                ))}
                {group.length < 4 &&
                  Array.from({ length: 4 - group.length }).map((_, i) => (
                    <div key={`empty-${i}`} className="grid-item grid-item--empty" />
                  ))}
              </div>
            ) : (
              <div className="single-layout">
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