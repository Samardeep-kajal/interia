/**
 * Interia Motion Debugger — Phases 2.1 & 2.2
 *
 * Phase 2.1: Console logger (logMotionTransition)
 * Phase 2.2: Visual glassmorphic overlay with SVG cubic-bezier curve
 *            (createMotionOverlay, showMotionOverlay, hideMotionOverlay)
 */

// ─── Phase 2.1: Console Logger ───────────────────────────────────────────────

export function logMotionTransition(
  element: HTMLElement,
  fromState: string,
  toState: string,
  durationVar: string,
  easeVar: string,
  properties: string[]
) {
  const styles = window.getComputedStyle(element);
  const durationValue = styles.getPropertyValue(durationVar).trim() || "0ms";
  const easeValue = styles.getPropertyValue(easeVar).trim() || "linear";
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  console.groupCollapsed(
    `%c[Interia Debug] %c${element.tagName.toLowerCase()}%c: %c${fromState}%c ➔ %c${toState}`,
    "color: #1e4fbf; font-weight: bold;",
    "color: #19b5c6; font-weight: bold; font-family: monospace;",
    "color: #475569;",
    "color: #475569; font-weight: bold;",
    "color: #94a3b8;",
    "color: #1e4fbf; font-weight: bold;"
  );
  console.log(
    `%cDuration Token:%c ${durationVar} %c(${durationValue})`,
    "font-weight: bold; color: #475569;",
    "color: #94a3b8;",
    "color: #1e4fbf; font-weight: bold;"
  );
  console.log(
    `%cEasing Token:  %c ${easeVar} %c(${easeValue})`,
    "font-weight: bold; color: #475569;",
    "color: #94a3b8;",
    "color: #1e4fbf; font-weight: bold;"
  );
  console.log(
    `%cProperties:    %c ${properties.join(", ")}`,
    "font-weight: bold; color: #475569;",
    "color: #19b5c6;"
  );
  if (prefersReduced) {
    console.log(
      "%cℹ Accessibility Alert: prefers-reduced-motion is active. Durations forced to 0ms.",
      "color: #f59e0b; font-weight: bold;"
    );
  }
  console.groupEnd();
}

// ─── Phase 2.2: SVG Cubic-Bezier Renderer ────────────────────────────────────

/**
 * Parses a CSS cubic-bezier() string into its four numeric parameters.
 * Returns null if the value is not a valid cubic-bezier expression.
 */
function parseCubicBezier(value: string): [number, number, number, number] | null {
  const match = value.match(
    /cubic-bezier\(\s*([\d.]+)\s*,\s*(-?[\d.]+)\s*,\s*([\d.]+)\s*,\s*(-?[\d.]+)\s*\)/
  );
  if (!match) return null;
  return [
    parseFloat(match[1]),
    parseFloat(match[2]),
    parseFloat(match[3]),
    parseFloat(match[4]),
  ];
}

/**
 * Renders an SVG representation of a cubic-bezier easing curve.
 * The curve maps from (0,0) → (1,1), with control points (x1,y1) and (x2,y2).
 * SVG Y-axis is flipped so the bottom-left is progress=0, top-right is progress=1.
 */
function renderBezierSVG(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): string {
  const W = 116;
  const H = 100;
  const PAD = 14;
  const w = W - PAD * 2;
  const h = H - PAD * 2;

  // Map unit-space coords to SVG pixel coords
  const toSvgX = (t: number) => PAD + t * w;
  const toSvgY = (t: number) => PAD + (1 - t) * h; // flip Y

  const sX = toSvgX(0), sY = toSvgY(0);   // start anchor (0,0)
  const eX = toSvgX(1), eY = toSvgY(1);   // end anchor   (1,1)
  const c1X = toSvgX(x1), c1Y = toSvgY(y1); // control point 1
  const c2X = toSvgX(x2), c2Y = toSvgY(y2); // control point 2

  return `
<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"
     width="${W}" height="${H}" style="display:block;overflow:visible;">
  <!-- Axis lines -->
  <line x1="${sX}" y1="${sY}" x2="${sX}" y2="${eY}"
    stroke="rgba(255,255,255,0.13)" stroke-width="1"/>
  <line x1="${sX}" y1="${sY}" x2="${eX}" y2="${sY}"
    stroke="rgba(255,255,255,0.13)" stroke-width="1"/>
  <!-- Linear reference (diagonal) -->
  <line x1="${sX}" y1="${sY}" x2="${eX}" y2="${eY}"
    stroke="rgba(255,255,255,0.09)" stroke-width="1" stroke-dasharray="3 3"/>
  <!-- Control-point handles -->
  <line x1="${sX}" y1="${sY}" x2="${c1X}" y2="${c1Y}"
    stroke="rgba(25,181,198,0.45)" stroke-width="1" stroke-dasharray="2 2"/>
  <line x1="${eX}" y1="${eY}" x2="${c2X}" y2="${c2Y}"
    stroke="rgba(25,181,198,0.45)" stroke-width="1" stroke-dasharray="2 2"/>
  <!-- The easing curve -->
  <path d="M ${sX} ${sY} C ${c1X} ${c1Y} ${c2X} ${c2Y} ${eX} ${eY}"
    fill="none" stroke="#19b5c6" stroke-width="2.5" stroke-linecap="round"
    stroke-linejoin="round"/>
  <!-- Control point dots -->
  <circle cx="${c1X}" cy="${c1Y}" r="3.5" fill="#19b5c6" opacity="0.85"/>
  <circle cx="${c2X}" cy="${c2Y}" r="3.5" fill="#19b5c6" opacity="0.85"/>
  <!-- Anchor dots -->
  <circle cx="${sX}" cy="${sY}" r="3" fill="white" opacity="0.65"/>
  <circle cx="${eX}" cy="${eY}" r="3" fill="white" opacity="0.65"/>
</svg>`;
}

