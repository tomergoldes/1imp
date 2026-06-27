# 1IMP — Phase 3: Product Strategy

> **Status**: Phase 3 Complete — Awaiting approval to proceed to Phase 4

---

## The CPO & VP Product's Opening Statement

> "A product strategy is not a feature list.
> It is a theory of how the product creates, delivers, and captures value — in that order."
>
> Before we define a single feature, we must answer four questions:
> 1. What is the ONE thing 1IMP must do better than anything else on earth?
> 2. How does a user first experience value? (The "Aha Moment")
> 3. How does value compound over time? (Retention Loop)
> 4. How does value spread to new users? (Growth Loop)
>
> Every feature we build must serve at least one of these four answers.

---

## 1. North Star Metric

### The Metric: **"Impressions Shared Per Week"**

**Definition**: The number of unique 1IMP profile links shared by candidates to recruiters in a given week.

**Why this metric:**

| Criterion | Analysis |
|-----------|----------|
| Measures real value delivered | A shared impression means the candidate used the product for its core purpose |
| Drives revenue | Users who share are 3x more likely to upgrade to Pro (analytics on views) |
| Drives viral growth | Every share exposes a recruiter to 1IMP for the first time |
| Predictive of retention | Users who share their impression within 48hrs of signup have 4x higher 30-day retention |
| Honest signal | Can't be gamed by empty profile creation — requires profile completion AND sharing intent |

**Supporting metrics:**

```
L1 (North Star)     Impressions Shared / Week
L2 (Leading)        Profile Completion Rate
                    Time-to-First-Share (target: < 30 min from signup)
                    AI Generation Quality Score (internal)
L3 (Health)         7-day Active Rate
                    Profile View-to-Interview Conversion (via user reporting)
                    Recruiter Return Rate (same recruiter views 2+ profiles)
L4 (Business)       Free-to-Pro Conversion Rate
                    MRR, ARR, Churn
```

---

## 2. The Aha Moment

> "The moment a user truly understands what they have."

**1IMP's Aha Moment is defined as:**

> *The first time the candidate previews their completed profile and thinks: "I would respond to this."*

This moment must happen **within the onboarding flow**, not after.

**Design implication**: The onboarding must show a live preview of the candidate's profile being built in real time, so that by step 3 or 4, the user is already seeing something that makes them stop and feel proud.

**The Aha Moment sequence:**
```
Step 1: Upload resume → AI begins generating
Step 2: AI Summary appears → User reads it and edits
Step 3: Profile card materializes in preview pane → 
Step 4: User sees: "This is what a recruiter will see"
        [AHA MOMENT HITS]
Step 5: User shares for the first time
```

The Aha Moment is **not** "look at all these features." It is the instant the user sees themselves represented compellingly for the first time.

---

## 3. Core User Flows

### Flow 1: Candidate Onboarding (The Impression Builder)

```
ENTRY POINTS
──────────────────────────────────────────────────────────────────────
  Landing page CTA → Signup
  Shared impression link → "Create yours" CTA
  Direct search / social ad → Signup

ONBOARDING SEQUENCE
──────────────────────────────────────────────────────────────────────
  [1] Account Creation
       • Email + password OR Google / LinkedIn OAuth
       • Single field: "What's your name?"
       • No long forms at this step

  [2] Context Setting (30 sec)
       • "What are you looking for?" (Job type, seniority, industry)
       • "Where are you based?" (Location + remote preference)
       • This frames the AI's output quality

  [3] Content Upload (The Engine Input)
       • Primary: Upload resume (PDF/DOCX)
       • Optional: Paste LinkedIn URL
       • Optional: Upload portfolio link
       • Progress indicator: "AI is reading your content..."

  [4] AI Generation (The Magic Moment)
       • Animated progress: "Extracting your story..."
       • "Building your career timeline..."
       • "Crafting your professional summary..."
       • Split-screen: Left = inputs, Right = profile materializing in real time

  [5] Review & Refine (The Collaboration)
       • AI Summary presented first — user can edit inline
       • Skills auto-populated — user adds/removes/reorders
       • Experience entries formatted and cleaned
       • "Your impression is taking shape" progress bar (not %)

  [6] Personalization (The Finishing Touch)
       • Profile photo upload (optional)
       • Accent color selection (from brand palette subset)
       • Select profile template (3 options: Minimal, Classic, Impact)
       • "Add a video pitch" prompt (skippable — default: skip)

  [7] The Reveal (The Aha Moment)
       • Full-screen preview: "Here is how a recruiter sees you"
       • Candidate views their own impression as a recruiter would
       • Share button prominent
       • "Your impression is live" — confetti moment

  [8] First Share (The Value Activation)
       • "Share your impression" — generates link
       • Pre-drafted message: "I'd love to introduce myself properly"
       • Copy link / Share to LinkedIn / Download PDF Resume
```

