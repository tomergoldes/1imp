# 1IMP — Master Execution Plan

> **Status**: Phase 1 Complete — Awaiting approval to proceed to Phase 2

---

## Phase Overview

| # | Phase | Status |
|---|-------|--------|
| 1 | Startup Research & Assumption Audit | ✅ Complete |
| 2 | Brand Strategy | ⏳ Pending |
| 3 | Product Strategy | ⏳ Pending |
| 4 | User Research | ⏳ Pending |
| 5 | User Personas | ⏳ Pending |
| 6 | Customer Journey | ⏳ Pending |
| 7 | Information Architecture | ⏳ Pending |
| 8 | PRD | ⏳ Pending |
| 9 | UX | ⏳ Pending |
| 10 | UI | ⏳ Pending |
| 11 | Design System | ⏳ Pending |
| 12 | Motion System | ⏳ Pending |
| 13 | Technical Architecture | ⏳ Pending |
| 14 | Database Design | ⏳ Pending |
| 15 | AI Architecture | ⏳ Pending |
| 16 | Backend | ⏳ Pending |
| 17 | Frontend | ⏳ Pending |
| 18 | Authentication | ⏳ Pending |
| 19 | Analytics | ⏳ Pending |
| 20 | Pricing | ⏳ Pending |
| 21 | Growth Strategy | ⏳ Pending |
| 22 | Go-To-Market | ⏳ Pending |
| 23 | MVP Definition | ⏳ Pending |
| 24 | Version 2 Roadmap | ⏳ Pending |
| 25 | Long-Term Vision | ⏳ Pending |

---

# PHASE 1 — Startup Research & Assumption Audit

## The Founding Team's Internal Debate

*What follows is the honest, unfiltered analysis the leadership team produced before writing a single line of code.*

---

## 1. Validating the Core Problem

### The Claim
> "Candidates lose opportunities because they never receive attention."

### The Team's Verdict: **CONFIRMED — but critically undersized in scope**

The attention problem is real and measurable:
- The average recruiter spends **6–7 seconds** on a resume (Ladders Eye-Tracking Study, 2018 — still the most-cited benchmark)
- LinkedIn InMail response rates average **~25%** — meaning **3 in 4 candidates are ignored**
- Top companies receive **250+ applications per job posting** (Glassdoor)
- The rise of ATS systems means most resumes are **machine-rejected before a human reads them**

**However**, the team identified a more precise framing of the problem:

> The real problem is not attention. It is **signal-to-noise ratio**.

Recruiters do not lack time because they are lazy. They lack time because the current tooling forces them to read 250 essentially identical documents to find 5 qualified candidates. The PDF resume is not bad because it is static. It is bad because it makes every candidate look the same.

**1IMP's real job**: Make the exceptional candidate immediately distinguishable from the average candidate. Not by being louder. By being clearer and more compelling.

---

## 2. Assumption Audit

### Assumption 1: "Video is the answer"

**Challenge from VP Product**: Video is high-friction to produce and inconsistent in quality. A bad video pitch actively harms a candidate more than no video. The AI must generate or heavily coach the video — not just record it.

**Challenge from VP Design**: In markets like Germany, Japan, and parts of the Middle East, video introductions can create legal discrimination risks. The product must be regionally configurable.

**Challenge from VP Engineering**: Video hosting, transcoding, and CDN delivery is expensive at scale. This is a significant infrastructure cost that must be modeled before pricing.

**Team Decision**: Video is ONE element inside the first impression, not the product's identity. The product must work excellently even without video. The AI Summary + Candidate Card must be strong enough to stand alone.

---

### Assumption 2: "Recruiters are the primary user"

**Challenge from CEO**: If recruiters don't adopt the format, the candidate's 1IMP profile is useless. We have a classic two-sided marketplace cold start problem.

**Challenge from VP Growth**: We cannot force recruiters to sign up. We must make it so frictionless to view a 1IMP profile that recruiters do it without thinking — no login required, no account, no barrier.

**Challenge from VP Sales**: The real buyer in B2B is not the recruiter. It is the HR Director or Talent Acquisition Manager. That is who approves budget. That changes our go-to-market entirely.

