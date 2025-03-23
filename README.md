# API Explorer Frontend

A Next.js application built with React, TypeScript, and Tailwind CSS to query GitHub user data through multiple backend APIs. Select a backend (Node.js, FastAPI, Django, Rails, or Deno) and fetch user details like repos and stars.

## Features

- Project bootstrapped with command `npx create-next-app@latest <dir> --typescript --eslint`
- Dynamic backend selection via buttons
- GitHub username input with real-time data fetching
- Responsive UI with Tailwind CSS

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
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

- Select a backend from the buttons
- Enter a GitHub username (e.g., "octocat")
- Click "Fetch Data" to see the results

## Backends

This frontend connects to five backend APIs:

- [Node.js/Express](https://github.com/jpetrucci49/api-explorer-node)
- [Python/FastAPI](https://github.com/jpetrucci49/api-explorer-fastapi)
- [Python/Django](https://github.com/jpetrucci49/api-explorer-django)
- [Ruby/Rails](https://github.com/jpetrucci49/api-explorer-rails)
- [Deno](https://github.com/jpetrucci49/api-explorer-deno)

Run at least one backend locally for basic functionality, or all 5 backends for full functionality.

## Next Steps

- Deploy to Vercel
- Enhance UI with data visualization

---

**Built by Joseph Petrucci | March 2025**