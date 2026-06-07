import { LitElement, html, css } from "lit";
import "../styles/tokens.css";
import { customElement, property } from "lit/decorators.js";

@customElement("it-card")
export class ItCard extends LitElement {
  @property({ type: Boolean, reflect: true })
  elevated = false;

  static styles = css`
    :host {
      display: block;
      opacity: 0;
      transform: translateY(8px);
    }

    :host(.ready) {
      opacity: 1;
      transform: translateY(0);
      transition:
        opacity var(--it-motion-duration-slow) var(--it-motion-ease-emphasized),
        transform var(--it-motion-duration-slow)
          var(--it-motion-ease-emphasized);
    }

    .card {
      background-color: var(--it-color-surface);
      border: 1px solid var(--it-color-border);
      border-radius: var(--it-radius-lg);
      overflow: hidden;
      box-shadow: none;
      transition: box-shadow var(--it-motion-duration-fast)
        var(--it-motion-ease-standard);
    }

    :host([elevated]) .card {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .card:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    }

    .header {
      padding: var(--it-space-md) var(--it-space-md-lg) 0;
    }

    .body {
      padding: var(--it-space-md) var(--it-space-md-lg);
    }

    .footer {
      padding: 0 var(--it-space-md-lg) var(--it-space-md);
    }
  `;

  connectedCallback() {
    super.connectedCallback();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.classList.add("ready");
      });
    });
  }
  render() {
    return html`
      <div class="card">
        <div class="header">
          <slot name="header"></slot>
        </div>
        <div class="body">
          <slot></slot>
        </div>
        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}