**Team Decision**: 
- **Candidates = Primary users (product is built for them)**
- **Recruiters = Primary audience (product is designed to impress them)**
- **HR Buyers = Primary customers for B2B revenue stream**
- This is a B2C2B model. Build consumer product first, monetize B2B second.

---

### Assumption 3: "AI automatically creates everything from uploaded content"

**Challenge from CTO**: This creates a massive quality consistency problem. AI-generated summaries that sound generic are worse than nothing. We need a quality floor — a minimum acceptable output standard — enforced before any profile goes public.

**Challenge from Principal Architect**: The onboarding flow where users upload a resume and "AI does everything" sets an expectation that is very hard to meet at v1. If the AI output is mediocre, first impression of the product mirrors first impression of the candidate — both suffer.

**Challenge from VP Customer Success**: Users will blame the AI when outputs are bad, not themselves. We must design a correction and refinement loop that feels like collaboration, not debugging.

**Team Decision**: The AI is a co-creator, not an auto-generator. The UX must feel like: *"The AI drafted this for you. Now make it yours."* Progressive refinement, not one-shot generation.

---

### Assumption 4: "The positioning as 'AI First Impression Platform' is unique"

**Challenge from VP Marketing**: This is a strong positioning claim, but it needs to be defensible. What stops LinkedIn from launching "LinkedIn First Impression" tomorrow?

**Challenge from Startup Advisor**: LinkedIn's moat is data and distribution. Our moat must be design quality + AI depth + candidate-first philosophy. LinkedIn's design culture cannot ship something that looks and feels like 1IMP in 12 months. That window is the startup's most valuable asset.

**Challenge from VP Growth**: There are already players in this space. Vizualai, Wonsulting, Resume.io, Kickresume, Enhancv — all have AI features. The differentiation must be product-depth, not feature-list.

**Team Decision**: Position 1IMP not just as a platform, but as a **new professional standard**. The language should be: *"The way professionals are discovered is changing. 1IMP is the new standard."* This is a category creation play, not a features play.

---

### Assumption 5: "A shareable URL/page is the core delivery mechanism"

**Validation from VP Product**: CONFIRMED. The shareable link is the product's viral loop engine. Every time a candidate shares their 1IMP link, they expose 1IMP to a recruiter who has never seen it. This is the flywheel.

**Enhancement from VP Growth**: The link must be beautiful even on hover/unfurl (Open Graph cards, Twitter Cards). When a recruiter sees the link preview in LinkedIn messenger, that preview IS the first impression. It must be immaculate.

**Enhancement from VP Engineering**: Custom domains (yourname.1imp.io) increases perceived professionalism significantly. This should be available even on free tier.

---

## 3. Identified Weaknesses

### Critical Weaknesses

| # | Weakness | Severity | Mitigation |
|---|----------|----------|------------|
| W1 | Cold start problem — candidates create profiles recruiters never see | 🔴 Critical | Viral sharing loop + direct recruiter outreach tools built in |
| W2 | AI output quality variance | 🔴 Critical | Quality scoring system + mandatory editing step before publish |
| W3 | Two-sided marketplace chicken-and-egg | 🔴 Critical | Start B2C only, recruit-side is passive (view only, no signup needed) |
| W4 | Video production friction | 🟠 High | Make video optional in v1; AI teleprompter + one-take coach in v2 |
| W5 | Legal risk in some markets (photo + video = discrimination liability) | 🟠 High | Regional profile templates; GDPR-compliant data handling from day 1 |
| W6 | ATS bypass — recruiters may not accept non-PDF submissions | 🟠 High | Always include one-click PDF resume download inside every profile |
| W7 | Recruiter behavior change required | 🟡 Medium | Profile must be so fast to consume that it requires zero behavior change |
| W8 | Monetization before scale | 🟡 Medium | Freemium model; premium features that don't block core value |

---

## 4. Identified Opportunities

### High-Value Opportunities

**O1: The Recruiter Dashboard (Future B2B Play)**
Build a recruiter-facing dashboard where talent teams can manage inbound 1IMP profiles. This is the SaaS revenue line. A saved search + profile collection tool for recruiters becomes a legitimate ATS alternative for sourcing.

