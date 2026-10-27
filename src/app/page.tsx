import Image from "next/image";
import Link from "next/link";
import SlideFrame from "@/components/SlideFrame";
import { slides } from "@/slides";
import { logout } from "./login/actions";

export default function Overview() {
  return (
    <div className="min-h-dvh">
      <header className="border-b border-navy/10 bg-white">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
          <Image src="/aiello-logo.svg" alt="aiello" width={118} height={36} priority />
          <div className="flex items-center gap-4 text-sm">
            <span className="text-navy/50">{slides.length} 張投影片 · 點選進入，Esc 返回</span>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-md px-2 py-1 text-navy/60 ring-1 ring-navy/15 transition hover:text-navy hover:ring-navy/30"
              >
                登出
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-6 py-10">
        <ol className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {slides.map((slide, i) => (
            <li key={i} id={`slide-${i + 1}`} className="scroll-mt-6">
              <Link href={`/slides/${i + 1}`} className="group block rounded-lg outline-none">
                <SlideFrame className="rounded-lg shadow-sm ring-1 ring-navy/10 transition group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:ring-2 group-hover:ring-brand group-focus-visible:ring-2 group-focus-visible:ring-brand">
                  <div className="pointer-events-none h-full">{slide.content}</div>
                </SlideFrame>
                <div className="mt-3 flex items-baseline gap-3 text-sm">
                  <span className="font-mono font-semibold text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-navy/70 group-hover:text-navy">{slide.title}</span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
}
