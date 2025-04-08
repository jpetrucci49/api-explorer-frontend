# API Explorer Frontend

A Next.js application built with React, TypeScript, and Tailwind CSS to query GitHub user data through multiple backend APIs. Select a backend and fetch user details with cache status.

## Features

- Bootstrapped with `npx create-next-app@latest --typescript --eslint`.
- Dynamic backend selection (Node.js, FastAPI, Django, Rails, Deno).
- GitHub username input with real-time fetching.
- Displays cache status (`X-Cache: HIT/MISS`).
- Responsive UI with Tailwind CSS.

## Setup

1. **Clone the repo**  
    ```bash
    git clone https://github.com/jpetrucci49/api-explorer-frontend.git frontend
    cd frontend
    ```

2. **Install dependencies**  
    ```bash
    npm install
    ```

3. **Run locally**  
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser. Requires at least one backend running to see the result.

## Usage

- Select a backend (e.g., Deno at `http://localhost:3005`).
- Enter a GitHub username (e.g., "octocat").
- Click "Fetch Data" to see results and cache status.

## Backends

Connects to:
- [Node.js/Express](https://github.com/jpetrucci49/api-explorer-node) (3001)
- [FastAPI](https://github.com/jpetrucci49/api-explorer-fastapi) (3002)
- [Django](https://github.com/jpetrucci49/api-explorer-django) (3003)
- [Rails](https://github.com/jpetrucci49/api-explorer-rails) (3004)
- [Deno](https://github.com/jpetrucci49/api-explorer-deno) (3005)

## Next Steps

- Add `/analyze` support for profile insights with visualizations (e.g., language charts).
- Add `/network` support for collaboration graphs.
- Deploy to Vercel.

---

**Built by Joseph Petrucci | March 2025**