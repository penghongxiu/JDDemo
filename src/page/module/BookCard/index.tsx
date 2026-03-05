import React, { useState, useEffect } from "react";
import AdaptiveCard from "../AdaptiveCard";
import Loading from "src/component/Loading";
import { PAGES } from "../../constants"; 
import "./index.scss";

const BookCard: React.FC = () => {
  // 基础状态
  const [currentPage, setCurrentPage] = useState(0);     // 当前在第几页
  const [isAnimating, setIsAnimating] = useState(false); // 是否正在翻页中（防止连点）
  const [exitPage, setExitPage] = useState<number | null>(null);   // 正在退出的页面
  const [enterPage, setEnterPage] = useState<number | null>(null); // 正在进入的页面
  const [isLoading, setIsLoading] = useState(true);      // 是否加载中

  // 1. 图片预加载逻辑
  useEffect(() => {
    // 整理所有图片路径
    const images = [
      ...Array.from({ length: 6 }, (_, i) => `/src/assets/img/single/image${i + 1}.png`),
      ...Array.from({ length: 12 }, (_, i) => `/src/assets/img/grid/image${i + 1}.png`)
    ];

    let count = 0;
    const total = images.length;

    // 每加载完一张就加 1，全部加载完就关闭 Loading
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        count++;
        if (count >= total) {
          setTimeout(() => setIsLoading(false), 500);
        }
      };
      img.onerror = () => {
        count++; // 报错也跳过，防止卡死
        if (count >= total) setIsLoading(false);
      };
    });
  }, []);

  // 2. 翻页点击函数
  const goToPage = (index: number) => {
    // 如果正在动画或者点的是当前页，就不执行
    if (isAnimating || index === currentPage) return;
    
    setExitPage(currentPage); // 当前页准备退出
    setEnterPage(index);      // 目标页准备进入
    setIsAnimating(true);     // 开启锁定
  };

  // 3. 动画结束后的清理工作
  const handleAnimationEnd = (e: React.AnimationEvent, index: number) => {
    // 只有当“进入”动画结束时，才切换正式页面状态
    if (e.animationName === "flipIn") {
      setCurrentPage(index);
      setExitPage(null);
      setEnterPage(null);
      setIsAnimating(false); // 解锁，允许下次点击
    }
  };

  // 4. 计算每一张卡片的样式（位置、缩放、层级）
  const getStyle = (index: number) => {
    const isExit = index === exitPage;
    const isEnter = index === enterPage;
    const diff = index - currentPage; // 计算距离当前页的差值

    // 如果正在翻页动画中，给翻页的卡片最高层级
    if (isExit) return { zIndex: 30 };
    if (isEnter) return { zIndex: 20 };

    // 普通堆叠状态：根据 diff（距离）计算位移和缩小比例
    return {
      transform: `translate(${diff * 8}px, ${diff * 8}px) scale(${1 - Math.abs(diff) * 0.04})`,
      zIndex: 10 - Math.abs(diff),
      filter: diff !== 0 ? `brightness(${1 - Math.abs(diff) * 0.1})` : "none",
      pointerEvents: (diff === 0) ? "auto" : "none" as any, // 只有最上面那张能点
    };
  };

  if (isLoading) return <Loading text="加载中..." />;

  return (
    <div className="book-wrapper">
      <div className="book-stack">
        {PAGES.map((page, index) => {
          // 判断样式类名
          let className = "stack-card";
          if (index === exitPage) className += " card-exit";
          if (index === enterPage) className += " card-enter";

          return (
            <div
              key={page.theme}
              className={className}
              style={getStyle(index)}
              onAnimationEnd={(e) => handleAnimationEnd(e, index)}
            >
              <AdaptiveCard theme={page.theme} />
            </div>
          );
        })}
      </div>

      {/* 右侧导航标签 */}
      <div className="page-tabs">
        {PAGES.map((page, index) => (
          <button
            key={page.theme}
            className={`page-tab ${currentPage === index ? "active" : ""}`}
            style={{ "--tab-color": page.color } as React.CSSProperties}
            onClick={() => goToPage(index)}
            disabled={isAnimating}
          />
        ))}
      </div>
    </div>
  );
};

export default BookCard;