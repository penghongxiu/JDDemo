import React, { useState, useEffect, useCallback } from "react";
import AdaptiveCard from "../AdaptiveCard";
import Loading from "src/component/Loading";
import { PAGES } from "../../constants"; 
import "./index.scss";

/**
 * 书本堆叠翻页组件 - 深度优化版
 * 实现功能：卡片层级堆叠、CSS 动画精准同步、图片预加载
 */
const BookCard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [exitPage, setExitPage] = useState<number | null>(null);
  const [enterPage, setEnterPage] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. 资源预加载逻辑：优化图片加载监听
  useEffect(() => {
    const imagesToLoad = [
      ...Array.from({ length: 6 }, (_, i) => `/src/assets/img/single/image${i + 1}.png`),
      ...Array.from({ length: 12 }, (_, i) => `/src/assets/img/grid/image${i + 1}.png`)
    ];

    let loadedCount = 0;
    const totalImages = imagesToLoad.length;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount >= totalImages) {
        // 增加 500ms 缓冲，配合 UI 渐入动画
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
      }
    };

    imagesToLoad.forEach((src) => {
      const img = new Image();
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded; 
      img.src = src;
    });

    // 兜底：3秒超时后强制关闭加载层
    const timeout = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timeout);
  }, []);

  // 2. 页面跳转逻辑：使用 useCallback 避免不必要的函数重建
  const goToPage = useCallback((target: number) => {
    if (isAnimating || target === currentPage) return;
    
    setExitPage(currentPage);
    setEnterPage(target);
    setIsAnimating(true);
  }, [isAnimating, currentPage]);

  // 3. 动画结束回调：取代硬编码的 setTimeout，精准对接 CSS flipIn 动画
  const handleAnimationEnd = useCallback((e: React.AnimationEvent, index: number) => {
    // 仅监听入场动画 (flipIn) 结束事件
    if (e.animationName === 'flipIn' && index === enterPage) {
      setCurrentPage(index);
      setExitPage(null);
      setEnterPage(null);
      setIsAnimating(false);
    }
  }, [enterPage]);

  // 4. 样式计算逻辑抽离：增强可读性
  const getCardStyle = (index: number): React.CSSProperties => {
    const isExit = index === exitPage;
    const isEnter = index === enterPage;
    const diff = index - currentPage;

    // 正在进行动画的卡片置于最顶层
    if (isExit) return { zIndex: 30 };
    if (isEnter) return { zIndex: 20 };

    return {
      // 堆叠位移与缩放计算
      transform: `translate(${diff * 8}px, ${diff * 8}px) scale(${1 - Math.abs(diff) * 0.04})`,
      zIndex: 10 - Math.abs(diff),
      filter: diff !== 0 ? `brightness(${1 - Math.abs(diff) * 0.1})` : "none",
      // 性能优化：非当前显示的卡片禁用交互
      pointerEvents: diff === 0 ? "auto" : "none",
    };
  };

  if (isLoading) return <Loading text="精彩内容加载中..." />;

  return (
    <div className="book-wrapper">
      <div className="book-stack">
        {PAGES.map((page, index) => {
          const isExit = index === exitPage;
          const isEnter = index === enterPage;
          
          let cardClassName = "stack-card";
          if (isExit) cardClassName += " card-exit";
          if (isEnter) cardClassName += " card-enter";

          return (
            <div
              key={page.theme}
              className={cardClassName}
              style={getCardStyle(index)}
              onAnimationEnd={(e) => handleAnimationEnd(e, index)}
            >
              <AdaptiveCard theme={page.theme} />
            </div>
          );
        })}
      </div>

      {/* 右侧书签导航 - 语义化优化 */}
      <nav className="page-tabs" aria-label="卡片导航">
        {PAGES.map((page, index) => (
          <button
            key={page.theme}
            className={`page-tab ${currentPage === index ? "active" : ""}`}
            style={{ "--tab-color": page.color } as React.CSSProperties}
            onClick={() => goToPage(index)}
            disabled={isAnimating}
            aria-current={currentPage === index ? "page" : undefined}
            title={page.label}
          />
        ))}
      </nav>
    </div>
  );
};

export default BookCard;