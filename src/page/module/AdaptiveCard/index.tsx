// src/components/AdaptiveCard/index.tsx

import React from "react";
import "@nutui/nutui-react/dist/style.css";
import LogoSection from "src/component/LogoSection/index";
import CounterSection from "src/component/CounterSection/index";
// import SwiperSection from "src/component/SwiperSection/index";
import "./index.scss";


export interface SwiperAItem {
  icon: string;
  title: string;
  desc: string;
  value: string;
  trend: number;
}

export interface SwiperBItem {
  tag: string;
  date: string;
  title: string;
  bg: string;
  avatars: string[];
  count: number;
}
// ==================== Swiper A slide：数据统计卡 ====================
const SlideTypeA: React.FC<{ item: SwiperAItem }> = ({ item }) => (
  <div className="slide-a">
    <div className="slide-a-top">
      <span className="slide-a-icon">{item.icon}</span>
      <span className={`slide-a-trend ${item.trend > 0 ? "up" : "down"}`}>
        {item.trend > 0 ? "▲" : "▼"} {Math.abs(item.trend)}%
      </span>
    </div>
    <div className="slide-a-middle">
      <div className="slide-a-title">{item.title}</div>
      <div className="slide-a-desc">{item.desc}</div>
    </div>
    <div className="slide-a-bottom">
      <span className="slide-a-number">{item.value}</span>
    </div>
  </div>
);

// ==================== Swiper B slide：项目卡片 ====================
const SlideTypeB: React.FC<{ item: SwiperBItem }> = ({ item }) => (
  <div className="slide-b" style={{ background: item.bg }}>
    <div className="slide-b-header">
      <span className="slide-b-tag">{item.tag}</span>
      <span className="slide-b-date">{item.date}</span>
    </div>
    <div className="slide-b-title">{item.title}</div>
    <div className="slide-b-footer">
      <div className="slide-b-avatars">
        {item.avatars.map((color, i) => (
          <div
            key={i}
            className="slide-b-avatar"
            style={{
              background: color,
              marginLeft: i > 0 ? "-7px" : 0,
              zIndex: item.avatars.length - i,
            }}
          />
        ))}
      </div>
      <span className="slide-b-count">{item.count} members</span>
    </div>
  </div>
);

// ==================== 静态数据 ====================
const swiperAData: SwiperAItem[] = [
  { icon: "📈", title: "Revenue", desc: "Monthly income", value: "$12,480", trend: 12.5 },
  { icon: "👥", title: "Users",   desc: "Active users",   value: "8,240",   trend: 8.3  },
  { icon: "🛒", title: "Orders",  desc: "Total orders",   value: "3,120",   trend: -2.1 },
  { icon: "⭐", title: "Rating",  desc: "Avg score",      value: "4.9",     trend: 5.0  },
];

const swiperBData: SwiperBItem[] = [
  {
    tag: "Design",
    date: "Dec 20",
    title: "Brand Identity Redesign",
    bg: "linear-gradient(135deg, rgba(102,126,234,0.25), rgba(118,75,162,0.25))",
    avatars: ["#667eea", "#764ba2", "#f093fb"],
    count: 5,
  },
  {
    tag: "Dev",
    date: "Dec 22",
    title: "API v3 Integration",
    bg: "linear-gradient(135deg, rgba(79,172,254,0.25), rgba(0,242,254,0.25))",
    avatars: ["#4facfe", "#00f2fe", "#43e97b"],
    count: 8,
  },
  {
    tag: "Marketing",
    date: "Dec 25",
    title: "Q4 Campaign Launch",
    bg: "linear-gradient(135deg, rgba(240,147,251,0.25), rgba(245,87,108,0.25))",
    avatars: ["#f093fb", "#f5576c"],
    count: 3,
  },
];

// ==================== 主组件 ====================
const AdaptiveCard: React.FC = () => {
  return (
    <div className="adaptive-card">
      {/* 背景光晕 */}
      <div className="card-bg-deco">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* ====== 上半区域 ====== */}
      <div className="card-top">
        {/* 左上角：Logo */}
        <div className="cell cell-logo">
          <LogoSection />
        </div>
        {/* 右上角：数字动画 */}
        <div className="cell cell-counter">
          <CounterSection
            from={1}
            to={100}
            duration={1000}
            suffix="元"
          />
        </div>
      </div>

      {/* 横向分割线 */}
      <div className="divider-h" />

      {/* ====== 下半区域 ====== */}
      <div className="card-bottom">
        {/* 左下角：Swiper A */}
        <div className="cell cell-swiper">
          <p className="swiper-label">📊 Analytics</p>
          {/* <SwiperSection<SwiperAItem>
            items={swiperAData}
            autoPlay={true}
            interval={2500}
            renderSlide={(item, index) => (
              <SlideTypeA key={index} item={item} />
            )}
          /> */}
        </div>

        {/* 纵向分割线 */}
        <div className="divider-v" />

        {/* 右下角：Swiper B */}
        <div className="cell cell-swiper">
          <p className="swiper-label">🗂 Projects</p>
          {/* <SwiperSection<SwiperBItem>
            items={swiperBData}
            autoPlay={true}
            interval={3500}
            renderSlide={(item, index) => (
              <SlideTypeB key={index} item={item} />
            )}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default AdaptiveCard;
