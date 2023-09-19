# frozen_string_literal: true

class InlinePageConstraint
  def matches?(request)
    request.path_parameters.reverse_merge!(path: SiteSetting.homepage)
    LandingPages::Page.path_inline?(request.path_parameters[:path])
  end
end
