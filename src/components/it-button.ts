import { LitElement, html, css } from "lit";
import "../styles/motion.css";
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
      transition:
        transform var(--it-motion-duration-fast) var(--it-motion-ease-standard),
        background-color var(--it-motion-duration-base)
          var(--it-motion-ease-standard);
    }

    button:hover:not(:disabled) {
      transform: translateY(-1px);
    }

    button:active:not(:disabled) {
      transform: scale(var(--it-motion-scale-press));
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.6;
      transform: none;
    }

    @media (prefers-reduced-motion: reduce) {
      button {
        transition: none;
        transform: none;
      }
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
