import { html } from "../../../node_modules/lit-html/lit-html.js";

export const AltTextImages = (detail) => {
  const { data } = detail;
  return html`
    <h2>${detail.title}</h2>
    ${data.imagesData.map((img) => {
      return html`
        <figure>
            <img src=${img.src}></img>
            <figcaption>${img.alt}</figcaption>
        </figure>
    `;
    })}
  `;
};
