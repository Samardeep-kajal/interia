import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../styles/typography.css";

type TextVariant = "body" | "muted" | "strong";

@customElement("it-text")
export class ItText extends LitElement {
  @property({ type: String })
  variant: TextVariant = "body";

  static styles = css`
    :host {
      font-family: var(--it-font-sans);
      font-size: var(--it-text-md);
      line-height: var(--it-leading-md);
      color: var(--it-text-on-light);
      font-weight: var(--it-weight-regular);
    }

    :host([variant="muted"]) {
      color: var(--it-color-text-muted);
    }

    :host([variant="strong"]) {
      font-weight: var(--it-weight-medium);
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}
