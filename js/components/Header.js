import {html} from '../../node_modules/lit-html/lit-html.js';
const addRouterData = (location) => (data) => {
    data.currentPage = location
    return data
}
export const Header = (data) => {
    const {store} = data
    return html`
    <header>
        <nav>
            <a href="#" aria-current="page" @click=${store.transformValueHOF(addRouterData('discussion.html'))}>Discussion</a> | 
            <a href="#" @click=${store.transformValueHOF(addRouterData('details.html'))}>Details</a> | 
            <a href="#" @click=${store.transformValueHOF(addRouterData('feedback.html'))}>Feedback</a> | 
            <a href="#" @click=${store.transformValueHOF(addRouterData('settings.html'))}>Settings</a>
        </nav>
    </header>
    `
}

