import { html } from "../../node_modules/lit-html/lit-html.js";
import { Header } from "./Header.js";
import { filterTabsAndOrigin, sendMessageHandler } from "../MessageHelpers.js";

export const FeedbackPage = (data) => {
  const onClick = sendMessageHandler(
    filterTabsAndOrigin(async (tab) => {
      const feedback = await chrome.tabs.sendMessage(tab.id, {
        command: "test",
      });
      data.store.transformValue((data) => {
        data.feedback = feedback;
        return data;
      });
    }),
  );

  if (data.tabUrl?.includes("post.php")) {
    return html`
      ${Header(data)}
      <main>
        <h1>Feedback</h1>
      </main>
      <p>Feedback is not available in the editor</p>
    `;
  }

  return html`
    ${Header(data)}
    <main>
      <h1>Feedback</h1>
      <button @click=${onClick}>Run Tests</button>
      ${data.feedback
        ? data.feedback.map(
            (e) =>
              html`<h2>${e.title} <strong class=${e.status === "OK" ? "feedback-item__marker--passed" : "feedback-item__marker--failed"}>${e.status}</strong></h2>
                <p>${e.message}</p>`,
          )
        : null}
    </main>
  `;
};