// ─── Phase 2.2: Overlay Factory & Controller ─────────────────────────────────

const OVERLAY_CSS = `
  .it-dbg {
    position: fixed;          /* lives in document.body — escapes any overflow:hidden ancestor */
    z-index: 99999;
    min-width: 230px;
    pointer-events: none;
    user-select: none;

    /* left / top injected by showMotionOverlay() via getBoundingClientRect() */
    transform: translateX(-50%) translateY(calc(-100% + 6px));

    background: rgba(8, 14, 28, 0.88);
    backdrop-filter: blur(14px) saturate(1.5);
    -webkit-backdrop-filter: blur(14px) saturate(1.5);
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 10px;
    padding: 11px 13px 12px;
    box-shadow:
      0 12px 40px rgba(0,0,0,0.55),
      0 1px 0 rgba(255,255,255,0.05) inset;

    font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', ui-monospace, monospace;
    font-size: 10.5px;
    color: rgba(255,255,255,0.82);
    line-height: 1.5;

    opacity: 0;
    visibility: hidden;
    transition: opacity 130ms ease, transform 130ms ease, visibility 0s 130ms;
  }

  .it-dbg.it-dbg--visible {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(-100%);
    transition: opacity 130ms ease, transform 130ms ease;
  }

  .it-dbg__header {
    display: flex;
    align-items: center;
    gap: 7px;
    margin-bottom: 9px;
  }

  .it-dbg__badge {
    font-size: 8.5px;
    font-weight: 700;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: #6b9fff;
    background: rgba(30,79,191,0.20);
    border: 1px solid rgba(30,79,191,0.38);
    border-radius: 4px;
    padding: 1px 6px 1.5px;
  }

  .it-dbg__state {
    margin-left: auto;
    font-size: 9.5px;
    color: rgba(255,255,255,0.38);
    letter-spacing: 0.04em;
  }

  .it-dbg__state-val {
    color: #19b5c6;
    font-weight: 600;
  }

  .it-dbg__row {
    display: flex;
    align-items: baseline;
    gap: 5px;
    margin-bottom: 2px;
  }

  .it-dbg__lbl {
    color: rgba(255,255,255,0.32);
    font-size: 9.5px;
    min-width: 46px;
  }

  .it-dbg__token {
    color: rgba(255,255,255,0.48);
    font-size: 9.5px;
  }

  .it-dbg__val {
    color: #19b5c6;
    font-size: 9.5px;
    font-weight: 600;
  }

  .it-dbg__divider {
    border: none;
    border-top: 1px solid rgba(255,255,255,0.07);
    margin: 9px 0 8px;
  }

  .it-dbg__curve-lbl {
    font-size: 8.5px;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: rgba(255,255,255,0.28);
    margin-bottom: 7px;
  }

  .it-dbg__svg-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60px;
  }

  .it-dbg__reduced {
    display: none;
    font-size: 9px;
    color: #f59e0b;
    margin-top: 9px;
    padding-top: 7px;
    border-top: 1px solid rgba(245,158,11,0.2);
  }

  .it-dbg__reduced--on {
    display: block;
  }
`;

const OVERLAY_STYLE_ID = "it-dbg-global-styles";

