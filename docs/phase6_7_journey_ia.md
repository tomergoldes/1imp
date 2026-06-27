# 1IMP — Phase 6 & 7: Customer Journey & Information Architecture

> **Status**: Phase 6 & 7 Complete — Awaiting approval to proceed to Phase 8

---

## PHASE 6: CUSTOMER JOURNEY MAP

The Customer Journey maps the candidate's emotional and functional progression through the 1IMP ecosystem. We design for the "Happy Path" that maximizes the North Star Metric (Impressions Shared).

### The 5 Stages of the 1IMP Journey

#### Stage 1: Discovery & Awareness (The Hook)
- **User State**: Frustrated with job search, feeling unseen.
- **Touchpoint**: Sees a beautifully designed 1IMP link shared by a peer on LinkedIn, OR a targeted ad: *"You only get one impression. Make it unforgettable."*
- **Action**: Clicks through to the 1IMP landing page.
- **Emotion**: Curiosity mixed with skepticism ("Is this just another resume builder?").
- **Product Job**: Instantly demonstrate the premium output. Show, don't tell.

#### Stage 2: Onboarding & Value Creation (The Aha Moment)
- **User State**: Willing to try, but low patience for friction.
- **Touchpoint**: The 1IMP creation flow.
- **Action**: Uploads PDF resume. Watches the AI extract and format data. Edits the AI-generated Professional Summary.
- **Emotion**: Delight ("Wow, this looks exactly like me, but better") transitioning to Pride.
- **Product Job**: Get the user to the "Aha Moment" within 3 minutes. The live preview pane is critical here.

#### Stage 3: Activation (The First Share)
- **User State**: Proud of their new profile.
- **Touchpoint**: The finalized Impression Page and the "Share" modal.
- **Action**: Copies the `1imp.io/firstname-lastname` link. Pastes it into an email to a recruiter or a LinkedIn message.
- **Emotion**: Confidence ("I am ready for them to see this").
- **Product Job**: Make sharing frictionless. Provide pre-written outreach templates to reduce cognitive load.

#### Stage 4: Engagement & Feedback (The Hook Loop)
- **User State**: Waiting for a response.
- **Touchpoint**: Email/Push notification: *"Someone's paying attention. A recruiter just viewed your impression."*
- **Action**: Logs back into the Candidate Dashboard to check analytics (views, time on page).
- **Emotion**: Validation and Excitement.
- **Product Job**: Deliver immediate dopamine via analytics. Prove that the platform works.

#### Stage 5: Virality & Retention (The Loop Closes)
- **User State**: Actively interviewing or hired.
- **Touchpoint**: The Recruiter viewing the shared link.
- **Action**: Recruiter sees the "Create yours" CTA at the bottom of the candidate's profile and shares 1IMP with their network. Candidate updates their profile with their new job.
- **Emotion**: Loyalty to the platform.
- **Product Job**: Convert the audience (recruiter) into an advocate or user, and transition the candidate's profile from a "job application" to a "living professional identity."

---

## PHASE 7: INFORMATION ARCHITECTURE (IA)

The Information Architecture defines the structural hierarchy of the platform. It must support two entirely distinct experiences: the **Candidate Builder** (complex, private) and the **Recruiter View** (simple, public).

### 7.1 Global Architecture

```text
[ 1IMP Platform ]
   │
   ├── Public Marketing Site (Acquisition)
   │    ├── Landing Page (Hero, Demo, Value Prop)
   │    ├── Pricing
   │    └── Examples/Wall of Love
   │
   ├── App (Authenticated Candidate Experience)
   │    ├── Onboarding Flow (Linear)
   │    ├── Dashboard (Analytics & Activity)
   │    ├── Editor (The Impression Builder)
   │    └── Settings (Account & Billing)
   │
   └── Public Impression Pages (The Core Product)
        └── [candidate-name].1imp.io (Public, No Login)
```

### 7.2 The Candidate Editor IA (The Workspace)

The Editor must feel like a focused workspace, not a sprawling form.

```text
[ The Impression Editor (Split Screen) ]

  [ Left Pane: Inputs & AI Collaboration ]
      │
      ├── Core Identity
      │    ├── Basic Info (Name, Target Role, Location)
      │    └── Media (Profile Photo, Optional Video Pitch)
      │
      ├── The Narrative (AI Assisted)
      │    └── Professional Summary (Drafted by AI, Edited by User)
      │
      ├── The Evidence
      │    ├── Skills (Categorized: Core, Technical, Soft)
      │    ├── Experience Timeline (Role, Company, AI-formatted Bullets)
      │    └── Education & Certifications
      │
      └── Design & Sharing
           ├── Theme Selection (Dark/Light, Accent Color)
           └── Custom URL Settings

  [ Right Pane: Live Preview ]
      │
      └── Real-time render of the public profile (Desktop & Mobile toggle)
```

### 7.3 The Public Impression Page IA (The Recruiter View)

This page must be scannable in 10 seconds. Hierarchy is critical.

```text
[ Public Impression Page ]

  [ Zone 1: The Hook (Seconds 0-3) ]
      ├── Visual Identity: Candidate Photo + Clean Typography + Premium Theme
      ├── Headline: Candidate Name + Target Role
      └── The Pitch: AI Professional Summary (Max 3 lines, bold, high contrast)
      └── CTA: [Download Resume (PDF)] [Contact via LinkedIn/Email]

  [ Zone 2: The Proof (Seconds 3-7) ]
      ├── Top Skills (Visual tags, easily digestible)
      └── Current/Most Recent Role (Company logo, Title, Duration)
      └── Optional: Video Pitch Thumbnail (Playable inline)

  [ Zone 3: The Depth (Seconds 7-15) ]
      └── Interactive Timeline
           ├── Previous Roles (Expandable for AI-formatted achievements)
           └── Education Highlights

  [ Zone 4: The Viral Loop ]
      └── Subtle Footer CTA: "Powered by 1IMP. Create your impression →"
```

### 7.4 Key UX Decisions Derived from IA

1. **Split-Screen Editor**: The user never leaves the preview context while editing. This reinforces the "Aha Moment" continuously.
2. **Top-Heavy Public Profile**: We move the Summary and Top Skills above the Timeline. Recruiters screen for *relevance* before *history*.
3. **Download PDF as Primary CTA**: Acknowledges reality—many ATS systems still require a PDF. Providing it immediately builds trust with the recruiter.

---

## Phase 6 & 7 Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Onboarding Goal | Time-to-Preview < 3 mins | Friction kills adoption. The "Aha Moment" must happen before the user loses interest. |
| Engagement Loop | View Analytics Notifications | The strongest retention hook is proving the product works (getting noticed). |
| Editor Layout | Split-screen (Input / Preview) | Immediate visual feedback connects effort to value. |
| Public Page Hierarchy | Summary & Skills first, Timeline second | Aligns with recruiter scanning behavior (Relevance > History). |

---

> **Awaiting approval to proceed to Phase 8: Product Requirements Document (PRD)**
>
> In Phase 8, we translate these strategic frameworks into a concrete, actionable PRD that engineering and design can build from, defining exactly what features make the MVP cut.
