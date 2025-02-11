import { html } from "../../node_modules/lit-html/lit-html.js";
import { Header } from "./Header.js";
import { filterTabsAndOrigin, filterTabsAndOrigin2 } from "../MessageHelpers.js";
function getStatusClasses(feedback) {
    switch(feedback.status) {
        case "OK": return "feedback-item__marker--passed"; 
        case "FAIL": return "feedback-item__marker--failed";
        case "NEUTRAL": return "feedback-item__marker--neutral";
    }
}

function getStatusText(feedback) {
    if(feedback.status === "NEUTRAL") {
        return ""
    } else {
        return feedback.status
    }
}

export const FeedbackPage = (data) => {
  const onClick = filterTabsAndOrigin2(
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
              html`<h2>${e.title} <strong class=${getStatusClasses(e)}>${getStatusText(e)}</strong></h2>
                <p>${e.message}</p>`,
          )
        : null}
    </main>
  `;
};
