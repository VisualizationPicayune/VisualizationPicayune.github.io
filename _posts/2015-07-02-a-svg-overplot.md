---
layout: post
title: "A SVG Overplot"
meta: "A Picayune of JavaScript"
date: 2015-07-02 17:57:01 +05:00
updated: 2015-07-04 13:40:01 +05:00
tags: JavaScript
author: Christopher Michael Buck
comments: false
draft: false
---

To overlay anything with anything else, the structure is:

~~~
<div style="position: relative; height: 30px;">
  <div style="position: absolute;">
    First
  </div>
  <div style="position: absolute;">
    Second
  </div>
</div>
~~~

For this example, the output is:

<div style="position: relative; height: 30px;">
  <div style="position: absolute;">
    First
  </div>
  <div style="position: absolute;">
    Second
  </div>
</div>

Text with an SVG overlay looks similar:

~~~
<div style="position: relative; height: 30px;">
  <div style="position: absolute;">
    First
  </div>
  <svg style="position: absolute;" width="40" height="20">
    <rect x="2" y="2" width="20" height="16" fill="none" stroke="black"/>
  </svg>
</div>
~~~

<div style="position: relative; height: 30px;">
  <div style="position: absolute;">
    First
  </div>
  <svg style="position: absolute;" width="40" height="20">
    <rect x="2" y="2" width="20" height="16" fill="none" stroke="black"/>
  </svg>
</div>

The "height: 30px" style on the outer div is needed because the "position: absolute" blocks are ignored box model [normal flow](http://dev.w3.org/csswg/css2/visuren.html#normal-flow). For a more thorough treatment of overlays, especially text over images, see Chris Coyier's: [Design Considerations: Text on Images](https://css-tricks.com/design-considerations-text-images/)