"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type AuthFormProps = {
  mode: "login" | "register";
};

export default function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mounted, setMounted] = useState(false);

  const isRegister = mode === "register";

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Submitting: ${email}`);
  };

  if (!mounted) return null; // prevent SSR mismatch

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg animate-fadeIn">
        <h1 className="mb-6 text-3xl font-bold text-center text-indigo-600">
          {isRegister ? "Create Account" : "Welcome Back"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
            />
          </div>

          {isRegister && (
            <div>
              <label className="block mb-1 text-gray-600">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-md font-semibold hover:scale-105 transition-transform cursor-pointer"
          >
            {isRegister ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-500">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <Link
            href={isRegister ? "/auth/login" : "/auth/register"}
            className="text-indigo-600 font-semibold hover:underline"
          >
            {isRegister ? "Login" : "Sign Up"}
          </Link>
        </p>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button className="flex-1 rounded-md border border-indigo-300 py-2 text-white bg-indigo-400 hover:bg-indigo-600 transition cursor-pointer">
            Continue with Google
          </button>
          <button className="flex-1 rounded-md border border-indigo-300 py-2 text-white bg-indigo-400 hover:bg-indigo-600 transition cursor-pointer">
            Continue with Wallet
          </button>
        </div>
      </div>
    </div>
  );
}
