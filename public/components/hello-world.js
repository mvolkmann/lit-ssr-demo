import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

class HelloWorld extends LitElement {
  static styles = css`
    :host {
      font-family: sans-serif;
    }
  `;

  static properties = {
    name: { type: String },
  };

  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}

customElement("hello-world")(HelloWorld);
