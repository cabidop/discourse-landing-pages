# frozen_string_literal: true

class LandingPages::InlineController < ApplicationController
  def show
    check_xhr
  end
end