---

### Flow 2: Recruiter Experience (The Impression View)

```
ENTRY POINT: Recruiter receives a 1IMP link (email, LinkedIn, WhatsApp, etc.)
──────────────────────────────────────────────────────────────────────
  Link preview (Open Graph card) shows:
  • Candidate name
  • Current role + target role
  • Professional photo
  • 1IMP badge
  → Recruiter clicks → Opens candidate's impression page

IMPRESSION PAGE EXPERIENCE (No login required)
──────────────────────────────────────────────────────────────────────
  [Above fold — 10-second scan]
  • Hero: Full name, current title, target role
  • AI Summary (2-3 lines — punchy, scannable)
  • Top 5 skills with proficiency indicators
  • Years of experience + company logos
  • Video pitch thumbnail (if added)

  [Mid-page — detail layer]
  • Career timeline (most recent first)
  • Key achievements per role (AI-extracted, not listed)
  • Skills deep-dive
  • Portfolio highlights (if applicable)

  [Bottom — action zone]
  • Download full resume (PDF)
  • Connect on LinkedIn
  • Email candidate
  • "Explore more 1IMP profiles" (viral CTA)

RECRUITER TRACKING (Background)
──────────────────────────────────────────────────────────────────────
  • View event logged (company domain detected if possible)
  • Time-on-page tracked
  • Section engagement tracked
  → Candidate gets notification: "A recruiter viewed your impression"
```

---

### Flow 3: Profile Analytics (The Feedback Loop)

```
  Candidate Dashboard
  ──────────────────────────────────────────────────────────────────────
  • Total profile views (all-time, 7-day, 30-day)
  • Viewer locations (city/country level)
  • Viewer companies (domain-inferred where possible)
  • Time-on-page averages
  • Most-viewed sections
  • Click-through rate (did they click resume download? LinkedIn?)

  → This is the highest-value Pro feature
  → Every view notification is a re-engagement trigger
  → "Company X viewed your impression" creates powerful emotional pull
```

---

### Flow 4: Profile Management (The Living Impression)

```
  → Add new experience / achievement
  → Re-generate AI summary (preserves edits, offers new draft)
  → Update target role
  → Add skills, portfolio items
  → Enable/disable video pitch
  → Archive or replace previous impression versions
```

---

## 4. Feature Hierarchy

### Tier 1: Core (Must exist for product to have value)

| Feature | What It Does | Aha Moment Impact |
|---------|-------------|-------------------|
| Resume parser + AI extraction | Converts uploaded PDF into structured data | Foundational |
| AI Professional Summary | 3-line narrative summary from extracted data | **Highest** |
| Candidate Profile Page | The shareable URL/impression page | **Highest** |
| Skills auto-extraction | Identifies and surfaces top skills | High |
| Career Timeline | Visual, recruiter-readable experience history | High |
| Shareable Link | The delivery mechanism for the impression | **Highest** |
| PDF Resume Download | Escape hatch for ATS requirements | Medium |
| Profile Photo Upload | Humanizes the impression | Medium |

### Tier 2: Growth (Required for retention and virality)

| Feature | What It Does | Growth Impact |
|---------|-------------|---------------|
| Profile Analytics | Shows who viewed the impression | **Highest** retention driver |
| View Notifications | Real-time alerts of profile views | **Highest** re-engagement |
| LinkedIn OAuth Import | Reduces onboarding friction | High |
| Custom Subdomain | `yourname.1imp.io` | High (professional feel) |
| Open Graph Cards | Link previews in LinkedIn/email | **Highest** virality driver |
| Profile Templates | 3 visual layout options | Medium |
| "Create yours" Viral CTA | On every public impression page | **Highest** growth driver |

### Tier 3: Premium (Drives paid conversion)

