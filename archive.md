<!-- I dont want this processed! -->
----------
layout: default
title: Archive - All Posts
----------

{% for post in paginator.posts %}
<article>
    <h4>
        <a href="{{ post.url }}">{{ post.title }}</a>
    </h4>
    {% if post.category == "photo" %}
        {% include flickrimage.html %}
    {% else %}
        <!-- FIXME -->
        {{ post.content }}
    {% endif %}

    {% include endmatter.html %}

</article>
{% endfor %}

<table id="pagination">
    <tr>
        <td class="left">
            <li class="left">
                {% if paginator.next_page %}
                <a href="/Website/page{{paginator.next_page}}">Older Posts</a>
            {% else %}
                No Older Posts
            {% endif %}
            </li>
        </td>
        <td class="center">
            Page: {{paginator.page}} of {{paginator.total_pages}}
        </td>
        <td class="right">
            {% if paginator.previous_page %}
                <li class="right">
                    {% if paginator.previous_page == 1 %}
                    <a href="/Website/">Newer Posts</a>
                    {% else %}
                    <a href="/Website/page{{ paginator.previous_page }}">
                        Newer Posts</a>
                    {% endif %}
                </li>
            {% else %}
                <li class="right">No Newer Posts</li>
            {% endif %}
        </td>
    </tr>
</table>
