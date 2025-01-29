import { html } from "../../../node_modules/lit-html/lit-html.js";

export const FeaturedImage = (detail) => {
  const { data } = detail;
  return html`
        <h2>${detail.title}</h2>
        <img src=${data.src}></img>
    `;
};
