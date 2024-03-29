import EmberObject from "@ember/object";
import { ajax } from "discourse/lib/ajax";
import { popupAjaxError } from "discourse/lib/ajax-error";

const basePath = "/landing/menus";

const LandingPageMenu = EmberObject.extend({
  save() {
    const path = this.id ? `${basePath}/${this.id}` : basePath;
    const method = this.id ? "PUT" : "POST";

    let menu = {
      name: this.name,
      items: this.items,
    };

    return ajax(path, {
      type: method,
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(menu),
    });
  },
});

LandingPageMenu.reopenClass({
  find(menuId) {
    return ajax(`${basePath}/${menuId}`).catch(popupAjaxError);
  },

  create(props = {}) {
    const menu = this._super.apply(this);
    menu.setProperties(props);
    return menu;
  },
});

export default LandingPageMenu;
