// src/components/CounterSection/index.tsx
import React, { useState, useEffect, useRef } from "react";

import "./index.scss";
export interface CounterSectionProps {
  from?: number;
  to?: number;
  duration?: number;
  suffix?: string;
  label?: string;
}


const CounterSection: React.FC<CounterSectionProps> = ({
  from = 1,
  to = 100,
  duration = 3000,
  suffix = "元",
}) => {
  const [count, setCount] = useState<number>(from);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);


  const easeOutExpo = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};
  useEffect(() => {
    startTimeRef.current = null;
    setCount(from);
    setIsFinished(false);

    // 先取消上一轮动画
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    const delay = setTimeout(() => {
      const animate = (timestamp: number): void => {
        if (!startTimeRef.current) {
          startTimeRef.current = timestamp;
        }

        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutExpo(progress);
        const currentCount = Math.round(from + (to - from) * easedProgress);

        setCount(currentCount);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          setCount(to);
          setIsFinished(true);
          rafRef.current = null;
        }
      };

      rafRef.current = requestAnimationFrame(animate);
    }, 150);

    return () => {
      clearTimeout(delay);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [from, to, duration]);

  return (
    <div className="counter-section">
        <div className="counter-content">
          <div className={`counter-number ${isFinished ? "finished" : ""}`}>
            <span className="number-value">{count}</span>
            <span className="number-suffix">{suffix}</span>
          </div>
        </div>
    </div>
  );
};

export default CounterSection;
