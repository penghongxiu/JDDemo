import React from "react";
import "./index.scss";

const LogoSection: React.FC = () => {
  return (
    <div className="logo-section">
      <img src='src/assets/img/logo.png' alt="Brand Logo" className="logo-img" />
    </div>
  );
};

export default LogoSection;