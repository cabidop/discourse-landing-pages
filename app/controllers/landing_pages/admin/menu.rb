# frozen_string_literal: true

class LandingPages::MenusController < LandingPages::AdminController

  before_action :find_menu, except: [:create]

  def show
    render_menu(@menu)
  end

  def create
    render_menu(LandingPages::Menu.create(menu_params), include_menus: true)
  end

  def update
    @menu.set(menu_params)
    @menu.save
    render_menu(@menu, include_menus: true)
  end

  def destroy
    if @menu && @menu.destroy
      render json: success_json.merge(menus: serialize_menus)
    else
      render json: failed_json
    end
  end

  protected

  def menu_params
    load_params = params.permit(:name)
    load_params[:items] = params[:items] if params[:items]
    load_params.permit!
    load_params.to_h
  end
end
