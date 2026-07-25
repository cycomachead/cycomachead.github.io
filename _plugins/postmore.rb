# frozen_string_literal: true

# Liquid filter that truncates a post at its `<!--more-->` marker and appends a
# "read more" link:
#
#   {{ post.content | postmorefilter: post.url, "Read More" }}
#
# Nothing in _layouts/ calls it today — the templates use `post.excerpt` and
# the `excerpt_separator` set in _config.yml.
module PostMore
  def postmorefilter(input, url, text)
    return input unless input.include?('<!--more-->')

    "#{input.split('<!--more-->').first}\n\n<p class='more'>\n<a href='#{url}'>#{text}</a>\n</p>\n\n"
  end
end

Liquid::Template.register_filter(PostMore)
