# 1IMP — Phase 19, 20 & 21: Analytics, Pricing & Growth

> **Status**: Phase 19, 20 & 21 Complete — Awaiting approval to proceed to Phase 22-25 (Go-To-Market & Vision)

---

## The VP Growth & VP Marketing's Mandate

> "The best product doesn't win. The product with the best distribution loop wins.
> If we have to pay Facebook $50 to acquire a free user, we are dead. 
> The product must distribute itself."

These phases define how we capture value (Pricing), how we measure success (Analytics), and how we multiply our user base organically (Growth).

---

## PHASE 19: ANALYTICS STRATEGY

Analytics in 1IMP serve two entirely different purposes. 

1. **Internal Analytics**: To optimize the product (Mixpanel / PostHog).
2. **User-Facing Analytics**: To drive retention and monetize (The 1IMP Dashboard).

### 19.1 Internal Analytics (Product Optimization)

We must track the funnel leading to the North Star Metric (Impressions Shared).

**Core Funnel Events:**
1. `signup_completed`
2. `resume_uploaded`
3. `ai_generation_completed`
4. `profile_published`
5. `impression_shared` (Copied link to clipboard / Clicked share button)

**Key Drop-off Suspects (What we monitor closely):**
- *Upload to Generation*: Did the parser fail? Did they abandon the loading state?
- *Generation to Publish*: Did they hate the AI output? Did they feel it was too much work to edit?

### 19.2 User-Facing Analytics (The Dopamine Loop)

This is the psychological engine of the platform. Job hunting is a black hole—candidates send resumes and hear nothing. We provide immediate, visible feedback.

**Free Tier Analytics:**
- Total Views (All time)
- Total Resume Downloads

**Pro Tier Analytics (The Tease):**
- *The "Blur" Effect*: Free users see a blurred list: "3 Recruiters from Top Tech Companies viewed your profile this week. Upgrade to see who."
- Viewers' inferred company domains (e.g., "Someone at Stripe.com viewed you").
- Average time on page (Engagement quality).
- Traffic sources (LinkedIn, Direct Link, Email).

---

## PHASE 20: PRICING STRATEGY

We are adopting a **Freemium B2C Model** for Phase 1. 
*Rule: Never charge a candidate for the core ability to get hired. Charge them for insights, customization, and power tools.*

### 20.1 The Free Tier (The Distribution Engine)
- **Goal**: Maximize the top of the funnel and fuel the viral loop.
- **Includes**: 
  - 1 Active Impression Profile.
  - Standard AI Generation.
  - PDF Upload/Parsing.
  - Basic Analytics (Total Views).
  - `[username].1imp.io` URL.
  - Standard Themes.

### 20.2 1IMP Pro — $12/month (or $9/mo billed annually)
- **Goal**: Monetize the top 10% of highly motivated job seekers.
- **Includes**:
  - **Advanced Analytics**: Company viewer identification, time-on-page. (The primary conversion driver).
  - **Premium Themes & Colors**: Full brand customization.
  - **Multiple Impressions**: Tailor different profiles for different roles (e.g., one for Product Manager, one for UX Designer).
  - **AI Outreach Drafter**: Generate personalized LinkedIn messages based on the target company.
  - **Remove Branding**: Remove the "Powered by 1IMP" footer (Ironically, many Pro users keep it because 1IMP looks premium).

### 20.3 The Future B2B Tier (V2 Preview)
We do not build this now, but we architect for it.
- **1IMP for Teams ($99/mo)**: Recruiter dashboard to manage inbound profiles, company employer branding pages, and ATS API integration.

---

## PHASE 21: GROWTH STRATEGY

How do we get the first 10,000 users without a marketing budget?

### 21.1 Growth Loop 1: The Recruiter Viral Loop (Passive)
This was defined in Phase 3. It is our primary engine.
1. Candidate shares profile.
2. Recruiter views it (Wow moment).
3. Recruiter clicks "Create yours" footer CTA.
4. Recruiter shares 1IMP internally with their TA team as a new sourcing standard.

### 21.2 Growth Loop 2: The LinkedIn Flex (Active)
When a candidate publishes their 1IMP, we prompt them to announce it on LinkedIn.
- **The Prompt**: "Your impression is live. The best way to get noticed is to announce you are looking. Share your new 1IMP profile to LinkedIn."
- **The Mechanic**: The auto-generated Open Graph image (Candidate Photo + Target Role + "Looking for opportunities") looks stunning in the LinkedIn feed. It acts as a billboard for the candidate AND the product.

### 21.3 The "1IMP Verified" Content Strategy (GTM Tactic)
We partner with 10 high-profile Tech Influencers / Career Coaches.
- We build them custom 1IMP profiles for free (white-glove onboarding).
- They put their `1imp.io` link in their Twitter/LinkedIn bios instead of Linktree or a personal site.
- Their massive audience clicks the link, experiences the premium UI, and sees "Powered by 1IMP."

### 21.4 Product-Led SEO (Programmatic)
We create a public directory of *opted-in* profiles (e.g., `1imp.io/discover/product-managers`).
- These pages index on Google for "[Name] Product Manager resume".
- It serves as a lead generation tool for recruiters searching Google, and free SEO acquisition for 1IMP.

---

## Phase 19, 20 & 21 Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Monetization Trigger | Advanced Analytics | Candidates will pay to know *who* is looking at them. It relieves the anxiety of the job hunt black hole. |
| Pricing Tier | $12/month | Accessible enough for unemployed candidates, high enough to signal premium quality. |
| Footer Branding | Mandatory on Free | Every free profile is an advertisement. The "Powered by 1IMP" badge pays for the server cost of hosting the free tier. |
| Launch Marketing | Influencer Profiles | "Link-in-bio" placement by respected tech leaders creates instant credibility and massive top-of-funnel traffic. |

---

> **Awaiting approval to proceed to Phase 22-25: GTM & Final Vision**
>
> In the final phases, we will define the exact Go-To-Market launch plan, summarize the MVP definition, map the V2 roadmap, and finalize the long-term vision of the company.
