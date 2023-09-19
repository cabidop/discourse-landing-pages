import DiscourseRoute from "discourse/routes/discourse";
import LandingPage from "../models/landing-page";

export default DiscourseRoute.extend({
  model(params) {
    return LandingPage.findBy("path", params.path).catch(() =>
      window.location.replace(params.path)
    );
  },
});
