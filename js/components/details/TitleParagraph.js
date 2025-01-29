import { html } from "../../../node_modules/lit-html/lit-html.js";

export const TitleParagraph = (detail) => {
  const { data } = detail;
  return html`
    <h2>${detail.title}</h2>
    <p>${data.content}</p>
  `;
};
