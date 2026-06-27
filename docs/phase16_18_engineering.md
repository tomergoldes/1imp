# 1IMP — Phase 16, 17 & 18: Engineering Execution Strategy

> **Status**: Phase 16, 17 & 18 Complete — Awaiting approval to proceed to Phase 19+ (Business & Growth)

---

## The VP Engineering's Mandate

> "Startups do not die because they chose the wrong Javascript framework. 
> They die because they build too much, too slowly. 
> We are optimizing for two things: Developer Velocity to get to MVP, and Architectural Flexibility to pivot when we learn."

This document breaks down the execution plan for the Frontend, Backend, and Authentication layers.

---

## PHASE 16: BACKEND EXECUTION

We are adopting a "Backend-as-a-Service (BaaS) First" approach. Supabase handles the heavy lifting (DB, Auth, Storage), while Next.js Serverless Functions act as the intelligent middleware.

### 16.1 The API Layer (Next.js Route Handlers)

We need exactly four core API groups for MVP:

**1. Content Extraction API (`/api/parse-resume`)**
- Receives: PDF file stream.
- Action: Extracts text -> Calls OpenAI GPT-4o-mini with JSON schema.
- Returns: Structured JSON.
- *Constraint*: Must return within Vercel's 10-second serverless timeout limit (or run as an Edge function if necessary).

**2. Profile Management API (`/api/profile/[id]`)**
- Receives: Partial profile updates (Zustand auto-save payloads).
- Action: Validates session -> Updates Supabase.
- Returns: 200 OK.

**3. AI Generation API (`/api/generate-summary`)**
- Receives: Extracted JSON + Target Role + User instructions (if any).
- Action: Calls OpenAI GPT-4o -> Streams response back to client.
- Returns: Server-Sent Events (SSE) stream.
- *Constraint*: Streaming is mandatory to reduce perceived wait time.

**4. Analytics API (`/api/track-view`)**
- Receives: `profile_id`, anonymized IP hash, User-Agent.
- Action: Writes to `analytics_events` table (fire and forget).
- Returns: 204 No Content.

### 16.2 Background Jobs & Webhooks

MVP requires minimal background processing, but we need one critical webhook:
- **Supabase Auth Webhook**: Listens for `user_created` events. Automatically inserts a blank row into the `profiles` table linked to the new `user_id`.

---

## PHASE 17: FRONTEND EXECUTION

The Frontend is a Next.js (App Router) application. It is fundamentally split into two distinct rendering strategies.

### 17.1 Component Architecture

We will use a highly modular atomic design pattern.

**Base UI Components (Dumb):**
- `Button` (Ghost, Solid, Destructive)
- `Input` (Text, Textarea, with "AI Sparkle" variant)
- `Card` (Glassmorphism wrapper)
- `SkillPill` (Tag component)

**Feature Components (Smart):**
- `EditorWorkspace` (Manages Zustand state syncing)
- `AiGenerator` (Handles streaming text and loading animations)
- `PublicProfileView` (The pure render of the final product)

### 17.2 Rendering Strategy Matrix

| Route | Type | Rendering | Rationale |
|-------|------|-----------|-----------|
| `/` (Landing) | Static | SSG | Maximum SEO and load speed. |
| `/login`, `/signup`| Static | SSG | Fast time-to-interactive. |
| `/dashboard/*` | App | CSR | Highly interactive Editor workspace. Requires instant client-side state updates. SEO is irrelevant here. |
| `/p/[slug]` | Public | ISR / SSR | The Impression Page. Must have Server-Side Rendering to inject Open Graph tags dynamically for LinkedIn/Twitter crawlers. |

### 17.3 The Zustand State Store (The Editor's Heart)

The Editor is complex. We will use a single Zustand store to manage the draft state.

```javascript
// Conceptual Store Schema
const useProfileStore = create((set) => ({
  profileData: null,          // The current edited state
  savedState: null,           // The last DB-confirmed state
  isSaving: false,            // Sync status UI indicator
  isAIGenerating: false,      // "Magic" UI indicator
  
  updateField: (field, value) => set(...), // Debounced DB sync triggered here
  regenerateSummary: () => {...}           // Calls streaming API
}))
```

---

## PHASE 18: AUTHENTICATION & SECURITY

Authentication is handled entirely via Supabase Auth, wrapped in Next.js Server Actions for secure session management.

### 18.1 Auth Flows

**1. Candidate Signup/Login**
- Email/Password (Magic Link fallback).
- Google OAuth (Lowest friction).
- LinkedIn OAuth (Important for importing data later in v1.5).

**2. Recruiter Viewing (The "Anti-Auth" Flow)**
- Recruiters **never** hit an auth wall.
- The `profiles` table RLS allows anonymous reads.

### 18.2 Session Handling

- We use secure, HTTP-only cookies to store the Supabase session token.
- **Route Protection**: Next.js Middleware (`middleware.ts`) intercepts all requests to `/dashboard/*`. If no valid session cookie exists, it redirects to `/login`.

### 18.3 Data Privacy & Protection

1. **Storage Security**: Resumes uploaded to Supabase Storage are placed in a `private` bucket. They are only served via a signed URL that expires in 60 minutes when a recruiter clicks "Download PDF".
2. **Scraping Protection**: The public `/[slug]` routes will implement basic rate-limiting (via Vercel/Upstash) to prevent competitors from scraping our user base.
3. **Draft Privacy**: A profile is inherently `is_public: false` until the user explicitly hits "Publish".

---

## Phase 16, 17 & 18 Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Auth Provider | Supabase Auth | Deeply integrated with Postgres RLS. Eliminates the need for a separate Auth0/Clerk subscription at MVP. |
| AI API Strategy | Server-Sent Events (Streaming) | Waiting 4 seconds for a block of text feels broken. Streaming the text token-by-token (like ChatGPT) feels intelligent and fast. |
| Resume Storage | Private Bucket + Signed URLs | Public buckets are a massive security risk. Generating signed on-demand URLs protects candidate privacy while enabling recruiter downloads. |
| Frontend Rendering | SSR for Public, CSR for Editor | Hybrid approach leverages Next.js perfectly. Fast UI for editing, perfect SEO/Social for sharing. |

---

> **Awaiting approval to proceed to Phase 19, 20 & 21: Analytics, Pricing, & Growth**
>
> With the product engineered on paper, we now shift to the business side: How we measure success, how we charge money, and how we hack distribution.
