# Continuous integration

Workflows live in `.github/workflows/`.

| Workflow | Trigger | What it does |
| --- | --- | --- |
| `jekyll.yml` | push to `main`, manual | Builds the site and deploys it to GitHub Pages |
| `rspec.yml` | any push, manual | Runs the [accessibility tests](accessibility.md) |
| `linters.yml` | pull requests | markdownlint and RuboCop, reported inline via [reviewdog](https://github.com/reviewdog/reviewdog) |

Ruby and Node versions come from `.tool-versions`; `ruby/setup-ruby` and
`actions/setup-node` both read it, so there's one place to bump them.

## Running the linters locally

```bash
bundle exec rubocop              # Ruby: _plugins/, spec/
bundle exec rubocop --autocorrect
npx markdownlint-cli2 '**/*.md'  # Markdown
```

RuboCop only has to be happy about the Ruby in this repo — the Jekyll plugins
in `_plugins/` and the test suite in `spec/`. Its config is `.rubocop.yml`.

markdownlint runs in `diff_context` mode on pull requests, so it only comments
on lines the PR actually changed. `_posts/` holds a decade of imported writing
that would otherwise bury every review.
