"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SlideFrame from "./SlideFrame";
import { slides } from "@/slides";

export default function SlideViewer({ index }: { index: number }) {
  const router = useRouter();
  const total = slides.length;
  const slide = slides[index];

  useEffect(() => {
    if (index > 0) router.prefetch(`/slides/${index}`);
    if (index < total - 1) router.prefetch(`/slides/${index + 2}`);
  }, [index, total, router]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
        case " ":
          e.preventDefault();
          if (index < total - 1) router.replace(`/slides/${index + 2}`);
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          if (index > 0) router.replace(`/slides/${index}`);
          break;
        case "Escape":
          e.preventDefault();
          router.push(`/#slide-${index + 1}`);
          break;
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, total, router]);

  return (
    <div className="flex h-dvh w-full items-center justify-center bg-navy-deep">
      {/* 依視窗比例決定以寬或高為準，維持 16:9 */}
      <div className="w-[min(100vw,calc(100dvh*16/9))]">
        <SlideFrame>{slide.content}</SlideFrame>
      </div>
      <div className="fixed bottom-4 right-6 z-10 rounded-md bg-navy-deep/80 px-2 py-0.5 font-mono text-sm text-white/60">
        {index + 1} / {total}
      </div>
    </div>
  );
}
