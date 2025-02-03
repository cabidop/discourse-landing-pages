# frozen_string_literal: true

class LandingPageConstraint
  def matches?(request)
    page_path =
      request.path_parameters[:path] ||
        SiteSetting.landing_page_as_home_path if SiteSetting.landing_page_as_home_enabled
    LandingPages::Page.exists?(page_path, attr: "path")
  end
end
