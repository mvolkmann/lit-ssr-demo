import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
//import { render } from "@lit-labs/ssr";

//TODO: See https://discord.com/channels/1012791295170859069/1047015641225371718/threads/1440831001927483402
@customElement("hello-world")
export class HelloWorld extends LitElement {
  @property({ type: String, reflect: true }) name = "World";

  render() {
    //return render(html`
    return html`
      <style>
        :host {
          font-family: sans-serif;
        }
      </style>
      <p>Hello, ${this.name}!</p>
    `;
  }
}
