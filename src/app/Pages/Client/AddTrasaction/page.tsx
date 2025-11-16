"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type TxType = "debit" | "credit" | "transfer" | "payment" | "other";
type Channel = "online" | "branch" | "atm" | "pos" | "mobile";

const DEFAULT_API =
  typeof window !== "undefined" && "__NEXT_DATA__" in window
    ? (process.env.NEXT_PUBLIC_API_URL as string) || "http://localhost:4000/api"
    : (process?.env?.NEXT_PUBLIC_API_URL as string) || "http://localhost:4000/api";

export default function AddTransactionPage() {
  const router = useRouter();
  const [amount, setAmount] = useState<number | "">("");
  const [type, setType] = useState<TxType>("debit");
  const [channel, setChannel] = useState<Channel>("online");
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 16)); // yyyy-mm-ddThh:mm
  const [description, setDescription] = useState<string>("");
  const [balanceAfter, setBalanceAfter] = useState<number | "">("");
  const [compteSource, setCompteSource] = useState<string>("");
  const [compteDestination, setCompteDestination] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const API_URL = (process.env.NEXT_PUBLIC_API_URL as string) || DEFAULT_API;

  function validate() {
    if (amount === "" || Number.isNaN(Number(amount))) {
      alert("Please enter a valid amount");
      return false;
    }
    if (!date) {
      alert("Please select a date");
      return false;
    }
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    // Build payload according to backend expectation
    const payload = {
      date: new Date(date).toISOString(),
      amount: Number(amount),
      type,
      channel,
      description,
      balanceAfter: balanceAfter === "" ? undefined : Number(balanceAfter),
      compteSource: compteSource || undefined,
      compteDestination: compteDestination || undefined,
    };

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch(`${API_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || `HTTP ${res.status}`);
      }

      await res.json();
      // success
      alert("Transaction added successfully");
      router.push("/Transaction");
    } catch (error: unknown) {
      console.error("Add transaction error:", error);
      const message = error instanceof Error ? error.message : String(error);
      alert("Error creating transaction: " + message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen p-8">
      <main className="flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-blue-900">Add Transaction</h2>
            <Link href="/Transaction">
              <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Back to list</button>
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col">
                <span className="text-sm text-gray-600">Amount</span>
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                  className="mt-1 p-2 border rounded text-gray-900"
                  placeholder="e.g. 1250.00"
                  required
                />
              </label>

              <label className="flex flex-col">
                <span className="text-sm text-gray-600">Date & time</span>
                <input
                  type="datetime-local"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-1 p-2 border rounded text-gray-900"
                  required
                />
              </label>

              <label className="flex flex-col">
                <span className="text-sm text-gray-600">Type</span>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as TxType)}
                  className="mt-1 p-2 border rounded text-gray-900"
                >
                  <option value="debit">Debit</option>
                  <option value="credit">Credit</option>
                  <option value="transfer">Transfer</option>
                  <option value="payment">Payment</option>
                  <option value="other">Other</option>
                </select>
              </label>

              <label className="flex flex-col">
                <span className="text-sm text-gray-600">Channel</span>
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value as Channel)}
                  className="mt-1 p-2 border rounded text-gray-900"
                >
                  <option value="online">Online</option>
                  <option value="branch">Branch</option>
                  <option value="atm">ATM</option>
                  <option value="pos">POS</option>
                  <option value="mobile">Mobile</option>
                </select>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col">
                <span className="text-sm text-gray-600">Source Account (optional)</span>
                <input
                  value={compteSource}
                  onChange={(e) => setCompteSource(e.target.value)}
                  className="mt-1 p-2 border rounded text-gray-900"
                  placeholder="account id or number"
                />
              </label>

              <label className="flex flex-col">
                <span className="text-sm text-gray-600">Destination Account (optional)</span>
                <input
                  value={compteDestination}
                  onChange={(e) => setCompteDestination(e.target.value)}
                  className="mt-1 p-2 border rounded text-gray-900"
                  placeholder="account id or number"
                />
              </label>
            </div>

            <label className="flex flex-col">
              <span className="text-sm text-gray-600">Description</span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 p-2 border rounded text-gray-900"
                rows={3}
                placeholder="Optional note about the transaction"
              />
            </label>

            <label className="flex flex-col md:w-1/2">
              <span className="text-sm text-gray-600">Balance After (optional)</span>
              <input
                type="number"
                step="0.01"
                value={balanceAfter}
                onChange={(e) => setBalanceAfter(e.target.value === "" ? "" : Number(e.target.value))}
                className="mt-1 p-2 border rounded text-gray-900"
                placeholder="e.g. 5000.00"
              />
            </label>

            <div className="flex items-center gap-3 mt-4">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-600 disabled:opacity-60"
              >
                {loading ? "Saving..." : "Save Transaction"}
              </button>

              <button
                type="button"
                onClick={() => router.push("/Transaction")}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>

            {/* Preview */}
            <div className="mt-6 p-4 bg-gray-50 rounded border">
              <h4 className="font-semibold text-gray-800 mb-2">Preview</h4>
              <div className="text-gray-700">
                <p>
                  <span className="font-medium">Amount:</span> {amount === "" ? "-" : `$${Number(amount).toFixed(2)}`}
                </p>
                <p>
                  <span className="font-medium">Type:</span> {type}
                </p>
                <p>
                  <span className="font-medium">Channel:</span> {channel}
                </p>
                <p>
                  <span className="font-medium">Date:</span> {date ? new Date(date).toLocaleString() : "-"}
                </p>
                <p>
                  <span className="font-medium">Description:</span> {description || "-"}
                </p>
                <p>
                  <span className="font-medium">Balance After:</span>{" "}
                  {balanceAfter === "" ? "-" : `$${Number(balanceAfter).toFixed(2)}`}
                </p>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}