# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_09_27_165037) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "donors", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "financial_indicators", force: :cascade do |t|
    t.string "code"
    t.string "indicator"
    t.string "category"
    t.string "indicator_type"
    t.string "unit"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "flagship_components", force: :cascade do |t|
    t.integer "flagship_programme_id"
    t.string "name", null: false
    t.text "main_activities"
    t.string "lead"
    t.string "status"
    t.text "milestone"
    t.text "barriers"
    t.text "next_steps"
    t.string "timeframe"
    t.text "support"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "flagship_programmes", force: :cascade do |t|
    t.text "sub_programs"
    t.text "description"
    t.integer "position"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "work_package"
    t.text "outcomes"
    t.integer "flagship_theme_id"
  end

  create_table "flagship_themes", force: :cascade do |t|
    t.string "name", null: false
    t.integer "position", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "historical_emissions_data_sources", force: :cascade do |t|
    t.text "name"
    t.text "display_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "historical_emissions_gases", force: :cascade do |t|
    t.text "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "historical_emissions_gwps", force: :cascade do |t|
    t.text "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "historical_emissions_records", force: :cascade do |t|
    t.bigint "location_id"
    t.bigint "data_source_id"
    t.bigint "sector_id"
    t.bigint "gas_id"
    t.bigint "gwp_id"
    t.jsonb "emissions"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["data_source_id"], name: "index_historical_emissions_records_on_data_source_id"
    t.index ["gas_id"], name: "index_historical_emissions_records_on_gas_id"
    t.index ["gwp_id"], name: "index_historical_emissions_records_on_gwp_id"
    t.index ["location_id"], name: "index_historical_emissions_records_on_location_id"
    t.index ["sector_id"], name: "index_historical_emissions_records_on_sector_id"
  end

  create_table "historical_emissions_sectors", force: :cascade do |t|
    t.bigint "parent_id"
    t.bigint "data_source_id"
    t.text "name"
    t.text "annex_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["data_source_id"], name: "index_historical_emissions_sectors_on_data_source_id"
    t.index ["parent_id"], name: "index_historical_emissions_sectors_on_parent_id"
  end

  create_table "inventory_improvement_projects", force: :cascade do |t|
    t.text "name", null: false
    t.text "sector"
    t.text "objective"
    t.text "partner"
    t.text "donor"
    t.text "outcome"
    t.text "status", null: false
    t.text "timelines"
  end

  create_table "location_members", force: :cascade do |t|
    t.bigint "location_id"
    t.bigint "member_id"
    t.index ["location_id"], name: "index_location_members_on_location_id"
    t.index ["member_id"], name: "index_location_members_on_member_id"
  end

  create_table "locations", force: :cascade do |t|
    t.text "iso_code3", null: false
    t.text "iso_code2", null: false
    t.text "location_type", null: false
    t.text "wri_standard_name", null: false
    t.boolean "show_in_cw", default: true, null: false
    t.text "pik_name"
    t.text "cait_name"
    t.text "ndcp_navigators_name"
    t.text "unfccc_group"
    t.json "topojson"
    t.jsonb "centroid"
  end

  create_table "mitigation_actions", force: :cascade do |t|
    t.integer "mitigation_theme_id"
    t.text "name"
    t.text "objectives"
    t.string "mitigation_type"
    t.string "status"
    t.string "actor"
    t.string "time_horizon"
    t.string "ghg"
    t.string "estimated_emission_reduction"
    t.string "cobenefits"
    t.boolean "quantified_effect"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["actor"], name: "index_mitigation_actions_on_actor"
    t.index ["ghg"], name: "index_mitigation_actions_on_ghg"
    t.index ["status"], name: "index_mitigation_actions_on_status"
  end

  create_table "mitigation_effects", force: :cascade do |t|
    t.string "theme"
    t.string "name"
    t.string "coordinator"
    t.string "effects_1"
    t.string "effects_2"
    t.string "effects_3"
    t.string "effects_4"
    t.string "effects_5"
    t.string "effects_6"
    t.string "effects_7"
    t.string "effects_8"
    t.string "effects_9"
    t.string "effects_10"
    t.string "effects_11"
    t.string "effects_12"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "mitigation_indicators", force: :cascade do |t|
    t.string "code"
    t.string "indicator"
    t.string "unit"
    t.string "cautions"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "mitigation_sectors", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.integer "position"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "mitigation_themes", force: :cascade do |t|
    t.string "title"
    t.integer "position"
    t.integer "mitigation_sector_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "nc_categories", force: :cascade do |t|
    t.integer "category_group_id", null: false
    t.integer "location_id", null: false
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "nc_category_groups", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "nc_category_years", force: :cascade do |t|
    t.integer "year", null: false
    t.integer "category_id", null: false
    t.float "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "nc_indicators", force: :cascade do |t|
    t.string "code", null: false
    t.string "indicator", null: false
    t.string "category"
    t.string "unit"
    t.text "definition"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "priorities", force: :cascade do |t|
    t.integer "location_id", null: false
    t.string "code", null: false
    t.text "value", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "projected_emission_years", force: :cascade do |t|
    t.integer "year"
    t.integer "value"
    t.bigint "projected_emission_id"
    t.index ["projected_emission_id"], name: "index_projected_emission_years_on_projected_emission_id"
  end

  create_table "projected_emissions", force: :cascade do |t|
    t.string "iso"
    t.string "name"
    t.string "type"
    t.string "boundary"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "received_supports", force: :cascade do |t|
    t.integer "donor_id"
    t.string "finance_flow"
    t.string "type_funds"
    t.bigint "amount_zar"
    t.bigint "amount_usd"
    t.string "timeframes"
    t.boolean "focus_area_1", default: false
    t.boolean "focus_area_2", default: false
    t.boolean "focus_area_3", default: false
    t.boolean "focus_area_4", default: false
    t.boolean "focus_area_5", default: false
    t.boolean "focus_area_6", default: false
    t.boolean "focus_area_7", default: false
    t.boolean "focus_area_8", default: false
    t.integer "cofinancing"
    t.text "purpose_funds"
    t.text "program_funds"
    t.text "outcome_funds"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["finance_flow"], name: "index_received_supports_on_finance_flow"
    t.index ["type_funds"], name: "index_received_supports_on_type_funds"
  end

  create_table "support_needs", force: :cascade do |t|
    t.string "category"
    t.string "focus_area"
    t.string "reference"
    t.string "support_type"
    t.string "scheme"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "flagship_components", "flagship_programmes"
  add_foreign_key "flagship_programmes", "flagship_themes"
  add_foreign_key "historical_emissions_records", "historical_emissions_data_sources", column: "data_source_id", on_delete: :cascade
  add_foreign_key "historical_emissions_records", "historical_emissions_gases", column: "gas_id", on_delete: :cascade
  add_foreign_key "historical_emissions_records", "historical_emissions_gwps", column: "gwp_id", on_delete: :cascade
  add_foreign_key "historical_emissions_records", "historical_emissions_sectors", column: "sector_id", on_delete: :cascade
  add_foreign_key "historical_emissions_records", "locations", on_delete: :cascade
  add_foreign_key "historical_emissions_sectors", "historical_emissions_data_sources", column: "data_source_id", on_delete: :cascade
  add_foreign_key "historical_emissions_sectors", "historical_emissions_sectors", column: "parent_id", on_delete: :cascade
  add_foreign_key "location_members", "locations", column: "member_id", on_delete: :cascade
  add_foreign_key "location_members", "locations", on_delete: :cascade
  add_foreign_key "mitigation_actions", "mitigation_themes"
  add_foreign_key "mitigation_themes", "mitigation_sectors"
  add_foreign_key "nc_categories", "locations"
  add_foreign_key "nc_categories", "nc_category_groups", column: "category_group_id"
  add_foreign_key "nc_category_years", "nc_categories", column: "category_id"
  add_foreign_key "priorities", "locations"
  add_foreign_key "projected_emission_years", "projected_emissions"
  add_foreign_key "received_supports", "donors"
end
