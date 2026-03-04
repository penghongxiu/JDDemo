import React, { useState, useEffect, useRef } from "react";
import "./index.scss";

// 定义组件接收的属性类型
export interface CounterSectionProps {
  from?: number;       // 计数起始值，默认1
  to?: number;         // 计数目标值，默认100
  duration?: number;   // 计数动画时长(毫秒)，默认3000
  suffix?: string;     // 数字后缀（如单位），默认"元"
  label?: string;      // 计数标签（未在组件中使用，保留扩展）
}

/**
 * 数字滚动计数组件
 * 功能：从指定起始值平滑滚动到目标值，支持自定义时长和后缀
 * 动画曲线：使用缓出指数曲线，让滚动效果更自然
 */
const CounterSection: React.FC<CounterSectionProps> = ({
  from = 1,
  to = 100,
  duration = 3000,
  suffix = "元",
}) => {
  // 当前显示的计数值
  const [count, setCount] = useState<number>(from);
  // 动画是否完成标识
  const [isFinished, setIsFinished] = useState<boolean>(false);
  // 存储requestAnimationFrame的ID，用于取消动画
  const rafRef = useRef<number | null>(null);
  // 存储动画开始的时间戳
  const startTimeRef = useRef<number | null>(null);

  /**
   * 缓出指数动画曲线函数
   * @param t 动画进度(0-1)
   * @returns 缓动后的进度值，让动画先快后慢，更自然
   */
  const easeOutExpo = (t: number): number => {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  };

  // 核心动画逻辑：监听from/to/duration变化，重新执行计数动画
  useEffect(() => {
    // 重置状态：回到起始值，标记动画未完成
    startTimeRef.current = null;
    setCount(from);
    setIsFinished(false);

    // 取消上一轮未完成的动画，避免多个动画同时执行
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    // 延迟150ms执行动画，避免页面初始化时动画过于突兀
    const delay = setTimeout(() => {
      /**
       * 动画帧执行函数
       * @param timestamp requestAnimationFrame传入的当前时间戳
       */
      const animate = (timestamp: number): void => {
        // 初始化动画开始时间
        if (!startTimeRef.current) {
          startTimeRef.current = timestamp;
        }

        // 计算已过去的时间、动画进度（0-1）
        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1); // 进度限制在0-1之间
        const easedProgress = easeOutExpo(progress); // 应用缓动曲线
        // 计算当前应显示的计数值（四舍五入取整）
        const currentCount = Math.round(from + (to - from) * easedProgress);

        // 更新显示的计数值
        setCount(currentCount);

        // 动画未完成：继续请求下一帧
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          // 动画完成：修正为目标值，标记完成状态，清空动画ID
          setCount(to);
          setIsFinished(true);
          rafRef.current = null;
        }
      };

      // 启动第一帧动画
      rafRef.current = requestAnimationFrame(animate);
    }, 150);

    // 组件卸载/依赖变化时：清除延迟器、取消未完成的动画，防止内存泄漏
    return () => {
      clearTimeout(delay);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [from, to, duration]); // 依赖：起始值、目标值、动画时长变化时重新执行

  // 组件渲染：展示当前计数值和后缀
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