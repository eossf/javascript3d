# AGENTS.md
Last updated: 
This file provides persistent instructions and context for AI coding agents working in this repository (Cursor, Claude Code, Copilot, Gemini CLI, etc.).  
Think of it as "README for agents" — agents should read this file automatically when the repo is open.

## Project Overview
Browser-based in javascript

## Repository Structure
- `src/`                → All source code
- `AGENTS.md/`          → agents instructions
- `readme.md/`          → human instructions
- `SPECS.md/`           → specification for developping the demo, agents use this file to implement demos

## Setup & Commands (Always use these — do NOT guess)

see README.md

## Code Style & Conventions
- **Language**: TypeScript (strict mode enabled)  
- **Quotes**: single quotes, no semicolons  
- **Naming**: camelCase for variables/functions, PascalCase for components/types  
- **Imports**: Group by external → internal → relative; use @ alias for src/  
  Good: `import { OrbitControls } from '@react-three/drei'`  
  Good: `import { useTimeScale } from '@/hooks/useTimeScale'`  
- **Components**: Functional + hooks only — no class components  
- **Three.js / R3F**: Prefer drei helpers (Stars, Environment, ContactShadows, etc.) over raw three.js when possible  
- **State**: Use Zustand stores for global (timeScale, selectedBody); local useState for UI  
- **Styling**: Tailwind + shadcn/ui — no inline styles except for dynamic three.js materials  
- **Performance**: Avoid useFrame unless necessary; memoize geometries/materials; dispose on unmount  
- **No new deps** without strong justification (bundle size matters for GitHub Pages)

## Testing & Quality Rules
- No unit tests yet

## Common Gotchas & Anti-Patterns
- Do NOT commit
- Do NOT add real-time physics/gravity framework
- Do in javascript canvas
