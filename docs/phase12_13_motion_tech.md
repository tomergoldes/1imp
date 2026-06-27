# 1IMP — Phase 12 & 13: Motion System & Technical Architecture

> **Status**: Phase 12 & 13 Complete — Awaiting approval to proceed to Phase 14 & 15

---

## PHASE 12: MOTION SYSTEM

> "Animation in 1IMP is not decoration. It is communication. 
> It tells the user where things come from, where they go, and how much they matter."

If the UI (Phase 10) is the body, the Motion System is the body language. We must avoid "jiggly" or slow animations common in bloated SaaS. Our motion is physics-informed, snappy, and purposeful.

### 12.1 Core Easing Curves (CSS)

We reject standard browser easings (`ease-in-out`). They feel mechanical. We use custom cubic-bezier curves that simulate real-world physics (mass and friction).

```css
:root {
  /* Snappy, energetic. Used for hover states and micro-interactions. */
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  /* Fast entrance, slow settlement. Used for modals and page transitions. */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  
  /* Slow start, fast exit. Used for closing/hiding elements. */
  --ease-in-expo: cubic-bezier(0.7, 0, 0.84, 0);
  
  /* The "Magic" easing. Used specifically for AI generation reveals. */
  --ease-ai-reveal: cubic-bezier(0.65, 0, 0.05, 1);
}
```

### 12.2 Durations

Motion must never make a recruiter wait. 

- **Micro (150ms)**: Button hovers, toggle switches.
- **Base (250ms)**: Card expansions, dropdowns.
- **Macro (400ms)**: Page transitions, modal entrances.
- **Choreographed (800ms - 1.2s)**: Only used once—during the initial AI profile generation sequence (The Aha Moment).

### 12.3 Key Choreographies

**The AI Generation Sequence (The Labor Illusion):**
When the user uploads their resume, we don't just flash the result. We choreograph the reveal:
1. **0ms**: Upload button morphs into a glowing "Extracting" pulse.
2. **1500ms**: The left pane (Editor) slides in from the left (`--ease-out-expo`). Data fields populate sequentially (Name -> Role -> Skills) with a stagger of 100ms each.
3. **3000ms**: The right pane (Preview) fades in from 0% to 100% opacity, scaling up slightly from 0.95 to 1.0. A subtle vertical light sweep crosses the profile card to signify completion.

**The "Regenerate" Action:**
When a user asks AI to rewrite their summary:
1. Current text fades to 30% opacity and blurs slightly (`filter: blur(2px)`).
2. The input border activates the spinning conic-gradient glow.
3. New text types out rapidly (staggered character reveal) or fades in via a horizontal wipe.

---

## PHASE 13: TECHNICAL ARCHITECTURE

> "The architecture must support two opposing forces: 
> The Editor must be highly interactive and state-heavy (Client-side).
> The Public Page must be instantly loadable and perfectly SEO/Social optimized (Server-side)."

### 13.1 The Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Framework** | Next.js (App Router) | Mandatory for the dual SSR/CSR requirement. Server components for the public pages; Client components for the Editor. |
| **Styling** | Tailwind CSS + CSS Modules | Tailwind for rapid layout; custom CSS modules for the complex glassmorphism and glow effects defined in Phase 11. |
| **Animation** | Framer Motion | Necessary for the complex orchestrations and layout transitions (e.g., the split-screen reveal) that CSS alone cannot handle cleanly. |
| **Database/Auth** | Supabase (PostgreSQL) | Instant APIs, Row Level Security (RLS) for protecting candidate data, and built-in OAuth providers. |
| **State Management**| Zustand + React Query | Zustand for the Editor's complex UI state (split-screen toggles); React Query for server state and caching. |
| **File Storage** | AWS S3 / Supabase Storage | For storing original PDF resumes and profile images. |
| **AI Layer** | OpenAI (GPT-4o / GPT-4o-mini) | Required for parsing unstructured resumes and generating high-quality narrative summaries. |

### 13.2 System Architecture Diagram (Conceptual)

```text
[ Candidate Client (Browser) ] ──(Zustand State)──> [ Split-Screen Editor ]
        │                                                  │
   (Uploads PDF)                                     (Auto-saves JSON)
        │                                                  │
        ▼                                                  ▼
[ Next.js API Routes (Serverless) ] <──────────────> [ Supabase (PostgreSQL) ]
        │                                                  │
  (Sends PDF Buffer)                                 (Stores Profile Data)
        │
        ▼
[ OpenAI API ] ──(Returns Structured JSON + Summary Narrative)
```

### 13.3 Critical Technical Constraints & Solutions

**Challenge 1: The Viral Loop (Open Graph Previews)**
- *Problem*: When a candidate shares their link on LinkedIn, LinkedIn's crawler must see an image and metadata representing the candidate. It does not run JavaScript.
- *Solution*: The `/[username]` route in Next.js MUST be a Server Component. We will dynamically generate the Open Graph image using Next.js `ImageResponse` (`@vercel/og`) based on the candidate's actual data (Name, Role, Photo).

**Challenge 2: The Live Mirror (Editor Performance)**
- *Problem*: The left pane and right pane in the Editor must stay perfectly synchronized without causing layout thrashing or lag as the user types.
- *Solution*: The right pane (Preview) is a read-only React component that subscribes to the same Zustand store as the left pane inputs. No database round-trips are required for the preview to update. Database auto-saves are debounced (1.5 seconds) in the background.

**Challenge 3: AI Parsing Speed vs Quality**
- *Problem*: PDF extraction can be slow. Users bounce if loading takes > 10 seconds.
- *Solution*: We use a fast text-extraction library (e.g., `pdf2json` or `pdf-parse`) on the Node.js backend first. We send the *raw text* (not the file) to GPT-4o-mini with a strict JSON schema to parse into structure. This reduces the AI payload and processing time to ~3-4 seconds.

---

## Phase 12 & 13 Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Animation Library | Framer Motion | CSS is insufficient for the staggered, layout-aware choreography required for the "Aha Moment" reveal. |
| Core Framework | Next.js | Only framework that seamlessly handles highly interactive client apps (Editor) AND edge-rendered SSR pages (Public Profiles). |
| Database/Backend | Supabase | Postgres + Auth + Storage out of the box allows us to hit the 8-week MVP target. |
| State Management | Zustand | Redux is too heavy; Context API will cause re-render thrashing in the dual-pane editor. Zustand is fast and minimal. |
| OG Image Generation | `@vercel/og` | Dynamically generating a personalized social card for every candidate is the single biggest driver of click-through rate for the viral loop. |

---

> **Awaiting approval to proceed to Phase 14 & 15: Database Design & AI Architecture**
>
> In the next phases, we will define the exact Postgres schema required to support flexible profiles, and we will architect the specific LLM prompts and pipelines that turn a messy PDF into a premium impression.
