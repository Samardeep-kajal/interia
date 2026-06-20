import { LitElement, html, css } from "lit";
import "../styles/tokens.css";
import { customElement, property } from "lit/decorators.js";
import {
  logMotionTransition,
  createMotionOverlay,
  showMotionOverlay,
  hideMotionOverlay,
  destroyMotionOverlay,
} from "../utils/motion-debugger";

@customElement("it-toggle")
export class ItToggle extends LitElement {
  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, attribute: "debug-motion", reflect: true })
  debugMotion = false;

  private _currentState = "idle";
  private _debugOverlay: HTMLElement | null = null;

  /**
   * Lazily creates the debug overlay inside the Shadow DOM the first time
   * it is needed. This avoids any DOM cost when debug-motion is not set.
   */
  private getOrCreateOverlay(): HTMLElement {
    if (!this._debugOverlay) {
      this._debugOverlay = createMotionOverlay();
    }
    return this._debugOverlay;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._debugOverlay) {
      destroyMotionOverlay(this._debugOverlay);
      this._debugOverlay = null;
    }
  }

  private updateState(nextState: string) {
    if (this._currentState === nextState) return;
    const oldState = this._currentState;
    this._currentState = nextState;
    if (this.debugMotion) {
      logMotionTransition(
        this,
        oldState,
        nextState,
        "--it-motion-duration-fast",
        "--it-motion-ease-standard",
        ["background-color", "transform", "box-shadow"]
      );
      const overlay = this.getOrCreateOverlay();
      if (nextState !== "idle") {
        showMotionOverlay(
          overlay,
          this,
          nextState,
          "--it-motion-duration-fast",
          "--it-motion-ease-standard"
        );
      } else {
        hideMotionOverlay(overlay);
      }
    }
  }

  private handleMouseEnter() {
    this.updateState("hover");
  }

  private handleMouseLeave() {
    const isFocused = this.shadowRoot?.querySelector(".control") === this.shadowRoot?.activeElement;
    this.updateState(isFocused ? "focus" : "idle");
  }

  private handleMouseDown() {
    this.updateState("active");
  }

  private handleMouseUp() {
    this.updateState("hover");
  }

  private handleFocus() {
    this.updateState("focus");
  }

  private handleBlur() {
    this.updateState("idle");
  }

  static styles = css`
    :host {
      display: inline-block;
      position: relative; /* anchors the absolutely-positioned debug overlay */
    }

    .control {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    .track {
      position: relative;
      box-sizing: border-box;
      width: 40px;
      height: 22px;
      border-radius: 999px;
      background-color: var(--it-color-border);
      padding: 2px;
      transition:
        background-color var(--it-motion-duration-fast)
          var(--it-motion-ease-standard);
    }

    .thumb {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 18px;
      height: 18px;
      border-radius: 999px;
      background-color: var(--it-color-neutral-0);
      box-shadow: 0 1px 3px rgba(15, 23, 42, 0.35);
      transform: translateX(0);
      transition:
        transform var(--it-motion-duration-fast)
          var(--it-motion-ease-standard),
        box-shadow var(--it-motion-duration-fast)
          var(--it-motion-ease-standard);
    }

    :host([checked]) .track {
      background-color: var(--it-color-primary);
    }

    :host([checked]) .thumb {
      transform: translateX(18px);
    }

    .control:focus-visible {
      outline: none;
    }

    .control:focus-visible .track {
      box-shadow: 0 0 0 3px var(--it-color-focus-ring);
    }
  `;

  private toggleChecked() {
    const next = !this.checked;
    this.checked = next;

    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { checked: next },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleClick(e: MouseEvent) {
    e.preventDefault();
    this.toggleChecked();
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === " " || e.code === "Space" || e.key === "Spacebar") {
      e.preventDefault();
      this.toggleChecked();
    }
  }

  render() {
    return html`
      <div
        class="control"
        role="switch"
        aria-checked=${this.checked ? "true" : "false"}
        tabindex="0"
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
        @mousedown=${this.handleMouseDown}
        @mouseup=${this.handleMouseUp}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
      >
        <div class="track">
          <div class="thumb"></div>
        </div>
      </div>
    `;
  }
}

