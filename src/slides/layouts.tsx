import Image from "next/image";
import type { ReactNode } from "react";

// 所有版型都以 1920×1080 為基準撰寫

export function Logo({ height }: { height: number }) {
  return (
    <Image
      src="/aiello-logo.svg"
      alt="aiello"
      width={(height * 1232) / 375}
      height={height}
    />
  );
}

export function Mark({ height, className }: { height: number; className?: string }) {
  return (
    <Image
      src="/aiello-mark.svg"
      alt=""
      width={(height * 405) / 375}
      height={height}
      className={className}
    />
  );
}

// 封面：左側標題，右側大型犀牛圖示作為主視覺
export function CoverLayout({
  title,
  subtitle,
  meta,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <div className="relative flex h-full overflow-hidden bg-white">
      <div className="absolute -right-40 top-0 h-full w-[900px] bg-brand-light [clip-path:polygon(28%_0,100%_0,100%_100%,0_100%)]" />
      <Mark height={620} className="absolute right-[140px] top-[230px]" />

      <div className="relative flex w-[1100px] flex-col justify-between py-[120px] pl-[140px]">
        <Logo height={72} />
        <div className="flex flex-col gap-10">
          <div className="h-3 w-40 bg-brand" />
          <h1 className="text-[112px] font-bold leading-[1.1] tracking-tight text-navy">{title}</h1>
          {subtitle && <p className="text-[48px] leading-snug text-navy/60">{subtitle}</p>}
        </div>
        <div className="text-[32px] text-navy/50">{meta}</div>
      </div>
    </div>
  );
}

// 章節頁：深藍底，大章節編號與標題
export function SectionLayout({
  number,
  title,
  subtitle,
}: {
  number?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
}) {
  return (
    <div className="relative flex h-full flex-col justify-center overflow-hidden bg-navy px-[160px] text-white">
      <Mark height={900} className="absolute -bottom-[160px] -right-[120px] opacity-15" />
      <div className="relative flex flex-col gap-10">
        {number && <div className="text-[64px] font-bold text-brand">{number}</div>}
        <h2 className="text-[120px] font-bold leading-[1.1] tracking-tight">{title}</h2>
        {subtitle && <p className="text-[48px] text-white/60">{subtitle}</p>}
      </div>
    </div>
  );
}

// 內容頁：上方標題列，下方內容區，底部 logo 與頁尾
export function ContentLayout({
  title,
  eyebrow,
  children,
}: {
  title: ReactNode;
  eyebrow?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="flex h-full flex-col bg-white px-[140px] pb-[56px] pt-[80px] text-navy">
      <header className="flex flex-col gap-5">
        {eyebrow && (
          <div className="text-[32px] font-semibold uppercase tracking-widest text-brand">{eyebrow}</div>
        )}
        <div className="flex items-center gap-8">
          <div className="h-[72px] w-3 bg-brand" />
          <h2 className="text-[80px] font-bold leading-tight tracking-tight">{title}</h2>
        </div>
      </header>

      <div className="mb-10 mt-[56px] min-h-0 flex-1 text-[44px] leading-relaxed">{children}</div>

      <footer className="flex items-center justify-between border-t-2 border-navy/10 pt-6">
        <Mark height={48} />
        <span className="text-[24px] text-navy/40">aiello</span>
      </footer>
    </div>
  );
}
