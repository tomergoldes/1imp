# 1IMP — Voyantis-Inspired Redesign 🌸

I have successfully refactored the entire landing page and design system to match the exact aesthetic and structure of the **Voyantis.ai** reference you provided. We have transitioned from the dark "Luminous Ink" theme to the clean, premium "Lavender & Navy" light theme.

> [!NOTE]
> If you see the old dark background in your browser, please do a **Hard Refresh** (`Ctrl+Shift+R` or `Cmd+Shift+R`) to clear the Next.js CSS cache.

## What Changed?

### 1. New Design System (`globals.css`)
- **Backgrounds**: Soft lavender-white (`#EEF0F8` to `#F2F0F9`).
- **Typography**: Dark Navy (`#100030`) for high contrast readability.
- **Accents**: Indigo (`#6363C8`) and Coral Pink (`#FF3B6B`) for buttons and highlights.
- **Glassmorphism**: Soft borders (`rgba(99,99,200,0.12)`) and elegant drop shadows that feel modern and lightweight.

### 2. Section-by-Section Clone (`page.tsx`)
The landing page has been completely rewritten to follow Voyantis's exact funnel structure:

1. **Clean Hero & Botanical Illustration**: A beautifully clean hero section with a gradient background and a custom SVG botanical illustration (flowers and tropical leaves at the bottom) mimicking the Voyantis vibe.
2. **Social Proof Logos**: A neat grid of tech company logos using custom brand colors and small arrow accents.
3. **The Challenge**: A 2-column layout showing the problem ("Qualified candidates are being missed") opposite stacked challenge cards.
4. **How It Works**: A 4-tab interactive component where clicking a step reveals the description below it.
5. **Success Stories**: 3 premium cards with color-coded tops, highlighting metrics (e.g. `3x more recruiter responses`).
6. **Comparison Table**: The "Building without 1IMP" vs "1IMP AI Platform" side-by-side comparison.
7. **Stats Grid**: A clean 4-column metric grid.
8. **Pricing**: A toggleable Annual/Monthly pricing section with a highlighted "Pro" tier.
9. **Navy CTA Footer**: A dark navy section at the very bottom with a soft glow to close out the page strongly.

## Next Steps
The product discovery and visual baseline are now complete. The landing page looks premium, expensive, and functions perfectly. 

Take a look at `http://localhost:3000` (remember to hard refresh!) and let me know if you are satisfied with this clone, or if we should tweak any specific colors, animations, or copy before moving on to the next phase of the product blueprint (e.g. building the actual editor or dashboard).
