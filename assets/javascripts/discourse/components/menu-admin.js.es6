import Component from "@ember/component";
import { action } from "@ember/object";
import discourseComputed from "discourse-common/utils/decorators";
import I18n from "I18n";
import LandingPageMenu from "../models/landing-page-menu";

export default Component.extend({
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
        json: JSON.stringify(props.menu.items || undefined, null, 4),
      });
    }
    this.set("menu", menu);
  },

  @action
  changeMenu(menuId) {
    if (menuId) {
      LandingPageMenu.find(menuId).then((result) => this.updateProps(result));
    } else {
      this.updateProps();
    }
  },
});
