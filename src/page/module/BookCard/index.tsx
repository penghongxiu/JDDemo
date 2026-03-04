// src/module/BookCard/index.tsx
import React, { useState, useEffect } from "react";
import AdaptiveCard, { CardTheme } from "../AdaptiveCard";
import Loading from "src/component/Loading";
import "./index.scss";

const PAGES: { theme: CardTheme; label: string; color: string }[] = [
  { theme: "blue",   label: "蓝", color: "#397FFF" },
  { theme: "green",  label: "绿", color: "#2ECC71" },
  { theme: "yellow", label: "黄", color: "#F5A623" },
];

const BookCard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [animating, setAnimating]     = useState(false);
  const [exitPage, setExitPage]       = useState<number | null>(null);
  const [enterPage, setEnterPage]     = useState<number | null>(null);
  const [loading, setLoading]         = useState(true); 

  // 预加载所有图片
  useEffect(() => {
    const imagesToLoad = [
      // Banner 图片
      "/src/assets/img/single/image1.png",
      "/src/assets/img/single/image2.png",
      "/src/assets/img/single/image3.png",
      "/src/assets/img/single/image4.png",
      "/src/assets/img/single/image5.png",
      "/src/assets/img/single/image6.png",
      // Grid 图片
      "/src/assets/img/grid/image1.png",
      "/src/assets/img/grid/image2.png",
      "/src/assets/img/grid/image3.png",
      "/src/assets/img/grid/image4.png",
      "/src/assets/img/grid/image5.png",
      "/src/assets/img/grid/image6.png",
      "/src/assets/img/grid/image7.png",
      "/src/assets/img/grid/image8.png",
      "/src/assets/img/grid/image9.png",
      "/src/assets/img/grid/image10.png",
      "/src/assets/img/grid/image11.png",
      "/src/assets/img/grid/image12.png",
    ];

    let loadedCount = 0;
    const totalImages = imagesToLoad.length;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        // 所有图片加载完成，延迟 500ms 后隐藏 loading
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    // 预加载图片
    imagesToLoad.forEach((src) => {
      const img = new Image();
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded;  // 即使加载失败也继续
      img.src = src;
    });

    // 兜底：最多等待 3 秒，超时也隐藏 loading
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const goToPage = (target: number) => {
    if (animating || target === currentPage) return;
    setExitPage(currentPage);
    setEnterPage(target);
    setAnimating(true);

    setTimeout(() => {
      setCurrentPage(target);
      setExitPage(null);
      setEnterPage(null);
      setAnimating(false);
    }, 700);
  };

  //加载中显示 Loading 组件
  if (loading) {
    return <Loading text="精彩内容加载中..." />;
  }

  return (
    <div className="book-wrapper">
      <div className="book-stack">
        {PAGES.map((page, index) => {
          const isExit  = index === exitPage;
          const isEnter = index === enterPage;
          const diff    = index - currentPage;

          let className = "stack-card";
          if (isExit)  className += " card-exit";
          if (isEnter) className += " card-enter";

          const style: React.CSSProperties = isExit || isEnter
            ? { zIndex: isExit ? 30 : 20 }
            : {
                transform: `translate(${diff * 8}px, ${diff * 8}px) scale(${1 - Math.abs(diff) * 0.04})`,
                zIndex: 10 - Math.abs(diff),
                filter: diff !== 0
                  ? `brightness(${1 - Math.abs(diff) * 0.1})`
                  : "none",
              };

          return (
            <div key={page.theme} className={className} style={style}>
              <AdaptiveCard theme={page.theme} />
            </div>
          );
        })}
      </div>

      {/* 右上角书签 */}
      <div className="page-tabs">
        {PAGES.map((page, index) => (
          <button
            key={page.theme}
            className={`page-tab ${currentPage === index ? "active" : ""}`}
            style={{ "--tab-color": page.color } as React.CSSProperties}
            onClick={() => goToPage(index)}
            disabled={animating}
          >
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookCard;