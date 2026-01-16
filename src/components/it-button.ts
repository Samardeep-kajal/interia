import { LitElement, html, css } from "lit";

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

      transition: transform 150ms ease, box-shadow 150ms ease;
    }

    button:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    }

    button:active {
      transform: translateY(0);
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
