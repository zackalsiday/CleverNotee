require 'test_helper'

class Api::NoteTagsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_note_tags_index_url
    assert_response :success
  end

  test "should get show" do
    get api_note_tags_show_url
    assert_response :success
  end

  test "should get create" do
    get api_note_tags_create_url
    assert_response :success
  end

  test "should get update" do
    get api_note_tags_update_url
    assert_response :success
  end

  test "should get destroy" do
    get api_note_tags_destroy_url
    assert_response :success
  end

end
