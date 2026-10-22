"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

export const SLIDE_WIDTH = 1920;
export const SLIDE_HEIGHT = 1080;

// 以固定 1920×1080 渲染投影片，再依容器寬度等比縮放
export default function SlideFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / SLIDE_WIDTH);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative aspect-video w-full overflow-hidden text-navy ${className}`}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: SLIDE_WIDTH,
          height: SLIDE_HEIGHT,
          transform: `scale(${scale})`,
          visibility: scale ? "visible" : "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}
