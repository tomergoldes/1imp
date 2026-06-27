# 1IMP — Phase 4 & 5: User Research & Personas

> **Status**: Phase 4 & 5 Complete — Awaiting approval to proceed to Phase 6 & 7

---

## The User Research Team's Mandate

> "You cannot build a product for 'everyone looking for a job.' 
> If you build for everyone, you build for no one. 
> We must define precisely whose problem we are solving first, and understand the exact mechanics of their pain."

In these phases, we define our research methodology to validate our assumptions and codify our target users into actionable personas.

---

## PHASE 4: USER RESEARCH STRATEGY

### 1. Research Objectives

Before writing a line of code, we must validate four critical hypotheses:

1. **The Friction Hypothesis**: Candidates will invest 10-15 minutes to curate a 1IMP profile if they believe it significantly increases their chances of being noticed.
2. **The Recruiter Behavior Hypothesis**: Recruiters will click a 1IMP link from a cold email or LinkedIn message and spend at least 10 seconds reviewing it.
3. **The Format Acceptance Hypothesis**: Hiring managers and recruiters will accept a 1IMP profile as a valid substitute for a traditional resume in the early screening phase.
4. **The AI Trust Hypothesis**: Candidates will trust AI to draft their professional summary, provided they have full editing control.

### 2. Research Methodology

**A. Qualitative Interviews (Depth)**
- **Target**: 15 Candidates (actively job searching), 10 Recruiters/Talent Acquisition Managers.
- **Format**: 45-minute semi-structured Zoom interviews.
- **Goal**: Understand emotional drivers, current workflows, and pain points.

**B. Prototype Testing (Validation)**
- **Target**: 20 Recruiters.
- **Format**: Unmoderated testing using a high-fidelity Figma prototype of a candidate's 1IMP profile.
- **Goal**: Track eye movement (where do they look first?) and time-to-comprehension. Do they find the PDF download?

**C. The "Fake Door" Test (Quantitative Demand)**
- **Target**: Broad candidate market.
- **Format**: A simple landing page explaining 1IMP's value prop with a "Join Waitlist" CTA. Drive $500 of LinkedIn/Twitter ads to it.
- **Goal**: Measure Conversion Rate (Click → Waitlist). Target: >15%.

### 3. Key Interview Questions

**For Candidates:**
- Walk me through the last time you applied for a job and felt you were perfectly qualified, but heard nothing back. How did that make you feel?
- How long did you spend formatting your current resume?
- If you had 60 seconds to pitch yourself to a hiring manager, what would you say that isn't on your resume?

**For Recruiters:**
- Open your inbox right now. Show me the last cold outreach from a candidate that actually made you stop and look. Why did it work?
- What are the first 3 things you look for when scanning a candidate's profile?
- If a candidate sent you a link to a web profile instead of a PDF, what is your immediate reaction?

---

## PHASE 5: USER PERSONAS

We are designing a two-sided experience. The product is *for* the Candidate (User), but it is *designed to impress* the Recruiter (Audience).

### 5.1 The Primary User: Candidates

We are not targeting entry-level, low-intent job seekers. We are targeting ambitious professionals who understand the value of their personal brand.

#### Persona 1: The Frustrated High-Performer ("Alex")
- **Profile**: Mid-to-Senior level (Design, Product, Engineering, Marketing).
- **The Pain**: Alex is exceptionally good at their job, but their resume looks exactly like the resume of someone who is average. They apply to 50 jobs, get 1 interview, and feel demoralized.
- **The Motivation**: "I just need to get in the room. If I get the interview, I can win the job. But I can't get past the ATS or the 5-second recruiter scan."
- **How 1IMP Wins Them**: By offering a format that finally reflects their actual caliber. The premium design validates their self-worth.

#### Persona 2: The Career Pivot ("Jordan")
- **Profile**: Transitioning industries or roles (e.g., Teacher → UX Designer, or Sales → Customer Success).
- **The Pain**: Traditional resumes are chronological and highlight past experience, which hurts Jordan. They need to tell a *story* about transferable skills, not just list past jobs.
- **The Motivation**: "I need someone to understand *why* my past experience makes me perfect for this new role, even if the job titles don't match."
- **How 1IMP Wins Them**: The AI Summary and Career Story features allow Jordan to frame the narrative before the recruiter looks at the timeline.

### 5.2 The Primary Audience: Recruiters & Hiring Managers

Recruiters are overwhelmed. They do not want more steps. They want higher signal-to-noise.

#### Persona 3: The Overwhelmed Sourcer ("Sarah")
- **Profile**: Agency recruiter or internal TA at a high-growth startup.
- **The Pain**: Sarah receives 300 applications for a single Product Manager role. She has 4 hours to review them all. That's 48 seconds per candidate.
- **The Motivation**: "I don't want to read a wall of text. I want to know immediately: Do they have the skills? Have they worked at relevant companies? Are they a culture fit?"
- **How 1IMP Wins Them**: By presenting the most critical information (Summary, Top Skills, Recent Roles) in a beautifully structured, instantly scannable format. 1IMP saves Sarah time.

#### Persona 4: The Discerning Hiring Manager ("David")
- **Profile**: VP of Engineering or Design Director. Makes the final call.
- **The Pain**: David is handed a shortlist of 5 candidates by Sarah. They all look technically qualified. He needs to figure out who has the right communication skills and drive.
- **The Motivation**: "I'm hiring a person, not a list of skills. I need to get a sense of how they think and communicate."
- **How 1IMP Wins Them**: The optional Video Pitch and the personalized Career Story give David a sense of the candidate's "soft skills" and personality before the first interview, saving him from wasting time on bad culture fits.

---

## 6. Persona Mapping to Product Features

| Feature | Primary Beneficiary | Core Need Addressed |
|---------|---------------------|---------------------|
| AI Summary | Recruiter (Sarah) | Rapid comprehension; answers "Who is this?" immediately. |
| Premium Design | Candidate (Alex) | Confidence; feeling that their presentation matches their competence. |
| Narrative Control | Candidate (Jordan) | Ability to frame career pivots or unconventional paths. |
| Scannable Timeline| Recruiter (Sarah) | Fast validation of experience without digging through bullet points. |
| Video Pitch (Optional)| Hiring Manager (David)| Assessing communication skills and personality early. |

---

## Phase 4 & 5 Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Target Candidate | Ambitious, mid-to-senior professionals | They feel the pain of generic resumes the most and are willing to invest effort (and eventually money) to stand out. |
| Recruiter Need | Speed & Signal (Not Depth) | Recruiters don't want to read *more*, they want to understand *faster*. The UX must reflect this. |
| Prototype Testing | Eye-tracking & Time-to-comprehension | Validates the core premise: Can a recruiter understand the candidate in 10 seconds? |

---

> **Awaiting approval to proceed to Phase 6 & 7: Customer Journey & Information Architecture**
>
> In the next phases, we will map exactly how the user moves through the product from discovery to first share, and define the structural hierarchy of the application.
