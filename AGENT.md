# OpenCode Agent Instructions — Grand Sapphire Resorts

## 1. Primary Mandate
- **Exact Replication**: Replicate the exact layout, visual structure, color palette, typography, and micro-interactions from Google Stitch using Stitch MCP tools.
- **Root Context**: Project root contains configuration tools (`.stitch/`, `opencode.json`, `AGENT.md`).
- **Target Web App**: Next.js 14 (App Router) is located inside the `./frontend/` directory.

## 2. Stitch MCP Integration Rules
- **Direct Tool Usage**: Before generating or modifying code, query Stitch MCP tools (`list_projects`, `list_screens`, `get_screen`, `get_screen_code`).
- **Source of Truth**: Treat the HTML/Tailwind and visual tokens returned by Stitch MCP (and summarized in `.stitch/DESIGN.md`) as the canonical blueprint.
- **No Direct Copy-Pasting**: Convert raw Stitch HTML into clean, modular, reusable React components in TypeScript.

## 3. Directory Layout & Routing
- All React components **MUST** live inside `./frontend/src/components/`:
  - `frontend/src/components/ui/` (Primitives: Buttons, Glass Cards, Badges)
  - `frontend/src/components/layout/` (Navbar, Footer, Mobile Drawer)
  - `frontend/src/components/sections/` (Hero, Accommodations, Amenities, Booking CTA)
- Page routing strictly in `frontend/src/app/`.

## 4. Tech Stack & Skills
- **Framework**: Next.js 14 App Router (`frontend/src/app`)
- **Styling**: Tailwind CSS matching design tokens extracted via Stitch MCP.
- **Animations**: `framer-motion` for entry animations and scroll triggers.
- **Icons**: `lucide-react`.
- **Skills**: Activate `taste-design` (luxury aesthetic), `ui-ux-pro-max` (responsive layout), and `impeccable` (code cleanliness).