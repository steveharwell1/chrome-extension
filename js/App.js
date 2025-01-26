import { render } from "../node_modules/lit-html/lit-html.js";

const contentArea = document.querySelector("body");
export const updateDOM = async (appData) => {
  render(appData.router.View(appData), contentArea);
};


