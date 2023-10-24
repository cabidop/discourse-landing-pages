import Component from "@ember/component";
import { action } from "@ember/object";
import { or } from "@ember/object/computed";
import { extractError } from "discourse/lib/ajax-error";
import discourseComputed from "discourse-common/utils/decorators";
import I18n from "I18n";
import LandingPageMenu from "../models/landing-page-menu";

export default Component.extend({
  updatingMenu: or("destroyingMenu", "savingMenu"),

  @discourseComputed("menu.name")
  menuTitle(name) {
    return name ? name : I18n.t("admin.landing_pages.menu.default");
  },

  updateProps(props = {}) {
    const menus = props.menus || this.menus;
    this.set("menus", menus);
    this.updateMenus(menus);

    let menu;
    if (props.menu) {
      menu = LandingPageMenu.create({
        ...props.menu,
        json: JSON.stringify(props.menu.items || undefined, null, 4),
      });
    }
    this.set("menu", menu);
  },

  showMessage(style, icon, text) {
    this.set("resultMessage", {
      style: style,
      icon: icon,
      text: text,
    });
    setTimeout(() => this.set("resultMessage", null), 5000);
  },

  @action
  createMenu() {
    this.updateProps({ menu: {} });
  },

  @action
  changeMenu(menuId) {
    if (menuId) {
      LandingPageMenu.find(menuId)
        .then((result) => this.updateProps(result));
    } else {
      this.updateProps();
    }
  },

  @action
  saveMenu() {
    this.set("savingMenu", true);

    this.menu
      .save()
      .then((result) => {
        if (result) {
          this.updateProps(result);
        }
      })
      .catch((error) => this.showMessage("error", "times", extractError(error)))
      .finally(() => this.set("savingMenu", false));
  },

  @action
  destroyMenu() {
    this.set("destroyingMenu", true);

    this.menu
      .destroy()
      .then((result) => {
        if (result.success) {
          this.updateProps(result);
        }
      })
      .catch((error) => this.showMessage("error", "times", extractError(error)))
      .finally(() => this.set("destroyingMenu", false));
  },
});
