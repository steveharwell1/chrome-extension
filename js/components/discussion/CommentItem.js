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
    <time>${new Date(postedDateTime).toDateString()}</time>
    <button class="comment-item__button" @click=${addByUser(user)}>
      ${user.firstName} ${user.lastName}</button
    >: ${body}
  </li>`;
};
