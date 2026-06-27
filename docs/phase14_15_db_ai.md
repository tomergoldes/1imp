# 1IMP — Phase 14 & 15: Database Design & AI Architecture

> **Status**: Phase 14 & 15 Complete — Awaiting approval to proceed to Phase 16, 17 & 18 (Engineering)

---

## PHASE 14: DATABASE DESIGN

> "The database is not just a storage locker. It is the blueprint of the company's reality.
> It must optimize for the Recruiter's speed (Reads) while protecting the Candidate's flexibility (Writes)."

We are using PostgreSQL (via Supabase) for its relational integrity, JSONB support for flexible data, and Row Level Security (RLS) to enforce privacy at the database layer.

### 14.1 Core Relational Schema

**1. `users` Table (Auth & Account)**
- `id` (UUID, PK) - Links to Supabase Auth.
- `email` (String, Unique)
- `created_at` (Timestamp)
- `subscription_tier` (Enum: 'free', 'pro') - Future-proofing for monetization.
- *Notes: Minimal data here. Only account-level information.*

**2. `profiles` Table (The Core Impression)**
- `id` (UUID, PK)
- `user_id` (UUID, FK -> users.id)
- `slug` (String, Unique) - e.g., "alex-chen-design". Used for `1imp.io/p/alex-chen-design`.
- `first_name` (String)
- `last_name` (String)
- `target_role` (String) - e.g., "Senior Product Designer".
- `location` (String)
- `avatar_url` (String, Nullable)
- `resume_pdf_url` (String, Nullable) - Link to S3/Supabase storage.
- `ai_summary` (Text) - The editable narrative.
- `theme_config` (JSONB) - e.g., `{"mode": "dark", "accent": "impression"}`.
- `is_public` (Boolean, Default: false) - Prevents sharing until the Quality Floor is met.
- `created_at`, `updated_at` (Timestamps)

**3. `experiences` Table (The Timeline)**
- `id` (UUID, PK)
- `profile_id` (UUID, FK -> profiles.id)
- `company_name` (String)
- `role_title` (String)
- `start_date` (Date)
- `end_date` (Date, Nullable) - Null = "Present".
- `is_current` (Boolean)
- `achievements` (JSONB array of strings) - AI-extracted, user-edited bullets.
- `sort_order` (Integer) - Allows users to manually reorder if needed.

**4. `skills` Table (The Proof)**
- `id` (UUID, PK)
- `profile_id` (UUID, FK -> profiles.id)
- `name` (String) - e.g., "Figma", "React", "User Research".
- `category` (Enum: 'core', 'technical', 'soft')
- `sort_order` (Integer)

**5. `analytics_events` Table (The Growth Engine)**
- `id` (UUID, PK)
- `profile_id` (UUID, FK -> profiles.id)
- `event_type` (Enum: 'page_view', 'resume_download', 'linkedin_click')
- `viewer_ip_hash` (String) - Hashed for anonymity, used to prevent duplicate counting.
- `created_at` (Timestamp)
- *Note: This table will grow massive. It must be indexed heavily on `profile_id`.*

### 14.2 Database Access & Security (RLS)

Security is not an afterthought. A leaked resume is a catastrophic brand failure.

- **Candidates** can `SELECT`, `UPDATE`, `INSERT`, `DELETE` rows where `user_id = auth.uid()`.
- **Public (Anonymous)** can `SELECT` from `profiles`, `experiences`, and `skills` ONLY IF `profiles.is_public = true`.
- **Public** CANNOT `SELECT` from `users` or `analytics_events`.
- **Public** can `INSERT` into `analytics_events` (via Edge API), but cannot read from it.

---

## PHASE 15: AI ARCHITECTURE

> "The AI is a translator. It translates the candidate's messy past into a structured, highly optimized pitch."

We define the exact pipeline and prompts that convert a raw PDF into the "Aha Moment".

### 15.1 The Extraction Pipeline

**Step 1: Text Ingestion**
- Candidate uploads PDF.
- Server-side Node.js function (`pdf-parse`) extracts raw text.
- *Why:* Sending raw text to the LLM is 10x faster and cheaper than sending the PDF file directly via vision models.

**Step 2: Structured Parsing (GPT-4o-mini)**
- We use the `mini` model for speed. It is extremely capable at data structuring.
- We use OpenAI's "Structured Outputs" (JSON Schema) to guarantee the response format perfectly matches our database schema.

**Prompt Snippet (System):**
```text
You are an expert technical recruiter. You are receiving raw text extracted from a resume.
Your job is to extract the candidate's experience, education, and skills exactly as requested.
Do not hallucinate or invent information. If a date or company is missing, return null.
Consolidate redundant skills (e.g., merge "React.js" and "React" into "React").
Limit experience bullets to the 3 most impactful, quantifiable achievements per role.
```

### 15.2 The Generation Pipeline (The Narrative)

**Step 3: Summary Drafting (GPT-4o)**
- We use the primary, larger model (`GPT-4o`) for the narrative generation, as nuance and tone are critical here.
- We feed it the structured JSON from Step 2, plus the user's `target_role` provided during onboarding.

**Prompt Snippet (System):**
```text
You are an elite career coach and copywriter helping a candidate land a role as a {target_role}.
Based on their provided experience, write a powerful, 2-3 sentence professional summary.

RULES:
1. Speak in the first person ("I am...", not "Alex is...").
2. NEVER use generic buzzwords like "results-driven", "synergy", or "team player".
3. Focus on specific impact, domain expertise, and what they uniquely bring to the target role.
4. The tone must be Confident, Human, and Precise.
```

### 15.3 The "Quality Floor" Evaluation

Before the "Publish" button becomes active, a lightweight background evaluation runs locally in the client.

**Rules Engine (Client-Side Check):**
1. Does the profile have at least 1 Experience entry?
2. Are there at least 4 Skills listed?
3. Is the AI Summary greater than 40 characters and fewer than 300?
4. Has a Target Role been defined?

If the check fails, the AI acts as a coach:
*Message: "Your impression is almost ready. Recruiters respond best when they see your skills clearly. Let's add at least 4 key skills to your profile."*

### 15.4 The "Regenerate" Feature (Iterative Editing)

When a candidate edits their experience text and clicks "Regenerate Summary", the AI prompt changes. It is no longer a blank slate.

**Prompt Snippet (System - Update Mode):**
```text
The candidate has updated their profile data.
Rewrite their professional summary to reflect this new information, but maintain the confident, human tone of the previous version.
If they provided specific instructions (e.g. "make it punchier"), follow them.
```

---

## Phase 14 & 15 Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Data Structure | Relational (PG) + JSONB | Hard schema for querying (users, profiles) mixed with flexible JSONB arrays (achievements, skills) allows rapid iteration without constantly migrating the database. |
| Model Routing | GPT-4o-mini (Parse) -> GPT-4o (Draft) | Optimize for speed and cost where structure is needed (parsing); optimize for intelligence and tone where prose is generated (summary). |
| Extraction Method | Text -> LLM (No Vision) | Passing raw PDF text instead of images cuts processing time from ~10s to ~3s, critical for the "Aha Moment" onboarding flow. |
| Privacy Logic | Database RLS | Enforcing public/private visibility at the database layer ensures no API bug can ever accidentally leak a private resume. |

---

> **Awaiting approval to proceed to the Execution Planning (Phase 16-18)**
>
> In the next phase grouping, we will define the Backend, Frontend, and Authentication execution steps required to actually build the platform we have designed.
