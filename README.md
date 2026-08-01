# [mball.co](https://mball.co)

## (michaelball.co and michaelballphoto.com)

[![Run all page tests](https://github.com/cycomachead/cycomachead.github.io/actions/workflows/rspec.yml/badge.svg)](https://github.com/cycomachead/cycomachead.github.io/actions/workflows/rspec.yml)
[![Deploy Jekyll site to Pages](https://github.com/cycomachead/cycomachead.github.io/actions/workflows/jekyll.yml/badge.svg)](https://github.com/cycomachead/cycomachead.github.io/actions/workflows/jekyll.yml)

A personal & professional website.

This is both a professional "academic" website, as well as place to host some photos and possibly
other writing.

## Tools

* The site is built with Jekyll and hosted on GitHub Pages
* Lots of inspiration was taken from the sites 'academicpages' and 'al-folio'
* Accessibility is checked on every push with axe-core, RSpec and Capybara

## Local development

Ruby and Node versions come from `.tool-versions`.

```bash
npm ci            # Bootstrap + Font Awesome, imported by the Sass build
bundle install
bundle exec jekyll serve
```

`npm ci` is not optional: `assets/styles/milo.scss` imports Bootstrap and Font
Awesome straight out of `node_modules/`, and `_plugins/copy_to_dest.rb` copies
the Font Awesome webfonts and the Bootstrap JS bundle into `_site`.

### Tests and linters

```bash
bundle exec rspec     # accessibility tests, every page in sitemap.xml
bundle exec rubocop   # Ruby in _plugins/ and spec/
```

* [docs/accessibility.md](docs/accessibility.md) — what the a11y suite checks, how to run and configure it
* [docs/continuous-integration.md](docs/continuous-integration.md) — the GitHub Actions workflows

## Licence

All HTML and 'code' is licensed under BSD 3.
All images and writings (other 'creative' content) are licensed as
Creative Commons 3.0 BY-NC-ND unported. This includes the overall
'feel' of my site and its theme.

I don't host images or photoshop files on GitHub (well, not most of them),
so feel free to check out my [Flickr profile](https://www.flickr.com/cycomachead)
or email me if you're interested in working with something.

If you like what I do, I'm game! :-)
