import { LitElement, html, css } from "lit";
import "../styles/tokens.css";
import { customElement, property } from "lit/decorators.js";
import { logMotionTransition } from "../utils/motion-debugger";

@customElement("it-button")
export class ItButton extends LitElement {
  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, attribute: "debug-motion", reflect: true })
  debugMotion = false;

  private _currentState = "idle";

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
        ["background-color", "transform"]
      );
    }
  }

  private handleMouseEnter() {
    this.updateState("hover");
  }

  private handleMouseLeave() {
    const isFocused = this.shadowRoot?.querySelector("button") === this.shadowRoot?.activeElement;
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
    }

    button {
      font: inherit;
      padding: 10px 18px;
      border-radius: var(--it-radius-md);
      border: none;
      cursor: pointer;

      background: var(--it-color-primary);
      color: var(--it-color-on-primary);

      transition:
        background-color var(--it-motion-duration-fast)
          var(--it-motion-ease-standard),
        transform var(--it-motion-duration-fast) var(--it-motion-ease-standard);
    }

    button:hover:not(:disabled) {
      background: var(--it-color-primary-hover);
    }

    button:active:not(:disabled) {
      background: var(--it-color-primary-active);
      transform: scale(var(--it-motion-scale-press));
    }

    button:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--it-color-focus-ring);
    }

    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
  `;

  render() {
    return html`
      <button
        ?disabled=${this.disabled}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
        @mousedown=${this.handleMouseDown}
        @mouseup=${this.handleMouseUp}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
      >
        <slot></slot>
      </button>
    `;
  }
}
