# frozen_string_literal: true

class LandingPages::MenusController < LandingPages::AdminController
  before_action :find_menu

  def show
    render_menu(@menu)
  end

  def update
    @menu.set(menu_params)
    @menu.save
    render_menu(@menu, include_menus: true)
  end

  protected

  def menu_params
    load_params = params.permit(:name)
    load_params[:items] = params[:items] if params[:items]
    load_params.permit!.to_h
  end
end
