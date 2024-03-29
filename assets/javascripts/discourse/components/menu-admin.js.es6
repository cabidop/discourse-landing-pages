import Component from "@ember/component";
import { action } from "@ember/object";
import { extractError } from "discourse/lib/ajax-error";
import discourseComputed from "discourse-common/utils/decorators";
import I18n from "I18n";
import LandingPageMenu from "../models/landing-page-menu";

export default Component.extend({
  updatingMenu: false,

  @discourseComputed("menu.name")
  menuTitle(name) {
    return name ? name : I18n.t("admin.landing_pages.menu.default");
  },

  updateProps(props = {}) {
    const menus = props.menus || this.menus;
    this.set("menus", menus);

    let menu;
    if (props.menu) {
      menu = LandingPageMenu.create({
        ...props.menu,
        json: JSON.stringify(props.menu.items, null, 4),
      });
    }
    this.set("menu", menu);
  },

  showErrorMessage(error) {
    this.set("resultMessage", {
      style: "error",
      icon: "times",
      text: extractError(error),
    });
    setTimeout(() => this.set("resultMessage", null), 5000);
  },

  @action
  changeMenu(menuId) {
    if (menuId) {
      LandingPageMenu.find(menuId).then((result) => this.updateProps(result));
    } else {
      this.updateProps();
    }
  },

  @action
  saveMenu() {
    this.setProperties({
      updatingMenu: true,
      jsonError: null,
    });

    try {
      this.menu.items = JSON.parse(this.menu.json);
    } catch (e) {
      this.setProperties({
        updatingMenu: false,
        jsonError: e.message,
      });
      this.showErrorMessage(e);
      return;
    }

    this.menu
      .save()
      .then((result) => {
        if (result) {
          this.updateProps(result);
        }
      })
      .catch((error) => this.showErrorMessage(error))
      .finally(() => this.set("updatingMenu", false));
  },
});