**O2: Verified 1IMP Badges**
Social proof layer. "1IMP Verified Professional" badge on LinkedIn. Works similarly to Twitter's blue check in building credibility. Could become a de facto professional credential.

**O3: Analytics for Candidates**
Show candidates: who viewed their profile, which companies, how long they spent, what sections they engaged with. This is an extraordinarily high-value insight no resume tool currently provides. This alone justifies a premium subscription.

**O4: Recruiter-Initiated Invitations**
Flip the model: recruiters on the platform can invite candidates who don't have a 1IMP yet. This creates a pull dynamic and makes candidates feel wanted before they've even applied.

**O5: Career Milestones & Public Updates**
Treat the 1IMP profile as a living career timeline, not a static document. Candidates post promotions, certifications, projects. This makes the platform sticky and gives them a reason to return.

**O6: The "Apply with 1IMP" Button**
A browser extension that auto-populates job applications using the candidate's 1IMP profile. Reduces application friction by 80%. This is a distribution hack disguised as a feature.

**O7: Team/Company Profiles**
Employers build their own 1IMP company page to attract talent. Symmetric design philosophy. This is the B2B gateway.

**O8: AI Interview Prep**
After a candidate gets noticed, 1IMP prepares them for the interview. This extends the lifecycle from "first impression" to "getting the job." Higher retention, higher LTV.

---

## 5. Missing Features (v1.5 Candidates)

- **Social Proof Layer**: Endorsements from colleagues, managers (like LinkedIn recommendations but visual)
- **Skills Assessment Integration**: Partner with Coursera/LinkedIn Learning/HackerRank to show verified skills
- **Job Match Score**: AI analyzes the candidate's profile against a job description and shows fit percentage
- **Outreach Assistant**: Draft recruiter messages directly from the profile with AI-generated personalization
- **1IMP Score**: A proprietary profile completeness + quality score visible to the candidate (not recruiters). Drives completion behavior.
- **Multi-language Profiles**: Auto-translate profile to 10 languages for global job markets

---

## 6. Business Model Analysis

### Recommended Model: **Freemium + B2B SaaS**

**Phase 1 (0-12 months): B2C Freemium**
- Free: 1 profile, 1IMP subdomain, basic AI summary, shareable link
- Pro ($9/mo): Analytics, custom URL, video pitch, multiple profiles, premium templates
- Elite ($19/mo): White-label, priority AI generation, advanced analytics, outreach tools

**Phase 2 (12-24 months): B2B Layer**
- Team ($99/mo): Company page + 10 recruiter seats
- Enterprise (custom): ATS integration, bulk invite, analytics dashboard, SSO

**Revenue Math (Conservative, Year 2)**:
- 100,000 free users → 8% conversion = 8,000 Pro users @ $9/mo = **$864K ARR**
- 200 B2B companies @ $99/mo = **$237K ARR**
- Year 2 ARR target: **~$1.1M** (realistic for seed-stage SaaS with good execution)

**The Real Exit Thesis**: LinkedIn, Indeed, or Workday acquires 1IMP at $50-150M when the platform reaches 500K+ active professional profiles. The data + engagement model is the acquisition target, not just the technology.

---

## 7. Competitive Landscape

| Competitor | Strength | Weakness | 1IMP Advantage |
|------------|----------|----------|----------------|
| LinkedIn | Distribution, network effects | Stale UX, generic profiles | 10x better design, AI-native |
| Notion | Flexible pages | Not career-focused, no AI | Purpose-built for hiring context |
| Vizualai | Similar concept | Poor execution, weak AI | Better brand, better UX, better AI |
| Wonsulting | Resume coaching | Human-dependent, not scalable | AI-native, instant |
| Kickresume | Templates | Still a resume builder | Category-level repositioning |
| Read.cv | Beautiful profiles | No AI, no recruiter tools | AI depth + recruiter targeting |

**The real competitor is habit.** The hardest thing to displace is the behavior of "send a PDF resume." The product must make not using 1IMP feel embarrassing, not just suboptimal.

---

## 8. Recommended Positioning Refinement

