// src/page/module/Coupons/index.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const Coupons: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="coupons-page">
      <div className="coupons-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← 返回
        </button>
        <h1>优惠券中心</h1>
      </div>
    </div>
  );
};

export default Coupons;