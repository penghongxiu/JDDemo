import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ProductDetailState } from "../../types";

import "./index.scss";



const ProductDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state as ProductDetailState;


  return (
    <div className="product-detail">
      <div className="detail-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← 返回
        </button>
      </div>

      <div className="detail-content">
        <div className="detail-image">
          <img src={product.img} alt={product.title || product.name} />
          {product.isSelfRun && (
            <div className="detail-tag">自营</div>
          )}
        </div>

        <div className="detail-info">
          <h1 className="detail-title">
            {product.title || product.name}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;