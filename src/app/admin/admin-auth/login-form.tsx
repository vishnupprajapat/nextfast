"use client";

import { useActionState } from "react";
import { adminSignIn } from "./actions";

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(adminSignIn, null);

  return (
    <form className="mt-8 space-y-6" action={formAction}>
      {state?.error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-red-800 text-sm">{state.error}</p>
        </div>
      )}

      <div className="-space-y-px rounded-md shadow-sm">
        <div>
          <label htmlFor="username" className="sr-only">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            className="relative block w-full rounded-t-md border-0 px-3 py-2 text-gray-900 ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-blue-600 focus:ring-inset sm:text-sm sm:leading-6"
            placeholder="Username"
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="relative block w-full rounded-b-md border-0 px-3 py-2 text-gray-900 ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-blue-600 focus:ring-inset sm:text-sm sm:leading-6"
            placeholder="Password"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={pending}
          className="group relative flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 font-semibold text-sm text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 disabled:opacity-50"
        >
          {pending ? "Signing in..." : "Sign in"}
        </button>
      </div>

      <div className="text-center">
        <a
          href="/"
          className="font-medium text-blue-600 text-sm hover:text-blue-500"
        >
          ← Back to website
        </a>
      </div>
    </form>
  );
}