**Original**: "The world's first AI First Impression Platform"

**Refined**: **"The new standard for professional first impressions"**

Why:
- "New standard" implies category creation, not just a product
- Removes "AI" from the headline (AI is infrastructure, not the story)
- Sounds like something that already won — confidence attracts users
- Works as a B2B pitch too: "Set a new standard for your hiring brand"

**Tagline options (for brand phase)**:
1. *"You only get one impression. Make it yours."*
2. *"Before the interview, there's the impression."*
3. *"The resume is dead. Long live the impression."*
4. *"Get noticed before you get judged."*

---

## 9. Phase Execution Plan

| Phase | Priority | Complexity | Business Value | UX Value | Tech Value |
|-------|----------|------------|---------------|----------|------------|
| 1. Startup Research | ✅ Done | Low | High | — | — |
| 2. Brand Strategy | 🔴 P0 | Medium | Very High | Very High | Low |
| 3. Product Strategy | 🔴 P0 | High | Very High | High | Medium |
| 4. User Research | 🔴 P0 | Medium | Very High | Very High | Low |
| 5. User Personas | 🔴 P0 | Low | High | High | Low |
| 6. Customer Journey | 🔴 P0 | Medium | High | Very High | Low |
| 7. Info Architecture | 🔴 P0 | Medium | High | Very High | Medium |
| 8. PRD | 🔴 P0 | High | Very High | High | High |
| 9. UX | 🟠 P1 | High | High | Very High | Medium |
| 10. UI | 🟠 P1 | Very High | High | Very High | Low |
| 11. Design System | 🟠 P1 | High | Medium | Very High | High |
| 12. Motion System | 🟡 P2 | Medium | Medium | Very High | Medium |
| 13. Tech Architecture | 🟠 P1 | Very High | High | Low | Very High |
| 14. Database Design | 🟠 P1 | High | High | Low | Very High |
| 15. AI Architecture | 🟠 P1 | Very High | Very High | High | Very High |
| 16. Backend | 🟠 P1 | Very High | High | Low | Very High |
| 17. Frontend | 🟠 P1 | Very High | High | High | Very High |
| 18. Authentication | 🟠 P1 | Medium | High | Medium | High |
| 19. Analytics | 🟡 P2 | Medium | High | Low | Medium |
| 20. Pricing | 🟡 P2 | Low | Very High | Low | Low |
| 21. Growth Strategy | 🟡 P2 | Medium | Very High | Low | Low |
| 22. Go-To-Market | 🟡 P2 | Medium | Very High | Low | Low |
| 23. MVP Definition | 🔴 P0 | Medium | Very High | High | High |
| 24. V2 Roadmap | 🟢 P3 | Low | High | Medium | Medium |
| 25. Long-Term Vision | 🟢 P3 | Low | High | Low | Low |

---

## Phase 1 Conclusions

**What we confirmed:**
1. The attention problem in hiring is real, measurable, and under-served
2. 1IMP's positioning as a "First Impression Platform" is strategically correct
3. The B2C2B model is the right go-to-market path
4. Freemium is the right monetization entry point
5. The viral sharing loop (candidate shares link → recruiter sees it → recruiter adopts it) is the growth engine

**What we changed from the original brief:**
1. Video is demoted from "the product" to "one feature" — the AI Summary + Candidate Card must stand alone
2. Recruiter engagement is passive (view-only, no signup required) — remove ALL friction from the recruiter's experience
3. The onboarding UX is "AI as co-creator," not "AI as auto-generator"
4. Positioning refined: "The new standard" over "AI First Impression Platform"
5. Analytics for candidates (profile view tracking) is elevated to a core premium feature, not an afterthought

**What we added that wasn't in the original brief:**
1. Quality scoring system before any profile goes live
2. "Apply with 1IMP" browser extension concept
3. Recruiter-initiated invitation flow
4. 1IMP Verified Badge program
5. Regional compliance configuration (photo/video on/off)

---

> **Awaiting approval to proceed to Phase 2: Brand Strategy**
>
> Phase 2 will define: Color system, Typography, Logo concept, Voice & Tone, Brand principles, and Naming conventions.