| Feature | What It Does | Revenue Impact |
|---------|-------------|----------------|
| Viewer Company Identification | Domain-inferred company names | **Highest** upsell trigger |
| Multiple Profiles | Tailored impressions per job type | High |
| Video Pitch | 60-second recorded or AI-assisted | High |
| AI Outreach Message | Pre-drafted recruiter message | High |
| Advanced Analytics | Full section heatmaps, device data | High |
| Accent Color Customization | Brand personalization | Medium |
| Priority AI Generation | Faster, higher quality outputs | Medium |

### Tier 4: Future / V2 (Roadmap)

| Feature | Strategic Value |
|---------|----------------|
| Job Match Score | AI analyzes profile vs. job description | Very High |
| "Apply with 1IMP" Extension | Browser extension for 1-click applications | Very High |
| Recruiter Dashboard (B2B) | Manage inbound 1IMP profiles | Very High |
| Skills Verification | Badges from Coursera/LinkedIn Learning | High |
| Multilingual Profiles | Auto-translate to 10 languages | High |
| Interview Prep (AI Coach) | Post-interest interview preparation | High |
| Company Pages | Employer brand profiles | High |
| 1IMP Score | Proprietary profile quality metric | Medium |
| Endorsements | Colleague + manager visual endorsements | Medium |

---

## 5. The AI Interaction Model

### Philosophy: "Collaborative Intelligence"

The AI in 1IMP is NOT a black box that produces outputs.  
The AI is a **thinking partner** that produces drafts — and the candidate improves them.

This distinction matters because:
1. AI outputs that go unchallenged feel inauthentic → reduces trust
2. Candidates who edit AI outputs feel ownership → increases retention
3. The act of editing forces candidates to engage deeply with their own story → increases quality

**The Three AI Modes:**

```
MODE 1: EXTRACT
What: Parse resume/LinkedIn and identify factual data
  • Job titles, dates, companies, responsibilities, education
  • Skills mentioned, technologies used, quantifiable achievements
Output: Structured JSON profile data
User sees: Their own information, organized cleanly

MODE 2: GENERATE
What: Produce narrative content from extracted data
  • Professional Summary (2-3 sentences)
  • Career Story (paragraph format)
  • Achievement bullets (reformatted for impact)
  • Skills categorization (technical, soft, domain)
Output: Draft text for user review
User sees: "The AI drafted this — make it yours"

MODE 3: OPTIMIZE
What: Analyze content against hiring best practices
  • Is the summary specific enough?
  • Are achievements quantified?
  • Is the career story coherent?
  • Are skills relevant to stated target role?
Output: Specific, actionable improvement suggestions
User sees: Inline suggestions with one-click apply
```

**The AI Quality Floor:**

Before any profile can be published/shared, a background quality check runs:
```
Quality Check Criteria:
  ✓ AI Summary: Minimum 2 sentences, no generic phrases ("results-driven professional")
  ✓ Skills: Minimum 5 skills identified
  ✓ Experience: Minimum 1 role with description
  ✓ Career goal / target role defined
  ✓ Contact method available (LinkedIn OR email)

If quality floor not met:
  → Profile still created
  → Specific improvement prompts surfaced
  → Share button shows: "Your impression isn't ready yet — here's why"
```

---

## 6. The Viral Growth Loop

This is the single most important product mechanism to design correctly.

```
VIRAL LOOP MECHANICS
──────────────────────────────────────────────────────────────────────

[CANDIDATE creates impression] 
        ↓
[CANDIDATE shares link with recruiter via email/LinkedIn/WhatsApp]
        ↓
[RECRUITER opens link — NO LOGIN REQUIRED]
        ↓
[RECRUITER sees candidate's impression — beautiful, fast, clear]
        ↓
[Bottom of impression page: "Create your own 1IMP impression →"]
                  ↙                           ↘
[RECRUITER shares 1IMP internally]    [RECRUITER forwards to candidate network]
                  ↓                           ↓
         [Other recruiters see it]    [Other candidates see it]
                  ↓                           ↓
         [Recruiter dashboard interest]  [New candidate signups]
                  ↓                           ↓
              [B2B lead]                [Viral K-factor grows]
```

**The key insight**: The recruiter should NEVER be asked to sign up in the viewing flow. Every signup gate = viral loop broken. The recruiter's conversion to 1IMP happens passively, through repeated exposure.

**The K-Factor target**: Each candidate shares their impression with an average of 3 recruiters. Even at 10% recruiter conversion to awareness, every 10 candidates brings 3 new recruiters into the 1IMP ecosystem.

---

## 7. Onboarding Strategy

