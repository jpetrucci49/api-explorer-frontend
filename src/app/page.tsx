"use client";
import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { GitHubUser, AnalysisData, Endpoints } from "../types";
import Spinner from "../components/Spinner"; // Adjust path as needed

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const backends = [
    { id: "node", label: "Node.js", url: "http://localhost:3001" },
    { id: "fastapi", label: "FastAPI", url: "http://localhost:3002" },
    { id: "django", label: "Django", url: "http://localhost:3003" },
    { id: "rails", label: "Rails", url: "http://localhost:3004" },
    { id: "deno", label: "Deno", url: "http://localhost:3005" },
  ] as const;

  type BackendId = typeof backends[number]["id"];

  const [backend, setBackend] = useState<BackendId>("node");
  const [username, setUsername] = useState("");
  const [endpoint, setEndpoint] = useState<Endpoints>("github");
  const [githubData, setGithubData] = useState<GitHubUser | null>(null);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cacheStatus, setCacheStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)

  const fetchData = async (targetEndpoint: Endpoints, targetBackend: BackendId, fetchUsername: string) => {
    const selectedBackend = backends.find((b) => b.id === targetBackend);
    if (!selectedBackend || !fetchUsername.trim()) return;

    try {
      setLoading(true)
      setError(null);
      setGithubData(null);
      setAnalysisData(null);
      setCacheStatus(null);

      const res = await fetch(`${selectedBackend.url}/${targetEndpoint}?username=${fetchUsername}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Failed to fetch data");
      }

      const result = await res.json()

      if (targetEndpoint === "github") setGithubData(result as GitHubUser);
      if (targetEndpoint === "analyze") setAnalysisData(result as AnalysisData);
      setCacheStatus(res.headers.get("X-Cache"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && username.trim()) {
      fetchData(endpoint, backend, username);
    }
  };

  const handleStateChange = <T,>(
    setter: React.Dispatch<React.SetStateAction<T>>,
    value: T,
    fetchEndpoint: Endpoints = endpoint,
    fetchBackend: BackendId = backend
  ) => {
    setter(value);
    const newEndpoint = setter === setEndpoint ? (value as Endpoints) : fetchEndpoint;
    const newBackend = setter === setBackend ? (value as BackendId) : fetchBackend;
    if (username.trim()) {
      fetchData(newEndpoint, newBackend, username);
    }
  };

  const chartData = analysisData
    ? {
        labels: analysisData.topLanguages.map((l) => l.lang),
        datasets: [{
          data: analysisData.topLanguages.map((l) => l.bytes),
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
          borderWidth: 1,
        }],
      }
    : null;

    const buttonClass = (isActive: boolean) =>
      `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`;

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
              onClick={() => handleStateChange(setBackend, b.id, endpoint, b.id)}
              className={buttonClass(backend === b.id)}
              disabled={loading}
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
            onKeyDown={handleKeyDown}
            placeholder="Enter GitHub username"
            className="flex-1 p-3 text-lg border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
          />
          <button
            onClick={() => fetchData(endpoint, backend, username)}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            {loading ? "Fetching..." : "Fetch Data"}
          </button>
        </div>

        <div className="flex gap-2 justify-center">
        {(["github", "analyze"] as const).map((ep) => (
            <button
              key={ep}
              onClick={() => handleStateChange(setEndpoint, ep, ep)}
              className={buttonClass(endpoint === ep)}
              disabled={loading}
            >
              {ep === "github" ? "GitHub Data" : "Profile Analysis"}
            </button>
          ))}
        </div>

        {loading && <Spinner />}
        {error && <p className="text-red-600 text-lg font-medium">{error}</p>}
        {cacheStatus && <p className="text-lightgray-600 text-lg">Cache: {cacheStatus}</p>}

        {githubData && (
          <pre className="p-4 bg-gray-800 text-gray-100 rounded-md text-sm font-mono overflow-auto shadow-md">
            {JSON.stringify(githubData, null, 2)}
          </pre>
        )}

        {analysisData && (
          <div className="space-y-4">
            <div>
              <p className="text-lg font-semibold">Login: {analysisData.login}</p>
              <p className="text-lg font-semibold">Public Repos: {analysisData.publicRepos}</p>
            </div>
            {chartData && (
              <div className="max-w-md mx-auto">
                <Pie
                  data={chartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: "top", labels: { color: "#e2e8f0"} },
                      tooltip: { callbacks: { label: (context) => `${context.label}: ${context.raw} bytes` } },
                    },
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}