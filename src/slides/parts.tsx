import type { ReactNode } from "react";

// 投影片內容用的小元件，尺寸同樣以 1920×1080 為基準

// 以 // 開頭的行視為註解，淡色顯示
export function CodeBlock({
  title,
  code,
  small = false,
}: {
  title?: ReactNode;
  code: string;
  small?: boolean;
}) {
  return (
    <div className="flex min-h-0 flex-col overflow-hidden rounded-2xl bg-navy-deep">
      {title && (
        <div className="border-b border-white/10 px-8 py-4 text-[24px] font-semibold text-brand">{title}</div>
      )}
      <pre
        className={`px-8 py-6 font-mono leading-[1.55] text-white/90 ${small ? "text-[21px]" : "text-[24px]"}`}
      >
        {code.split("\n").map((line, i) => (
          <div key={i} className={line.trimStart().startsWith("//") ? "text-white/40" : undefined}>
            {line || " "}
          </div>
        ))}
      </pre>
    </div>
  );
}

export function Card({
  label,
  title,
  children,
  accent = false,
}: {
  label?: ReactNode;
  title: ReactNode;
  children?: ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl p-10 ${accent ? "bg-navy text-white" : "bg-brand-light text-navy"}`}
    >
      {label && <div className="font-mono text-[28px] font-semibold text-brand">{label}</div>}
      <div className="text-[44px] font-bold leading-tight">{title}</div>
      {children && (
        <div className={`text-[30px] leading-normal ${accent ? "text-white/75" : "text-navy/75"}`}>{children}</div>
      )}
    </div>
  );
}

export function Bubble({ from, children }: { from: "user" | "bot"; children: ReactNode }) {
  const isUser = from === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[680px] whitespace-pre-line rounded-3xl px-8 py-5 text-[28px] leading-normal ${
          isUser ? "rounded-br-md bg-brand text-white" : "rounded-bl-md bg-zinc-100 text-navy"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export function FlowStep({
  n,
  title,
  active = false,
  muted = false,
}: {
  n: number;
  title: ReactNode;
  active?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={`flex flex-1 flex-col items-center gap-3 rounded-2xl px-4 py-8 text-center ${
        active ? "bg-brand text-white shadow-xl ring-8 ring-brand/20" : "bg-brand-light text-navy"
      } ${muted ? "opacity-50" : ""}`}
    >
      <div className={`font-mono text-[26px] font-semibold ${active ? "text-white/80" : "text-brand"}`}>
        STEP {n}
      </div>
      <div className="text-[36px] font-bold leading-tight">{title}</div>
    </div>
  );
}

export function Arrow() {
  return <div className="shrink-0 text-[48px] text-navy/30">→</div>;
}

export function Tag({ children, tone = "brand" }: { children: ReactNode; tone?: "brand" | "navy" }) {
  return (
    <span
      className={`inline-block rounded-full px-5 py-1 text-[26px] font-semibold ${
        tone === "brand" ? "bg-brand text-white" : "bg-navy/10 text-navy"
      }`}
    >
      {children}
    </span>
  );
}
