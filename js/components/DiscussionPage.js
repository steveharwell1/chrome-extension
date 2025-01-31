import { html } from "../../node_modules/lit-html/lit-html.js";
import { CommentsList } from "./discussion/CommentsList.js";
import { RecipientList } from "./discussion/RecipientList.js";
import { Header } from "./Header.js";
import { addMessageToTask, getTaskCommentsJSON } from '../NetworkHelpers.js';
export const DiscussionPage = (data) => {
    const onSubmit = async (e) => {
        e.preventDefault();
        const area = e.currentTarget.querySelector('textarea');
        if(!area) {
            return;
        }
        await addMessageToTask(data.twId, area.value, data.recipients);

        const teamworkData = await getTaskCommentsJSON(data.twId);
        data.store.transformValue((data) => {
          data.teamworkData = teamworkData;
          return data;
        });
        area.value = '';
    }

    console.log(data.teamworkData)
  return html`
    ${Header(data)}
    <main>
      <h1>Discussion</h1>
      ${data?.twId
        ? html`<a
            href="https://tamuc.teamwork.com/app/tasks/${data?.twId}"
            target="_blank"
            >Go to Teamwork</a
          >`
        : null}
      ${data?.twId
        ? html`
        <form @submit=${onSubmit}>
          <textarea placeholder="Leave a comment"></textarea>
          <button type=submit value="submit-comment">Submit</button>
        </form>
        ${data.recipients
            ? RecipientList(data)
            : null}
        `
        : null}
      <h2>Comments</h2>
      ${data.teamworkData
        ? CommentsList(data)
        : html`<p>Loading....</p>`}
    </main>
  `;
};
