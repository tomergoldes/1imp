# 1IMP — Phase 10 & 11: UI & Design System

> **Status**: Phase 10 & 11 Complete — Awaiting approval to proceed to Phase 12

---

## The VP Design & Design System Architect's Mandate

> "Good UI is invisible. Great UI is a physical sensation.
> We are not building a dashboard. We are building a glass-and-ink display that happens to live in a browser."

Phase 10 (UI) defines the visual execution. Phase 11 (Design System) codifies it into scalable, reusable tokens and components. This ensures engineering can build at velocity without degrading the premium aesthetic.

---

## PHASE 10: USER INTERFACE (UI) DIRECTION

We execute against the Brand Strategy (Phase 2) using a visual language inspired by Apple, Linear, and Vercel.

### 10.1 The Visual Language: "Luminous Ink"

**1. Depth & Elevation**
We abandon traditional drop shadows. Traditional shadows look like paper. We want it to look like glass and light.
- Depth is achieved through **layered opacity**, **border glows**, and **background blurring (glassmorphism)**.
- Elevated elements (like modals or floating action bars) have a subtle `1px` inner border (rgba white 10%) to catch imaginary overhead light.

**2. Contrast & Subtlety**
- We never use pure `#FFFFFF` for text on dark mode. It causes optical halation (blooming). Primary text is `#F0EFF8` (a soft, cool off-white).
- Secondary information is aggressively muted (`#8888AA`). If everything is loud, nothing is heard.

**3. The "Impression Glow"**
- The brand accent color (`#7C6AF7` - Electric Indigo) is used sparingly.
- When an element is active (like the AI Generate button), it doesn't just change color; it emits a soft, diffuse glow behind it.

### 10.2 UI Execution: The Split-Screen Editor

**Left Pane (The Workshop):**
- Background: `#0A0A0F` (Void).
- Inputs: Fill-based, not border-based. Background `#16162A`, borderless until focused.
- Focus State: A sharp `1px` border of `#7C6AF7` (Impression) + a soft outer glow.
- Typography: Utilitarian. Inter for all labels.

**Right Pane (The Stage / Live Preview):**
- Background: `#0F0F1A` (Ink) — slightly lighter than the left pane to establish hierarchy.
- The Profile Card: Floats in the center. Uses a subtle noise texture overlay (opacity 2%) to give the background physical texture (reduces the "flat SaaS" look).
- Typography: Expressive. Syne for the headline and summary.

---

## PHASE 11: THE DESIGN SYSTEM (TOKENS)

This system will be built using Vanilla CSS / CSS Modules (or Tailwind if configured strictly to these tokens, but we prefer custom CSS for precise control over glow/blur effects).

### 11.1 Color Tokens (CSS Variables)

```css
:root {
  /* Backgrounds */
  --bg-void: #0A0A0F;
  --bg-ink: #0F0F1A;
  --bg-surface: #16162A;
  --bg-surface-hover: #1E1E35;
  
  /* Accents */
  --accent-impression: #7C6AF7;
  --accent-impression-hover: #9D8FF8;
  --accent-signal: #F0A05A; /* Warnings, CTAs */
  
  /* Text */
  --text-primary: #F0EFF8;
  --text-secondary: #8888AA;
  --text-muted: #55556A;
  --text-inverse: #0A0A0F;
  
  /* Borders */
  --border-subtle: rgba(255, 255, 255, 0.05);
  --border-strong: rgba(255, 255, 255, 0.12);
  --border-accent: rgba(124, 106, 247, 0.5);
}
```

### 11.2 Typography Tokens

```css
:root {
  --font-display: 'Syne', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Fluid Typography Scale (Clamp) for responsiveness */
  --text-hero: clamp(3rem, 5vw, 4.5rem);   /* 48px -> 72px */
  --text-h1: clamp(2rem, 3vw, 3.5rem);     /* 32px -> 56px */
  --text-h2: clamp(1.5rem, 2vw, 2.5rem);   /* 24px -> 40px */
  --text-h3: clamp(1.25rem, 1.5vw, 2rem);  /* 20px -> 32px */
  
  --text-body-lg: 1.125rem; /* 18px */
  --text-body-md: 1rem;     /* 16px */
  --text-body-sm: 0.875rem; /* 14px */
  --text-caption: 0.75rem;  /* 12px */
}
```

### 11.3 Radii & Spacing

```css
:root {
  /* We use highly rounded corners to offset the dark, technical colors */
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-pill: 9999px;
  
  /* 8pt Grid System */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;
}
```

### 11.4 Elevation & Effects (The "Glass" aspect)

```css
:root {
  /* Inner light for elevated components */
  --ring-inner-light: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
  
  /* Elevation levels (Shadows + Inner Light) */
  --elevation-1: 0 4px 12px rgba(0, 0, 0, 0.2), var(--ring-inner-light);
  --elevation-2: 0 8px 24px rgba(0, 0, 0, 0.4), var(--ring-inner-light);
  --elevation-float: 0 24px 48px rgba(0, 0, 0, 0.6), var(--ring-inner-light);
  
  /* AI/Magic Glow */
  --glow-impression: 0 0 24px rgba(124, 106, 247, 0.3);
  
  /* Glassmorphism Blur */
  --blur-glass: blur(12px);
}
```

---

## 11.5 Core Component Library (Preview)

**1. The Primary Button**
- Not a solid block of color.
- Background: `rgba(124, 106, 247, 0.1)` (10% Impression).
- Border: `1px solid rgba(124, 106, 247, 0.5)`.
- Text: `#7C6AF7` (Impression).
- Hover: Background fills to 100% Impression, Text turns Void (`#0A0A0F`), subtle glow engages.
- *Why*: Solid buttons feel heavy. This feels light, precise, and tech-forward.

**2. The AI Generation Input**
- When active, a CSS conic-gradient spins slowly on the border (`border-image`), signaling the AI is "thinking."

**3. The Skill Pill (Tag)**
- Background: `#16162A` (Surface).
- Border: `1px solid rgba(255, 255, 255, 0.05)`.
- Text: `#F0EFF8` (Primary).
- Shape: `--radius-pill`.

**4. The Candidate Card (Public Profile)**
- A subtle, semi-transparent border (`rgba(255,255,255, 0.05)`).
- Inner padding: `--space-12` (Massive whitespace).
- Background noise texture (SVG data URI) to prevent color banding on dark monitors.

---

## Phase 10 & 11 Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Shadows vs Light | Use Inner Borders & Glows | Drop shadows on dark mode look dirty. We use `inset` borders to simulate light hitting the top edge of a glass pane. |
| Text Colors | No Pure White | Pure white (`#FFF`) on pure black (`#000`) causes eye strain. We use `#F0EFF8` on `#0A0A0F`. |
| Primary Buttons | Ghost to Solid | Buttons rest in a "ghost" state (colored border, transparent bg) and fill on hover. Keeps the UI looking uncluttered. |
| CSS Architecture | CSS Variables (Tokens) | Enforces strict adherence to the brand palette. Engineering cannot "eyeball" a color. |

---

> **Awaiting approval to proceed to Phase 12: Motion System**
>
> In Phase 12, we will define how these UI components move. We will specify easing curves, transition durations, and choreograph the "Aha Moment" generation sequence to ensure the product feels alive and responsive.
