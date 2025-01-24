import Component from "@ember/component";
import { action } from "@ember/object";
import { service } from "@ember/service";
import { popupAjaxError } from "discourse/lib/ajax-error";
import LandingPage from "../../models/landing-page";

export default Component.extend({
  dialog: service(),

  @action
  uploadFile() {
    this.set("pageFile", document.getElementById("file-input").files[0]);
  },

  @action
  importPage() {
    let data = new FormData();
    data.append("page", this.pageFile);

    this.set("loading", true);
    LandingPage.import(data)
      .then((result) => {
        this.closeModal(result);
      })
      .catch(function (e) {
        if (typeof e === "string") {
          this.dialog.alert(e);
        } else {
          popupAjaxError(e);
        }
      })
      .finally(() => this.set("loading", false));
  },
});
