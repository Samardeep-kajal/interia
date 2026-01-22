# Interia

**Motion with Intent.**
Interia is a motion-first UI system for modern web, focused on intentional, restrained interaction design. It treats motion as a functional part of interface behavior, not decoration, ensuring every transition, state change and response serves a purpose.

Built with **Lit**. interia explores how motion can communicate state, hierarchy, and feedback; not just decoration.

## Why Interia

Most UI libraries treat animation as:

- an afterthought
- a CSS snippet
- or a design-only concern

**Interia treats motions as first-class system.**

- Motion communicates intent
- Components feel responsive, not flashy
- Animations are predictable, composable, and accessible

## Tech Stack

- Lit – lightweight, standards-based web components
- TypeScript – strict, explicit APIs
- Vite – fast local development
- Web Components – framework-agnostic by design

Interia components work across frameworks (React, Vue, plain HTML).

## Philosophy

- Motion should communicate affordance, not decoration.
- Disabled or unavailable states should no animate.
- Accessibility and reduced-motion preferences are respected by default.
- Consistency matters more than expressiveness.

### Example by Component

#### `it-button`

A foundational component with restrained motion and accessible defaults.

#### Usage

```
<it-button>Primary Action</it-button>
<it-button disabled>Disabled Action</it-button>
```

#### Behavior Expected

- Hover and press feedback using motion tokens
- Disabled state removes all motion and interaction afforance.

## Status

Interia is currently in early development (v0.1).
APIs may evolve as the system expands.

Contribution and feedback are welcome.
