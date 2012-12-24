---
layout: archive
title: Archive
permalink: archive
---

{% for posts in site.posts %}
    {{ post.content }}
{% endfor %}