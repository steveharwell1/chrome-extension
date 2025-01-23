import {html} from '../../node_modules/lit-html/lit-html.js';
import { CommentsList } from "./CommentsList.js"
import { Header } from './Header.js';
export const DiscussionPage = (data) => {
    return html`
    ${Header(data)}
    <main>
        <h1>Discussion</h1>
        ${data.teamworkData ? CommentsList(data.teamworkData) : html`<p>Loading....</p>`}
    </main>
    `
}

