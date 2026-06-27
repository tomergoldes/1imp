# 1IMP — Phase 9: UX Strategy & Wireframing

> **Status**: Phase 9 Complete — Awaiting approval to proceed to Phase 10

---

## The VP Design & Senior UX Designers' Mandate

> "UI makes people say 'Wow.' UX makes people say 'Of course.'
> Before we make it beautiful, we must make it inevitable."

This phase translates the PRD and Information Architecture into concrete interaction patterns, layout structures, and friction-reducing mechanics. We are designing the invisible skeleton of 1IMP.

---

## 1. Core UX Principles

### 1.1 Friction is the Enemy
Every input field is a tax we levy on the user. We must pay for that tax with immediate, visible value. If the AI can infer it, don't ask for it.

### 1.2 Progressive Disclosure
Never show the user everything at once. The interface should feel like a quiet room that hands you exactly the tool you need, right when you need it, and then hides it again.

### 1.3 The "Live Mirror"
The candidate must never wonder what the final output looks like. The preview is not a button you click; it is a permanent state that reacts to your every keystroke.

---

## 2. Structural Wireframes

### 2.1 The Onboarding Flow (The "Magic Trick")

**Goal:** Get the user from "Create Account" to the "Aha Moment" with zero frustration.

**Wireframe Progression:**
1. **The Welcome Screen**: Single, massive, focused input.
   - Headline: "Let's build your impression."
   - Input: [Upload Resume (PDF/DOCX)] (Massive drop zone, center screen).
   - *UX Detail*: No forms yet. Uploading the file is the highest intent action. Get it immediately.

2. **The Processing Screen**: The AI Loading State.
   - Visual: Subtle pulse animation.
   - Microcopy (rotating): "Reading your history...", "Extracting key achievements...", "Drafting your professional summary...".
   - *UX Detail*: This artificially slows down the process slightly to build perceived value (the "Labor Illusion"). If it's too fast, users won't trust the AI.

3. **The Reveal (The Aha Moment)**:
   - The screen splits. The left side populates with their extracted data. The right side suddenly renders their stunning public profile.
   - Celebration animation (subtle confetti or a soft glow).

### 2.2 The Editor Workspace (Candidate Dashboard)

**Layout Structure:** Split-Screen (Desktop only. Mobile redirects to "View Only" mode with an prompt to use desktop for editing).

**Left Pane (The Workshop) — 40% Width:**
- Stacked accordion or vertical tab layout (Identity, Summary, Skills, Experience).
- Only one section open at a time (Focus).
- Input fields are autosaving (No "Save" buttons anywhere).
- "AI Sparkle" icon next to fields where the AI can regenerate content.

**Right Pane (The Stage) — 60% Width:**
- A high-fidelity, non-interactive render of the public profile.
- Floats in the center of a dark void background.
- Toggle switch at the top center: [Desktop | Mobile] view.

### 2.3 The Public Impression Page (Recruiter View)

**Layout Structure:** Single Column, Center-Aligned, Top-Heavy.

**Zone 1: The Hero (0-3 seconds)**
- Large Avatar (Center).
- `H1`: First Name Last Name.
- `H2`: Target Role.
- `Blockquote`: The AI Professional Summary (Massive, legible typography).
- *UX Detail*: This zone must fit entirely above the fold on a 13-inch laptop.

**Zone 2: Scannable Proof (3-7 seconds)**
- A horizontal scrolling row or tight grid of "Top Skills" (Pill tags).
- A single, prominent block showing the *most recent* job title and company logo.

**Zone 3: The Action Bar (Sticky Bottom or Persistent Right)**
- Primary Button: [Download Resume PDF] (Prominent, high contrast).
- Secondary Button: [Contact via LinkedIn] (Subtle).
- *UX Detail*: By making the PDF download sticky, we relieve recruiter anxiety immediately. They know they can get the file they *need*, which makes them willing to read the page they *want*.

**Zone 4: The Deep Dive (Below the fold)**
- The Career Timeline.
- Minimalist vertical line connecting nodes (jobs).
- AI-reformatted achievement bullets (max 3 per job).

---

## 3. Critical Interaction Details

### 3.1 AI Generation & Editing
When a user clicks the "Regenerate" button on their summary:
- The text field does not blank out.
- A glowing border appears around the field.
- The new text replaces the old text via a subtle crossfade.
- An "Undo" toast appears: "Not quite right? [Revert to previous]".

### 3.2 The Viral Footer (Public Page)
- **Placement**: Fixed to the bottom center of the public page, outside the main content card.
- **Copy**: "Powered by 1IMP. Create your impression →"
- **Interaction**: On hover, the arrow shifts right, and the opacity increases from 50% to 100%. It must feel like an invitation, not an ad.

### 3.3 Empty States
- If a user hasn't added skills: The public page doesn't show an empty "Skills" box; the section simply ceases to exist.
- If a user hasn't uploaded a photo: We use an elegant, typography-based monogram (e.g., a massive, beautiful "A" for Alex), not a generic gray silhouette.

---

## 4. Friction Mitigation Strategies

| Friction Point | Mitigation Strategy |
|----------------|---------------------|
| Login fatigue | Allow exploration of the editor *before* requiring an account (Session-based). Prompt for account creation only when they hit "Publish". |
| Overwhelming forms | Break forms into small, focused, single-concept views. Never show 15 input fields on one screen. |
| AI Anxiety | Always present AI content in an editable text box. Ensure the microcopy says "The AI drafted this for you," not "This is your summary." |
| Mobile Editing | Do not allow complex editing on mobile. Show a beautiful "View only" mode with a magic link to send to their desktop. Frustrating mobile editing kills retention. |

---

## Phase 9 Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Mobile Strategy | Editor is Desktop-first. Viewer is Mobile-first. | Candidates do deep work on laptops. Recruiters scan links on their phones while commuting. Optimize each side for its reality. |
| AI Loading | Artificial Delay ("Labor Illusion") | Instant AI generation feels cheap. A 3-5 second delay with specific loading text ("Analyzing career trajectory...") builds trust and perceived value. |
| Save Mechanics | Autosave everywhere | "Save" buttons are an antiquated mental model. The Live Preview confirms that changes are captured instantly. |
| Empty States | Collapse, don't placeholder | A public profile should never look "incomplete." If data is missing, the layout adapts to hide the gap. |

---

> **Awaiting approval to proceed to Phase 10: UI**
>
> In Phase 10, we will apply the Brand Strategy (Phase 2) to these UX wireframes. We will define the exact visual styling, dark mode execution, typography scales, and UI components that will make 1IMP feel like a premium, expensive product.
