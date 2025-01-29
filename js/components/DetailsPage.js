import { html } from "../../node_modules/lit-html/lit-html.js";
import { Header } from "./Header.js";
import { filterTabsAndOrigin, sendMessageHandler } from "../MessageHelpers.js";
export const DetailsPage = (data) => {
  const onClick = sendMessageHandler(
    filterTabsAndOrigin(async (tab) => {
      const details = await chrome.tabs.sendMessage(tab.id, {
        command: "detail",
      });
      data.store.transformValue((data) => {
        data.details = details;
        return data;
      });
    }),
  );

  if (data.tabUrl?.includes("post.php")) {
    return html`
      ${Header(data)}
      <main>
        <h1>Details</h1>
      </main>
      <p>Details are not available in the editor</p>
    `;
  }

  return html`
    ${Header(data)}
    <main>
      <h1>Details</h1>
    </main>
    <button @click=${onClick}>Get Details</button>
    ${data.details
      ? data.details.map((e) =>
          e.status == "OK"
            ? html`<h2>${e.title}</h2>
                <p>${e.data.content}</p>`
            : html`<h2>${e.title}</h2>
                <p>${e.message}</p>`,
        )
      : null}
  `;
};
