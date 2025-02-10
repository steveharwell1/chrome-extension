import { html } from "../../node_modules/lit-html/lit-html.js";
import { CommentsList } from "./discussion/CommentsList.js";
import { RecipientList } from "./discussion/RecipientList.js";
import { Header } from "./Header.js";
import { addMessageToTask, getTaskCommentsJSON } from '../NetworkHelpers.js';
export const DiscussionPage = (data) => {
    const onSubmit = async (e) => {
        e.preventDefault();
        const area = document.querySelector('.js-comment-field__input');
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
    const clearAll = data.store.transformValueHOF((data) => {
      data.recipients = []
      return data
  })

    console.log(data.teamworkData)
  return html`
    ${Header(data)}
    <main>
      <h1>Discussion on Teamwork</h1>
      ${data?.twId
        ? html`<a class="open-card"
            href="https://tamuc.teamwork.com/app/tasks/${data?.twId}"
            target="_blank"
            >Open Card in New Tab</a
          >`
        : null}
      ${data?.twId
        ? html`
        <form class="comment-field" @submit=${onSubmit}>
          <textarea class="js-comment-field__input" placeholder="Add your comment here"></textarea>
         
         </form> 
          Who should be notified? <button class="clear-recipients-list" @click=${clearAll}>(Remove All)</button>
          ${data.recipients
          ? RecipientList(data)
          : null}
          `
        : null}
         <button @click=${onSubmit} type=submit value="submit-comment">Submit</button>
      <h2>Comments</h2>
      ${data.teamworkData
        ? CommentsList(data)
        : html`<p>Loading....</p>`}

        
    </main>
  `;
};
