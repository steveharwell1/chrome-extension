import { html } from "../../node_modules/lit-html/lit-html.js";
import { Header } from "./Header.js";
export const SettingsPage = (data) => {
  const onClick = (e) => {
    localStorage.setItem(
        "teamworkKey", document.querySelector('#teamworkkey').value
    );
    console.log({ local: localStorage.getItem("teamworkKey") });
    data.store.transformValue((e) => e);
  };
  return html`
    ${Header(data)}
    <main>
      <h1>Settings</h1>
      <label
        >API Key<input id="teamworkkey" type="password" />
      </label>
      <button @click=${onClick}>Set</button>
      <p>Open and close the panel after setting your key.</p>
      <p>
          <a target="_blank" href="https://support.teamwork.com/projects/using-teamwork/locating-your-api-key">Find your API Key</a>
      </p>
    </main>
  `;
};
