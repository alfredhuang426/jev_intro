import { notFound } from "next/navigation";
import SlideViewer from "@/components/SlideViewer";
import { slides } from "@/slides";

// 每張投影片都已由 generateStaticParams 預先產生，直接 await params 不會拖慢換頁，
// 關掉 dev 模式下對 params 未包 Suspense 的 instant navigation 檢查
export const instant = false;

export function generateStaticParams() {
  return slides.map((_, i) => ({ n: String(i + 1) }));
}

export default async function SlidePage({ params }: PageProps<"/slides/[n]">) {
  const { n } = await params;
  const index = Number(n) - 1;
  if (!Number.isInteger(index) || index < 0 || index >= slides.length) {
    notFound();
  }
  return <SlideViewer index={index} />;
}
