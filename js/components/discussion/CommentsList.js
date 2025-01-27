import { html } from "../../../node_modules/lit-html/lit-html.js";
import { CommentItem } from "./CommentItem.js";
export const CommentsList = (data) => {
    console.log({data})
    const { comments, included: { users=[] } } = data;

  return html`<ol>
    ${comments
      ?.map((comment) =>
        CommentItem({ ...comment, user: users[comment.postedBy] }),
      )
      .reverse()}
  </ol>`;
};
