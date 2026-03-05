/** 轮播项的基础数据结构 */
export interface SwiperItem {
  id: string | number;
  [key: string]: any; // 支持传入其他任意业务字段
}

/** 布局模式：single（一屏一个）、grid（一屏四个网格） */
export type SwiperLayoutMode = "single" | "grid";

/** 组件属性定义 */
export interface SwiperSectionProps<T extends SwiperItem> {
  items: T[]; // 数据源
  mode?: SwiperLayoutMode; // 布局模式
  renderItem: (item: T, index: number) => React.ReactNode; // 子项渲染函数（外部控制 UI）
  autoPlay?: boolean | number; // 是否自动播放，或指定延迟毫秒数
  loop?: boolean; // 是否循环滚动
  showIndicator?: boolean; // 是否显示底部指示点
  showArrows?: boolean; // 是否显示左右切换箭头
  onChange?: (index: number) => void; // 切换时的回调
  onItemClick?: (item: T, index: number) => void; // 点击项的回调
  className?: string; // 自定义类名
  gridGap?: number; // 网格间距（仅在 grid 模式有效）
}