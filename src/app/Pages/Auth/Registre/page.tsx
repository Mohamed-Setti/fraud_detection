'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Image from "next/image";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation du mot de passe
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        name, 
        email, 
        mobile, 
        role, 
        password 
      }),
    });

    const data = await res.json();

    if (res.ok) {
      router.push("./Login");
    } else {
      setMessage(data.error || "Registration failed");
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-20 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <img
          alt="Company Logo"
          src="..\..\..\shield.svg"
          className="mx-auto h-10 w-auto"
        /> */}
        <Image
            className="dark:invert w-auto h-10 mx-auto"
            src="/shield.svg"
            alt="Shield logo"
            width={150}
            height={150}
            />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          New account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSignUp} className="space-y-6">
          <div className="flex items-center gap-4">
            <label htmlFor="name" className="w-32 text-sm font-medium text-gray-900">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="email" className="w-32 text-sm font-medium text-gray-900">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="mobile" className="w-32 text-sm font-medium text-gray-900">
              Mobile
            </label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              autoComplete="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="flex-1 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="role" className="w-32 text-sm font-medium text-gray-900">
              Role
            </label>
            <select
              id="role"
              name="role"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="flex-1 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            >
              <option value="">Select a role</option>
              <option value="CLIENT">Client</option>
              <option value="TECHNICIEN">Technicien</option>
              <option value="ANALYSTE">Analyste</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="password" className="w-32 text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="confirmPassword" className="w-32 text-sm font-medium text-gray-900">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="flex-1 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>

          {message && (
            <p className="text-sm text-red-600 text-center">{message}</p>
          )}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="block text-sm/6 font-medium text-gray-900">
              You already have an account?
            </span>
            <div className="text-sm">
              <a href="./Login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Log In
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}