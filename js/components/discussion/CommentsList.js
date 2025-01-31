import { html } from "../../../node_modules/lit-html/lit-html.js";
import { CommentItem } from "./CommentItem.js";
export const CommentsList = (data) => {
    console.log({data})
    const { comments, included: { users=[] } } = data.teamworkData;

  return html`<ol>
    ${comments
      ?.map((comment) =>
        CommentItem(data.store, { ...comment, user: users[comment.postedBy] }),
      )
      .reverse()}
  </ol>`;
};
