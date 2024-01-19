# frozen_string_literal: true

class LandingPages::MenusController < LandingPages::AdminController
  before_action :find_menu

  def show
    render_menu(@menu)
  end
end
