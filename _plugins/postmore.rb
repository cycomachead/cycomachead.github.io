module PostMore
  def postmorefilter(input, url, text)
    if input.include? "<!--more-->"
      input.split("<!--more-->").first + "\n\n<p class='more'>\n<a href='#{url}'>#{text}</a>\n</p>\n\n"
    else
      input
    end
  end
end

Liquid::Template.register_filter(PostMore)