"use client";
import { useState } from "react";
import { GitHubUser } from "../types/Github"

export default function Home() {
  const [backend, setBackend] = useState("node");
  const [username, setUsername] = useState("");
  const [data, setData] = useState<GitHubUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  // backends planned, but not yet built.
  const backends = [
    { id: "node", label: "Node.js", url: "http://localhost:3001" },
    { id: "fastapi", label: "FastAPI", url: "http://localhost:3002" },
    { id: "django", label: "Django", url: "http://localhost:3003" },
    { id: "rails", label: "Rails", url: "http://localhost:3004" },
    { id: "deno", label: "Deno", url: "http://localhost:3005" },
  ];

  const fetchData = async () => {
    const selectedBackend = backends.find((b) => b.id === backend);
    if (!selectedBackend) return;

    try {
      setError(null); // Clear previous error
      setData(null); // Clear previous data

      // Request backend route `/github` with query param ?username={inputField}
      const res = await fetch(`${selectedBackend.url}/github?username=${username}`);
      if (!res.ok) {
        // backends will return custom errors on 400 status codes, just throw for now.
        throw new Error("Failed to fetch data");
      }
      const result = await res.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center tracking-tight">
          API Explorer
        </h1>

        <div className="flex flex-wrap justify-center gap-3">
          {backends.map((b) => (
            <button
              key={b.id}
              onClick={() => setBackend(b.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                backend === b.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            className="flex-1 p-3 text-lg border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
          />
          <button
            onClick={fetchData}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Fetch Data
          </button>
        </div>

        {error && (
          <p className="text-red-600 text-lg font-medium">{error}</p>
        )}
        {data && (
          <pre className="p-4 bg-gray-800 text-gray-100 rounded-md text-sm font-mono overflow-auto shadow-md">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </main>
  );
}