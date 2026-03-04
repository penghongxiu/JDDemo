// src/components/Loading/index.tsx
import React from "react";
import "./index.scss";

interface LoadingProps {
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({ text = "加载中..." }) => {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        {/* 书本翻页动画 */}
        <div className="book-loader">
          <div className="book-page page-1"></div>
          <div className="book-page page-2"></div>
          <div className="book-page page-3"></div>
        </div>
        <p className="loading-text">{text}</p>
      </div>
    </div>
  );
};

export default Loading;