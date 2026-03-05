import React from "react";
import "./index.scss";

interface LoadingProps {
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({ text = "加载中..." }) => {
  return (
    <div className="loading-overlay">
       {text}
    </div>
  );
};

export default Loading;