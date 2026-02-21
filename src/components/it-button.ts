import { LitElement, html, css } from "lit";
import "../styles/motion.css";
import "../styles/visual.css";
import { customElement, property } from "lit/decorators.js";

@customElement("it-button")
export class ItButton extends LitElement {
  @property({ type: Boolean, reflect: true })
  disabled = false;

  static styles = css`
    :host {
      display: inline-block;
    }

    button {
      font: inherit;
      padding: 10px 18px;
      border-radius: 10px;
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
      <button ?disabled=${this.disabled}>
        <slot></slot>
      </button>
    `;
  }
}
