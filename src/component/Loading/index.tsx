import React from "react";
import "./index.scss";

interface LoadingProps {
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({ text = "内容正在加载中，请稍等..." }) => {
  return (
    <div className="loading-overlay">
       {text}
    </div>
  );
};

export default Loading;