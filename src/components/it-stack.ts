import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("it-stack")
export class ItStack extends LitElement {
  @property() direction: "vertical" | "horizontal" = "vertical";
  @property() gap: "xs" | "sm" | "md" | "lg" = "md";
  @property() align: "start" | "center" | "end" | "stretch" = "stretch";
  @property() justify: "start" | "center" | "end" | "between" = "start";

  static styles = css`
    :host {
      display: flex;
    }

    :host ([direction = "vertical"]) {
      flex-direction: column;
    }

    :host([direction="horizontal"]) {
      flex-direction: row;
    }

    :host([gap="xs"]) {
      gap: var(--it-space-xs);
    }
    :host([gap="sm"]) {
      gap: var(--it-space-sm);
    }
    :host([gap="md"]) {
      gap: var(--it-space-md);
    }
    :host([gap="lg"]) {
      gap: var(--it-space-lg);
    }

    :host([align="start"]) {
      align-items: flex-start;
    }

    :host([align="center"]) {
      align-items: center;
    }

    :host([align="end"]) {
      align-items: flex-end;
    }

    :host([align="stretch"]) {
      align-items: stretch;
    }

    :host([justify="start"]) {
      justify-content: flex-start;
    }
    :host([justify="center"]) {
      justify-content: center;
    }
    :host([justify="end"]) {
      justify-content: flex-end;
    }
    :host([justify="between"]) {
      justify-content: space-between;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}
