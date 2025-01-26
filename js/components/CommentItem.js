import { html } from "../../node_modules/lit-html/lit-html.js";
export const CommentItem = ({ body, user, postedDateTime }) => {
  return html`<li>
    <time>${new Date(postedDateTime).toDateString()}</time>
    <strong>${user.firstName} ${user.lastName}</strong>: ${body}
  </li>`;
};
