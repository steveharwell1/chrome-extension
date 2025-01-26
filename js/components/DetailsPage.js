import { html } from "../../node_modules/lit-html/lit-html.js";
import { Header } from "./Header.js";
export const DetailsPage = (data) => {
  return html`
    ${Header(data)}
    <main>
      <h1>Details</h1>
    </main>
  `;
};
