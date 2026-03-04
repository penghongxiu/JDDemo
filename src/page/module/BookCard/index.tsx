// src/module/BookCard/index.tsx
import React, { useState } from "react";
import AdaptiveCard, { CardTheme } from "../AdaptiveCard";
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