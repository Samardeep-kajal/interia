import { LitElement, html, css } from "lit";
import { property } from "lit/decorators/property.js";
import "../styles/motion.css";

export class ItButton extends LitElement {
  @property({ type: Boolean, reflect: true })
  disabled = false;

  static styles = css`
    button:disabled {
      pointer-events: none;
      transform: none;
      transition: none;
      opacity: 0.6;
    }
    button {
      font: inherit;
      padding: 0.6rem 1.2rem;
      border-radius: 6px;
      border: none;
      cursor: pointer;

      background: #3b6ef6;
      color: white;

      transition:
        transform var(--it-motion-duration-fast) var(--it-motion-ease-standard),
        background-color var(--it-motion-duration-fast)
          var(--it-motion-ease-standard);
    }

    button:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    }

    button:active:not(:disabled) {
      transform: scale(var(--it-motion-scale-press));
      box-shadow: none;
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

customElements.define("it-button", ItButton);
