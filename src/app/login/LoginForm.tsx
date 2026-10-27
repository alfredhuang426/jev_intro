"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

const inputClass =
  "w-full rounded-md border border-navy/15 bg-white px-3 py-2 text-navy outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm text-navy/70">
        帳號
        <input name="username" autoComplete="username" required autoFocus className={inputClass} />
      </label>
      <label className="flex flex-col gap-1.5 text-sm text-navy/70">
        密碼
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClass}
        />
      </label>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-md bg-brand px-4 py-2 font-semibold text-white transition hover:bg-brand/90 disabled:opacity-60"
      >
        {pending ? "登入中…" : "登入"}
      </button>
    </form>
  );
}
