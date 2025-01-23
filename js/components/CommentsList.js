import {html} from '../../node_modules/lit-html/lit-html.js';
import { CommentItem } from "./CommentItem.js"
export const CommentsList = ({comments, included: {users}}) => {
    return html`<ol>${comments?.map(comment => CommentItem({...comment, user: users[comment.postedBy]})).reverse()}</ol>`
}
