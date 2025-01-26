import { html } from "../../node_modules/lit-html/lit-html.js";
import { Header } from "./Header.js";
export const NotFoundPage = (data) => {
  return html`
    ${Header(data)}
    <main>
      <h1>Page Not Found</h1>
    </main>
  `;
};
