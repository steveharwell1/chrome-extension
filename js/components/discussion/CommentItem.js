import { html } from "../../../node_modules/lit-html/lit-html.js";

const formatBody = (body) => {
  const m = body.match(/@\w+/)
  if(m) {
      return [body.slice(0, m.index), html`<span class="comment-item__mention">${m[0]}</span>`, ...formatBody(body.slice(m.index + m[0].length))]
  } else {
      return [body]
  }
}


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
  <img class="comment-list__img" src=${user.avatarUrl} />
  ${user.firstName} ${user.lastName}</button> 
  <time>${new Date(postedDateTime).toDateString()}</time>
 
  <div class="comment-item__body">${formatBody(body)}</div>
  
  </li>`;
};
