/**
 * Utility functions for Interia Motion Debugger console logger and state tracking.
 */

export function logMotionTransition(
  element: HTMLElement,
  fromState: string,
  toState: string,
  durationVar: string,
  easeVar: string,
  properties: string[]
) {
  // Retrieve the computed values of the CSS variables from the element
  const styles = window.getComputedStyle(element);
  const durationValue = styles.getPropertyValue(durationVar).trim() || "0ms";
  const easeValue = styles.getPropertyValue(easeVar).trim() || "linear";

  // Check if reduced motion is active
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  console.groupCollapsed(
    `%c[Interia Debug] %c${element.tagName.toLowerCase()}%c: %c${fromState}%c ➔ %c${toState}`,
    "color: #1e4fbf; font-weight: bold;",
    "color: #19b5c6; font-weight: bold; font-family: monospace;",
    "color: #475569;",
    `color: #475569; font-weight: bold;`,
    "color: #94a3b8;",
    `color: #1e4fbf; font-weight: bold;`
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
