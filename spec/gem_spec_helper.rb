require 'rails_helper'
gem_dir = Gem::Specification.find_by_name('cw_locations').gem_dir
require(gem_dir + '/spec/factories/locations.rb')
