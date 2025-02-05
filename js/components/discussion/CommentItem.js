import { html } from "../../../node_modules/lit-html/lit-html.js";
export const CommentItem = (store, { body, user, postedDateTime }) => {
  const addByUser = (user) =>
    store.transformValueHOF((data) => {
      data.recipients = data?.recipients.filter(
        (recipient) => recipient.id !== user.id,
      );
      data.recipients.push(user);
      return data;
    });
  return html`<li>
  <button class="comment-item__button" @click=${addByUser(user)}>
  <img class="recipient-list__img" src=${user.avatarUrl} />
  ${user.firstName} ${user.lastName}</button
  > 
  <time>${new Date(postedDateTime).toDateString()}</time>
  <div class="comment-item__body">${body}</div>
  
  </li>`;
};