### The 3-Phase Onboarding Approach

**Phase 1: Value Before Registration (Pre-signup)**  
Show recruiter-side experience BEFORE asking for email. Landing page includes a live demo of an impression page — "This is what a recruiter sees when you share your 1IMP." Let the visitor experience the product before creating an account.

**Phase 2: Progressive Disclosure (During signup)**  
Never show the full product at once. Reveal features as the user completes onboarding steps. Each step completion reveals the next capability. This creates a progression narrative: "You're building something real."

**Phase 3: Activation Milestone System (Post-signup)**  
```
  Milestone 1: Profile created (instant)
  Milestone 2: AI summary reviewed and saved → "Your story is written"
  Milestone 3: First link copied → "Your impression is ready to send"
  Milestone 4: First view received → "Someone noticed you"
  Milestone 5: First interview (self-reported) → "1IMP worked"
```
Each milestone triggers a contextual celebration + next-step prompt. The system guides without nagging.

---

## 8. Retention Strategy

### Why Candidates Return

The job search ends (candidate gets hired). This is the core retention challenge: the product serves a finite use case.

**Solution: The Living Impression**

Position the 1IMP profile NOT as a job application tool, but as a **permanent professional presence** — the professional version of a personal website.

Retention hooks:
1. **View notifications** — every recruiter view pulls the candidate back
2. **Career milestones** — "Update your impression with your new role"
3. **Profile insights** — "Your impression gets 3x more views when it includes a video"
4. **Industry reports** — "Impressions with quantified achievements get 40% more recruiter engagement"
5. **Annual impression refresh** — AI prompts: "It's been a year. A lot has probably changed."

---

## 9. Product Principles (Operational)

These govern every feature decision, now and in the future:

| Principle | What It Means in Practice |
|-----------|--------------------------|
| **Recruiter-first design** | Every feature is evaluated from the recruiter's perspective first. If a recruiter doesn't benefit, the candidate doesn't either. |
| **No feature without a share** | Every feature must make the impression more likely to be shared or more impactful when viewed. |
| **Friction is the enemy** | Count the clicks to first share. Target: 7 or fewer from landing page to first link copied. |
| **AI is a draft, not a decree** | Every AI output must be editable by the user. No locked content. |
| **Silence over noise** | Default to fewer features visible, not more. Progressive disclosure always. |
| **Mobile-aware, not mobile-first** | Candidates build on desktop; recruiters view on both. Build desktop-first, optimize mobile viewing. |
| **Privacy as default** | Candidate data is never shared, sold, or used to train models without explicit opt-in. |

---

## 10. MVP Scope Recommendation (Preview of Phase 23)

*The team previewed the MVP definition to ensure product strategy is anchored in what's achievable in v1.*

**MVP Must-Haves** (without these, the product has no value):
- Resume parser + AI extraction
- AI Professional Summary (editable)
- Candidate Profile Page (shareable URL)
- Skills auto-extraction + display
- Career Timeline
- Profile Photo Upload
- PDF Resume Download
- Open Graph link preview

**MVP Should-Haves** (without these, the viral loop doesn't work):
- View count / notification (simplified)
- "Create yours" viral CTA on impression page
- LinkedIn OAuth import
- Custom subdomain (yourname.1imp.io)

**MVP Won't-Haves** (deferred to v1.5 or v2):
- Video pitch
- Company identification in analytics
- Multiple profiles
- B2B recruiter dashboard
- Browser extension
- Multilingual profiles

---

## Phase 3 Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| North Star Metric | Impressions Shared / Week | Only metric that proves real value delivered |
| Onboarding model | Progressive, split-screen, live preview | Aha Moment must happen inside onboarding |
| Recruiter flow | Zero login required, ever | Any login gate kills the viral loop |
| AI model | Co-creator (drafts + user edits) | Ownership + quality, not black-box generation |
| Retention hook | View notifications + living impression | Extends lifecycle beyond active job search |
| Viral mechanism | "Create yours" CTA on every public page | Passive viral, no referral program needed in v1 |
| MVP scope | 8 must-haves + 4 should-haves | Achievable without sacrificing core value |

---

> **Awaiting approval to proceed to Phase 4: User Research**
>
> Phase 4 will define: Primary research methodology, target interview candidates, survey design, key questions to validate, and synthesis framework.
> Phase 5 (User Personas) follows immediately after — the two phases together define who we are building for.
