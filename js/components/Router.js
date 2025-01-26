import { html } from "../../node_modules/lit-html/lit-html.js";
export const Router = class Router {
  /** @var array */
  routes = [];
  default_component = (e) => "Page Not Found";

  addRoute(name, path, Component) {
    this.routes.push({ Component, path, name });
  }

  addDefaultComponent(Component) {
    this.default_component = Component;
  }

  View(data) {
    for (const route of this.routes) {
      if (route.path === data.currentPage) {
        return route.Component(data);
      }
    }
    return this.default_component(data);
  }

  Links(data) {
    const addRouterData = (location) => (data) => {
      data.currentPage = location;
      return data;
    };
    return this.routes.map(({ path, Component, name }) => {
      const onClick = (e) => {
        e.preventDefault();
        data.store.transformValue(addRouterData(path));
      };
      return html`<a
        ?current-page=${data.currentPage === path ? "page" : null}
        @click=${onClick}
        href="${path}"
        >${name}
      </a>`;
    });
  }
};
