import { html } from "../../node_modules/lit-html/lit-html.js";
const addRouterData = (location) => (data) => {
  data.currentPage = location;
  return data;
};
export const Header = (data) => {
  const { store } = data;
  return html`
    <header>
      <nav>${data.router.Links(data)}</nav>
    </header>
  `;
};
