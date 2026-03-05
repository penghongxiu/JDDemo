import React, { useState, useEffect } from "react";
import "./index.scss";

export interface CounterSectionProps {
  from?: number;
  to?: number;
  duration?: number;
  suffix?: string;
}

const CounterSection: React.FC<CounterSectionProps> = ({
  from = 1,
  to = 100,
  duration = 2000,
  suffix = "元",
}) => {
  const [count, setCount] = useState(from);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {

    let startTimestamp: number;
    let rafId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;

      // 1. 计算当前进度 (0 到 1)
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // 2. 匀速计算：起始值 + 差值 * 进度
      const currentCount = Math.floor(from + (to - from) * progress);
      
      setCount(currentCount);

      // 3. 判断是否继续
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setIsFinished(true);
      }
    };

    setIsFinished(false);
    rafId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(rafId);
  }, [from, to, duration]);

  return (
    <div className="counter-section">
      <div className={`counter-number ${isFinished ? "finished" : ""}`}>
        <span className="number-value">{count}</span>
        <span className="number-suffix">{suffix}</span>
      </div>
    </div>
  );
};

export default CounterSection;