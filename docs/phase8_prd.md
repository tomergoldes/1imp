# 1IMP — Phase 8: Product Requirements Document (PRD)

> **Status**: Phase 8 Complete — Awaiting approval to proceed to Phase 9

---

## 1. Executive Summary

**Objective**: Build and launch the V1 (MVP) of the 1IMP platform, allowing ambitious professionals to create, refine, and share an AI-powered "first impression" page that significantly outperforms a traditional PDF resume in capturing recruiter attention.

**Target Launch**: 8 weeks from execution kickoff.

**North Star Metric**: Impressions Shared per Week.

---

## 2. Scope Definition (MVP vs V1.5)

To ensure a rapid time-to-market without sacrificing the premium feel, we ruthlessly cut features that do not directly contribute to the "Aha Moment" or the Viral Loop.

### In Scope for MVP (V1)
- Resume Parsing (PDF/DOCX) via LLM
- AI Summary Generation & Interactive Editing
- Candidate Split-Screen Editor Workspace
- Public Impression Page Generation (Custom `username.1imp.io` routing)
- PDF Resume Download (Fallback for legacy ATS)
- Basic Analytics (Total Views counter)
- Standard Authentication (Email/Password & Google OAuth)
- Open Graph tags for beautiful link previews

### Out of Scope for MVP (Pushed to V1.5 or V2)
- Video Pitch recording/hosting (High tech complexity, low initial adoption rate)
- Custom Domain linking (`yourname.com`)
- Advanced Analytics (Time on page, Company tracking)
- B2B Recruiter Dashboard
- Multi-language support
- Custom color/theme builder (MVP will use 3 pre-defined premium themes)

---

## 3. Core Epics & User Stories

### Epic 1: Identity & Onboarding

**User Story 1.1: Authentication**
- *As a candidate, I want to sign up quickly using Google or Email so I can start building my impression without friction.*
- **Acceptance Criteria**:
  - Google OAuth integration.
  - Standard email/password flow with email verification.
  - User profile database record created upon successful signup.

**User Story 1.2: Initial Context Setup**
- *As a candidate, I want to define my target role and location so the AI tailors my summary correctly.*
- **Acceptance Criteria**:
  - 2-step onboarding wizard post-signup capturing: Target Role (Free text/Dropdown), Location/Remote Preference.

### Epic 2: Content Ingestion & AI Generation

**User Story 2.1: Resume Parsing**
- *As a candidate, I want to upload my existing PDF resume so I don't have to re-type my entire work history.*
- **Acceptance Criteria**:
  - Drag-and-drop file upload for PDF and DOCX (Max 5MB).
  - Background task extracts text and structures it into JSON (Experience, Education, Skills).
  - Progress state shown to user during extraction.

**User Story 2.2: AI Summary Generation**
- *As a candidate, I want the AI to draft a compelling professional summary based on my uploaded resume and target role.*
- **Acceptance Criteria**:
  - LLM prompt executed combining extracted JSON + Target Role.
  - Returns a 2-3 sentence narrative summary.
  - Content must pass the "Quality Floor" (no hallucinated skills).

### Epic 3: The Split-Screen Editor (Candidate Workspace)

**User Story 3.1: Inline Editing**
- *As a candidate, I want to edit the AI-generated summary and my experience bullets so I have full control over the narrative.*
- **Acceptance Criteria**:
  - Text fields for Summary, Skills (tags), and Experience entries.
  - Changes debounce and auto-save.

**User Story 3.2: Live Preview**
- *As a candidate, I want to see how my public profile will look in real-time as I make edits.*
- **Acceptance Criteria**:
  - Right-side pane renders the public-facing React component.
  - Updates instantly when data on the left pane changes.
  - Toggle between Desktop and Mobile preview widths.

**User Story 3.3: Media Uploads**
- *As a candidate, I want to upload a professional headshot.*
- **Acceptance Criteria**:
  - Image upload with simple client-side crop to square/circle.
  - Uploaded to secure cloud storage (e.g., AWS S3).

### Epic 4: The Public Impression Page (Recruiter View)

**User Story 4.1: Public Routing**
- *As a recruiter, I want to view a candidate's profile via a clean URL without needing to log in.*
- **Acceptance Criteria**:
  - Route format: `app.1imp.io/p/[username]` or `[username].1imp.io` (depending on infra setup).
  - Page is publicly accessible; no auth wall.

**User Story 4.2: Scannable Layout**
- *As a recruiter, I want to understand the candidate's value proposition within 10 seconds.*
- **Acceptance Criteria**:
  - Implementation of the approved "Top-Heavy" IA (Summary & Skills above the fold).
  - Clean typography and premium layout matching Figma designs.

**User Story 4.3: ATS Escape Hatch (PDF Download)**
- *As a recruiter, I need to download a standard PDF resume to put into my ATS.*
- **Acceptance Criteria**:
  - Prominent "Download Resume" button on the public page.
  - Serves the original PDF uploaded by the candidate.

**User Story 4.4: The Viral CTA**
- *As a recruiter, I want to learn more about the tool used to create this profile.*
- **Acceptance Criteria**:
  - Footer banner: "Powered by 1IMP. Create your impression →" linking to the marketing landing page.

### Epic 5: Analytics & Sharing

**User Story 5.1: Link Sharing & Open Graph**
- *As a candidate, I want my shared link to look beautiful in LinkedIn messages and Slack.*
- **Acceptance Criteria**:
  - Public pages dynamically generate Open Graph `<meta>` tags.
  - Includes candidate name, target role, and optimized image.

**User Story 5.2: Basic Analytics**
- *As a candidate, I want to know if my profile is being viewed.*
- **Acceptance Criteria**:
  - Track unique hits to the public impression page (server-side, excluding the candidate's own IP/session).
  - Display "Total Views" counter on the candidate dashboard.

---

## 4. Technical Constraints & Non-Functional Requirements

1. **Performance**: The Public Impression Page must achieve a Lighthouse Performance score of > 90. Time-to-Interactive (TTI) must be under 1.5 seconds. Recruiters will not wait for a loading spinner.
2. **Mobile Responsiveness**: The Public Impression Page must be flawless on mobile. We expect 40%+ of recruiter views to happen on phones (via LinkedIn app browser).
3. **Security**: Candidate data (original resumes) must be stored securely. Public pages only expose explicitly approved data.
4. **SEO**: Public impression pages should have an opt-in toggle for search engine indexing (default: OFF to protect privacy).

---

## Phase 8 Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Scope Cut | Video Pitch deferred | Too complex for MVP. Requires transcoding, storage, and moderation. High friction for early user adoption. |
| AI Parsing Strategy | LLM-based extraction | Traditional regex-based resume parsers fail on creative resumes. LLMs provide highly accurate structured data extraction from messy PDFs. |
| PDF Download | Serve Original Upload | Generating a *new* PDF from the web data is complex and often looks ugly. Serving the user's original PDF is simpler and ensures ATS compatibility. |
| Infrastructure | Vercel/Next.js (Assumed) | SSR is mandatory for dynamic Open Graph tags (crucial for the viral loop). |

---

> **Awaiting approval to proceed to Phase 9: UX**
>
> In Phase 9, we will translate these requirements into wireframes, defining the precise user experience, interactions, and layout structures before applying the visual UI layer.
