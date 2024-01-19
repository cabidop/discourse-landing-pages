import EmberObject from "@ember/object";
import { ajax } from "discourse/lib/ajax";
import { popupAjaxError } from "discourse/lib/ajax-error";

const basePath = "/landing/menus";

const LandingPageMenu = EmberObject.extend({});

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
