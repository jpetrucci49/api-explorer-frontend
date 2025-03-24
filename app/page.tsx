"use client";
import { useState } from "react";

export default function Home() {
  const [backend, setBackend] = useState("node");
  const [username, setUsername] = useState("");
  const [data, setData] = useState<any>(null);
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
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">API Explorer</h1>

        <div className="flex flex-wrap gap-2 mb-4">
          {backends.map((b) => (
            <button
              key={b.id}
              onClick={() => setBackend(b.id)}
              className={`px-4 py-2 rounded ${
                backend === b.id ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={fetchData}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Fetch Data
        </button>

        {error && <p className="mt-4 text-red-500">{error}</p>}
        {data && (
          <pre className="mt-4 p-4 bg-white rounded shadow overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </main>
  );
}
