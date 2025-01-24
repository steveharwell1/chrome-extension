import {html} from '../../node_modules/lit-html/lit-html.js';
import { Header } from './Header.js';
export const SettingsPage = (data) => {
    const onChange = e => {
        localStorage.setItem("teamworkKey", e.currentTarget.value);
        console.log({local: localStorage.getItem('teamworkKey')})
        // Trigger a rerender rather than making another store that saves to localStorage.
        data.store.transformValue(a => a)
    }
    return html`
    ${Header(data)}
    <main>
        <h1>Settings</h1>
        <p>
            <label>
                API Key
                <input type="password" @change=${onChange} @keyup=${onChange} />
            </label>
        </p>
        <p>
            <a href="https://support.teamwork.com/projects/using-teamwork/locating-your-api-key">
                Locate your api key.
            </a>
        </p>
    </main>
    `
}

