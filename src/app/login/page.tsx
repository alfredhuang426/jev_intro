import Image from "next/image";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-brand-light/40 px-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-sm ring-1 ring-navy/10">
        <Image src="/aiello-logo.svg" alt="aiello" width={118} height={36} priority />
        <h1 className="mt-6 mb-6 text-lg font-semibold text-navy">登入以檢視投影片</h1>
        <LoginForm />
      </div>
    </main>
  );
}
