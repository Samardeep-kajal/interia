import { LitElement, html, css } from "lit";
import "../styles/motion.css";

export class ItButton extends LitElement {
  static styles = css`
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

    button:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    }

    button:active {
      transform: scale(var(--it-motion-scale-press));
      box-shadow: none;
    }
  `;

  render() {
    return html`
      <button>
        <slot></slot>
      </button>
    `;
  }
}

customElements.define("it-button", ItButton);
