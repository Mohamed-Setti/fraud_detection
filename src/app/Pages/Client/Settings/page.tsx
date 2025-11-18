"use client";
import React, { useEffect, useState } from "react";

type User = {
  name: string;
  email: string;
  mobile: string;
};

export default function Settings() {
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return;

    const u: User = JSON.parse(stored);

    React.startTransition(() => {
      setUser(u);
      setForm({
        name: u.name,
        email: u.email,
        mobile: u.mobile,
        password: "",
      });
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/auth/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) return setMessage(data.error || "Failed to update");

      // Update local user
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);

      setMessage("Updated successfully!");
    } catch (error: unknown) {
        console.error("Update error:", error);
        const message = error instanceof Error ? error.message : String(error);
        alert("Error updating user: " + message);
    }
  };

  if (!user) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 text-gray-900">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="space-y-4">
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Name"
        />

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Email"
        />

        <input
          name="mobile"
          type="text"
          value={form.mobile}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Mobile"
        />

        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="New password (optional)"
        />

        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Save Changes
        </button>

        {message && (
          <p className="text-center text-sm mt-4 text-green-600">{message}</p>
        )}
      </div>
    </div>
  );
}
