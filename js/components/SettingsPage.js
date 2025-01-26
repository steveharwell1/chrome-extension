import { html } from "../../node_modules/lit-html/lit-html.js";
import { Header } from "./Header.js";
export const SettingsPage = (data) => {
  const onChange = (e) => {
    localStorage.setItem("teamworkKey", e.currentTarget.value);
    console.log({ local: localStorage.getItem("teamworkKey") });
    data.store.transformValue((e) => e);
  };
  return html`
    ${Header(data)}
    <main>
      <h1>Settings</h1>
      <label
        >API Key<input type="password" @change=${onChange} @keyup=${onChange} />
      </label>
    </main>
  `;
};
