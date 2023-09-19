# frozen_string_literal: true

class LandingPageConstraint
  def matches?(request)
    request.path_parameters.reverse_merge!(path: SiteSetting.homepage)
    LandingPages::Page.exists?(request.path_parameters[:path], attr: "path")
  end
end