/** Injects the overlay stylesheet into <head> once across the whole page. */
function ensureGlobalStyles() {
  if (document.getElementById(OVERLAY_STYLE_ID)) return;
  const styleEl = document.createElement("style");
  styleEl.id = OVERLAY_STYLE_ID;
  styleEl.textContent = OVERLAY_CSS;
  document.head.appendChild(styleEl);
}

/**
 * Creates the debug overlay element and appends it to document.body so it
 * is completely outside the Shadow DOM and any overflow:hidden ancestors.
 * Call destroyMotionOverlay() in disconnectedCallback to clean up.
 */
export function createMotionOverlay(shadowRoot: ShadowRoot): HTMLElement {
  ensureGlobalStyles();

  const overlay = document.createElement("div");
  overlay.className = "it-dbg";
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML = `
    <div class="it-dbg__header">
      <span class="it-dbg__badge">motion</span>
      <span class="it-dbg__state">state:&nbsp;<span class="it-dbg__state-val">idle</span></span>
    </div>
    <div class="it-dbg__row">
      <span class="it-dbg__lbl">duration</span>
      <span class="it-dbg__token" data-slot="dur-token"></span>
      <span class="it-dbg__val" data-slot="dur-val"></span>
    </div>
    <div class="it-dbg__row">
      <span class="it-dbg__lbl">easing</span>
      <span class="it-dbg__token" data-slot="ease-token"></span>
    </div>
    <div class="it-dbg__row" style="padding-left:51px">
      <span class="it-dbg__val" data-slot="ease-val" style="word-break:break-all;"></span>
    </div>
    <hr class="it-dbg__divider"/>
    <div class="it-dbg__curve-lbl">easing curve</div>
    <div class="it-dbg__svg-wrap" data-slot="svg"></div>
    <div class="it-dbg__reduced" data-slot="reduced">⚠ prefers-reduced-motion active — durations set to 0ms</div>
  `;

  document.body.appendChild(overlay);
  return overlay;
}

/** Removes the overlay from document.body. Call in disconnectedCallback. */
export function destroyMotionOverlay(overlay: HTMLElement) {
  overlay.remove();
}

/**
 * Updates the overlay's content with live token values and renders the SVG curve,
 * then fades the overlay in.
 */
export function showMotionOverlay(
  overlay: HTMLElement,
  element: HTMLElement,
  state: string,
  durationVar: string,
  easeVar: string
) {
  const styles = window.getComputedStyle(element);
  const durationValue = styles.getPropertyValue(durationVar).trim() || "0ms";
  const easeValue = styles.getPropertyValue(easeVar).trim() || "linear";
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Update text slots
  const q = (s: string) => overlay.querySelector(`[data-slot="${s}"]`);
  const stateEl = overlay.querySelector(".it-dbg__state-val");
  if (stateEl) stateEl.textContent = state;
  const durTok = q("dur-token");
  if (durTok) durTok.textContent = durationVar;
  const durVal = q("dur-val");
  if (durVal) durVal.textContent = `(${durationValue})`;
  const easeTok = q("ease-token");
  if (easeTok) easeTok.textContent = easeVar;
  const easeVal = q("ease-val");
  if (easeVal) easeVal.textContent = easeValue;
  const reducedEl = q("reduced");
  if (reducedEl) reducedEl.classList.toggle("it-dbg__reduced--on", prefersReduced);

  // Render the SVG curve
  const svgSlot = q("svg");
  if (svgSlot) {
    const parsed = parseCubicBezier(easeValue);
    if (parsed) {
      const [bx1, by1, bx2, by2] = parsed;
      svgSlot.innerHTML = renderBezierSVG(bx1, by1, bx2, by2);
    } else {
      // Fallback for non-bezier easing (e.g. "linear", "ease")
      svgSlot.innerHTML = `<span style="font-size:9.5px;color:rgba(255,255,255,0.3);font-style:italic;">${easeValue}</span>`;
    }
  }

  // Position the overlay above the component using fixed coords from getBoundingClientRect.
  // This works correctly regardless of scroll, zoom, or overflow:hidden on any ancestor.
  const rect = element.getBoundingClientRect();
  overlay.style.left = `${rect.left + rect.width / 2}px`;
  overlay.style.top = `${rect.top - 10}px`; // 10px gap above the component's top edge
  // CSS transform: translateX(-50%) translateY(-100%) centres it horizontally
  // and lifts it so its bottom aligns with (top - 10px).

  overlay.classList.add("it-dbg--visible");
}

/** Fades the debug overlay out. */
export function hideMotionOverlay(overlay: HTMLElement) {
  overlay.classList.remove("it-dbg--visible");
}
