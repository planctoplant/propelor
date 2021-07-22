require "application_system_test_case"

class SentencesTest < ApplicationSystemTestCase
  setup do
    @sentence = sentences(:one)
  end

  test "visiting the index" do
    visit sentences_url
    assert_selector "h1", text: "Sentences"
  end

  test "creating a Sentence" do
    visit sentences_url
    click_on "New Sentence"

    click_on "Create Sentence"

    assert_text "Sentence was successfully created"
    click_on "Back"
  end

  test "updating a Sentence" do
    visit sentences_url
    click_on "Edit", match: :first

    click_on "Update Sentence"

    assert_text "Sentence was successfully updated"
    click_on "Back"
  end

  test "destroying a Sentence" do
    visit sentences_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Sentence was successfully destroyed"
  end
end
