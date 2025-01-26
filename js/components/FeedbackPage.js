import { html } from "../../node_modules/lit-html/lit-html.js";
import { Header } from "./Header.js";
export const FeedbackPage = (data) => {
  const onChange = (e) => {
    localStorage.setItem("teamworkKey", e.currentTarget.value);
    console.log({ local: localStorage.getItem("teamworkKey") });
    // Trigger a rerender rather than making another store that saves to localStorage.
    data.store.transformValue((a) => a);
  };
  return html`
    ${Header(data)}
    <main>
      <h1>Feedback</h1>
    </main>
  `;
};
