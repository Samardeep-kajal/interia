import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../styles/typography.css";

@customElement("it-heading")
export class ItHeading extends LitElement {
  @property({ type: Number }) level: 1 | 2 | 3 | 4 = 1;

  static styles = css`
    :host {
      display: block;
      font-family: var(--it-font-sans);
      font-weight: var(--it-heading-weight);
    }

    h1 {
      font-size: var(--it-heading-h1);
      line-height: var(--it-heading-leading-h1);
    }
    h2 {
      font-size: var(--it-heading-h2);
      line-height: var(--it-heading-leading-h2);
    }
    h3 {
      font-size: var(--it-heading-h3);
      line-height: var(--it-heading-leading-h3);
    }
    h4 {
      font-size: var(--it-heading-h4);
      line-height: var(--it-heading-leading-h4);
    }
  `;

  render() {
    switch (this.level) {
      case 2:
        return html`<h2><slot></slot></h2>`;
      case 3:
        return html`<h3><slot></slot></h3>`;
      case 4:
        return html`<h4><slot></slot></h4>`;
      default:
        return html`<h1><slot></slot></h1>`;
    }
  }
}
