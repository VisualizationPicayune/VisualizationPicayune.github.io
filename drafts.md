---
layout: default
permalink: /drafts/
---

<div class="home">

  <h1 class="page-heading">Drafts</h1>

  <table class="post-table">
  <thead>
    <td>date</td>
    <td></td>
    <td>title</td>
  </thead>
  <tbody>
  {% for post in site.posts %}
    {% if post.draft %}
    <tr>
        <td><span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span></td>
        <td class="post-meta">&nbsp;&nbsp;•&nbsp;&nbsp;</td>
        <td><a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a></td>
    </tr>
    {% endif %}
  {% endfor %}
  </tbody>
  </table>

</div>
