# frozen_string_literal: true

# RSpec setup for the accessibility test suite.
# Adapted from https://github.com/berkeley-cdss/berkeley-class-site
#
# See https://rubydoc.info/gems/rspec-core/RSpec/Core/Configuration

# axe-core's bundled JS and this site's content are both UTF-8. On a machine
# with no LANG set, Ruby defaults to US-ASCII and serialising either one into a
# WebDriver request blows up with Encoding::InvalidByteSequenceError.
Encoding.default_external = Encoding::UTF_8

require 'rspec'
require 'rack'
require 'yaml'
require 'webrick'

require 'capybara/rspec'
require 'capybara/dsl'
require 'capybara-screenshot/rspec'
require 'capybara/session'

require 'rack/test'
require 'axe-rspec'
require 'axe-capybara'

require_relative 'support/jekyll'

# Used to set the path for a local webserver.
# Update this if you move this file.
REPO_ROOT = File.expand_path('..', __dir__)

Capybara.register_driver :chrome_headless do |app|
  options = Selenium::WebDriver::Chrome::Options.new
  options.add_argument('--headless=new')
  options.add_argument('--no-sandbox')
  options.add_argument('--disable-dev-shm-usage')
  # MacBook Air ~13" screen size, with an absurd height to capture more content.
  options.add_argument('--window-size=1280,4000')

  Capybara::Selenium::Driver.new(app, browser: :chrome, options:)
end

# Change default_driver to :selenium_chrome if you want to actually see the tests running in a browser locally.
# Should be :chrome_headless in CI though.
Capybara.default_driver = :chrome_headless
Capybara.javascript_driver = :chrome_headless

Capybara::Screenshot.register_driver(:chrome_headless) do |driver, path|
  driver.save_screenshot(path)
end

# Screenshots live under tmp/capybara. save_path MUST be set before the first
# screenshot: capybara-screenshot falls back to Dir.pwd, and its :keep_last_run
# prune strategy runs `FileUtils.rm_rf(Dir.glob("<root>/*.{html,png}"))` —
# which from the repo root deletes index.html, 404.html and archive.html.
Capybara.save_path = File.join(REPO_ROOT, 'tmp', 'capybara')

Capybara::Screenshot.register_filename_prefix_formatter(:rspec) do |example|
  # Highly specific to a11y specs: path-wcag-version
  page = example.example_group.top_level_description.gsub(' is accessible', '')
  standard = example.description.split.last # i.e "meets WCAG 2.1"
  test_case = "#{page}_#{standard}"
  test_case = test_case.gsub(%r{^/}, '').gsub(%r{[/\s+]}, '-')
  test_case = 'index' if test_case.empty?

  "screenshot_#{test_case}"
end

Capybara::Screenshot.autosave_on_failure = true
Capybara::Screenshot.append_timestamp = false
Capybara::Screenshot.prune_strategy = :keep_last_run

# Setup for Capybara to serve static files served by Rack
Capybara.server = :webrick
Capybara.app = Rack::Builder.new do
  use Rack::Lint
  run StaticSite.new(REPO_ROOT)
end.to_app

RSpec.configure do |config|
  # Allow rspec to use `--only-failures` and `--next-failure` flags
  # Ensure that `tmp` is in your `.gitignore` file
  config.example_status_persistence_file_path = 'tmp/rspec-failures.txt'

  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end

  config.shared_context_metadata_behavior = :apply_to_host_groups

  config.include Capybara::DSL
end
