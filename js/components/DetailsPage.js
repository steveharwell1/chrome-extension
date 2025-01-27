import { html } from "../../node_modules/lit-html/lit-html.js";
import { Header } from "./Header.js";
export const DetailsPage = (data) => {
  const onClick = () => console.log('not implemented')
  return html`
    ${Header(data)}
    <main>
      <h1>Details</h1>
    </main>
      <button @click=${onClick}>Run Tests</button>
      ${data.details
        ? data.details.map((e) => html`<h2>${e.title} <strong>${e.status}</strong></h2><p>${e.data.content}</p>`)
        : null}
  `;
};
