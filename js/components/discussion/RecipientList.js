
import { html } from "../../../node_modules/lit-html/lit-html.js";
export const RecipientList = (data) => {
    const { recipients, store } = data;

    const removeById = (id) => store.transformValueHOF((data) => {
        data.recipients = data?.recipients?.filter((recipient) => recipient.id !== id)
        return data
    })
  return html`<ul class="recipient-list__list">
    ${recipients
      ?.map((recipient) =>
       html`
          <li class="recipient-list__item">
            <img class="recipient-list__img" src=${recipient.avatarUrl} />
            ${recipient.firstName}
            <button @click=${removeById(recipient.id)}>x</button>
          </li>
          ` 
      )}
  </ul>`;
};
