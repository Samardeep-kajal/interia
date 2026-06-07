# Interia — Dev Log & Workspace

> **Tagline:** Motion with intent  
> **Current Version:** v0.3.0  
> **Workspace Status:** Active (Reignited June 2026)

---

## 🛠 Quick Start
To spin up the development sandbox and preview components:
```bash
npm run dev
```
To run compiler and bundle type checks:
```bash
npm run type-check
npm run build
```

---

## 🔍 Codebase Audit (June 2026)

Here is where the core components and stylesheets stand today:

### Components
| Component | Status | Motion / Interaction Polish | Notes |
| :--- | :--- | :--- | :--- |
| [`it-button`](file:///c:/Users/Samardeep/OneDrive/Desktop/Projects/interia/src/components/it-button.ts) | 🟢 Complete | Hover/active states, custom timing, scale-down on active, respects `prefers-reduced-motion`. | High-quality click feel. |
| [`it-toggle`](file:///c:/Users/Samardeep/OneDrive/Desktop/Projects/interia/src/components/it-toggle.ts) | 🟢 Complete | Smooth slider track animation, full keyboard/spacebar accessibility. | Focus ring styled for accessibility. |
| [`it-card`](file:///c:/Users/Samardeep/OneDrive/Desktop/Projects/interia/src/components/it-card.ts) | 🟡 Needs Polish | Initial entry animation (slide-up + fade-in) is nice, but hover shadow is basic. | Entry animation uses nested `requestAnimationFrame` for safety. |
| [`it-heading`](file:///c:/Users/Samardeep/OneDrive/Desktop/Projects/interia/src/components/it-heading.ts) | 🟢 Complete | Static text layout. | Typography conforms to tokens. |
| [`it-text`](file:///c:/Users/Samardeep/OneDrive/Desktop/Projects/interia/src/components/it-text.ts) | 🟢 Complete | Static text layout. | Muted and strong variants ready. |
| [`it-stack`](file:///c:/Users/Samardeep/OneDrive/Desktop/Projects/interia/src/components/it-stack.ts) | 🟡 Needs Polish | Layout primitive. No motion attributes yet. | Check flex attributes layout behavior. |

### Design Tokens & CSS Structure
- [`motion.css`](file:///c:/Users/Samardeep/OneDrive/Desktop/Projects/interia/src/styles/motion.css): **Active.** Configures fast, medium, and slow durations, easing curves (standard, emphasized, decelerate), and reduces transitions to `0ms` under `prefers-reduced-motion`.
- [`visual.css`](file:///c:/Users/Samardeep/OneDrive/Desktop/Projects/interia/src/styles/visual.css): **Active.** Colors, border radius, spacing tokens.
- [`typography.css`](file:///c:/Users/Samardeep/OneDrive/Desktop/Projects/interia/src/styles/typography.css): **Active.** Fonts, weights, text sizes.
- [`tokens.css`](file:///c:/Users/Samardeep/OneDrive/Desktop/Projects/interia/src/styles/tokens.css): **Orphaned / Empty.** Needs to house consolidated CSS variables for primary/neutral colors and general layout scales.

---

## 🗺 Re-ignition Roadmap

We are moving away from arbitrary daily targets and structuring our work around high-impact sprints.

### 🏃 Sprint 1: Token Consolidation & Exports Audit (Completed)
*Goal: Secure a solid foundation, clean build workspace, and verify component consistency.*
- [x] Fix compilation warning in `package.json` by reordering exports (`types` before `import/require`).
- [x] Migrate variable layout structures: decide whether to consolidate `visual.css` and typography tokens into `tokens.css`.
- [x] Implement consistent spacing rhythm and identical border-radius tokens across `it-card` and `it-button`.

### 🏃 Sprint 2: The Motion Debugger (Current)
*Goal: Introduce Interia’s unique differentiator — visual inspection of motion.*
- [ ] Implement `debug-motion` attribute on `<it-button>` and `<it-toggle>`.
- [ ] Expose an overlay or console logger to show the exact cubic-bezier curve, timing parameters, and transition durations in play.
- [ ] Let users visualize the curve standard vs. ease-in.

### 🏃 Sprint 3: The Motion Primitives
*Goal: Create components specifically designed to animate other layout structures.*
- [ ] Build `<it-transition>` primitive using Lit to animate child component enter/exit states.
- [ ] Package 3 standard Motion Recipes (e.g., "Hero Reveal", "Shared Axis Slide").

---

## 📓 Daily Log

### Sun 7 Jun 2026 — Reigniting the Engine
* **Context**: Project reopened after a long break. Reviewed the Enhanced Design & Vision document.
* **Actions**:
  * Audited all Lit components and verified styles compilation.
  * Ran type checks and production builds. Identified exports sorting issues in `package.json`.
  * Fixed `package.json` exports structure so `"types"` is matched first by modern build tools, eliminating bundler warning messages.
  * Re-invented the `DEVLOG.md` file to structure the project status, components list, stylesheets overview, and roadmapped sprints.
* **Next Steps**:
  * Kick off **Sprint 2: Motion Debugger** setup.

### Mon 8 Jun 2026 — Sprint 1 Complete: Token Consolidation
* **Context**: Executed token consolidation to address styling file fragmentation.
* **Actions**:
  * Combined all design system variables into a single, unified [`tokens.css`](file:///c:/Users/Samardeep/OneDrive/Desktop/Projects/interia/src/styles/tokens.css).
  * Deleted deprecated stylesheets (`visual.css`, `typography.css`, and `motion.css`).
  * Updated all Lit components to import `tokens.css` directly.
  * Replaced hardcoded dimensions and radius values in [`it-button.ts`](file:///c:/Users/Samardeep/OneDrive/Desktop/Projects/interia/src/components/it-button.ts) and [`it-card.ts`](file:///c:/Users/Samardeep/OneDrive/Desktop/Projects/interia/src/components/it-card.ts) with respective CSS variable tokens.
  * Corrected `:host` style query target selector syntax in [`it-stack.ts`](file:///c:/Users/Samardeep/OneDrive/Desktop/Projects/interia/src/components/it-stack.ts).
  * Ran type checks and production tsup builds cleanly with zero compile warnings.
* **Next Steps**:
  * Begin implementing the visual `debug-motion` overlay.
