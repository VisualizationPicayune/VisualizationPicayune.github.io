---
layout: post
title: "Fade to Black"
meta: "Contrast studies in D3"
date: 2015-06-08 12:01:01 +05:00
tags: D3 stark
draft: true
custom_js: fade-to-black
---


Black line plot with a "black" grid of various opacities between 1 and 0.01 on a white background.

<div id="examples" style="margin-bottom: 10px"></div>


To my eye, the grid lines get in the way for 1 and 0.5, and are useless at 0.01

<div id="secondary-examples" style="margin-bottom: 10px"></div>

Here's minimalist, starting, D3 JavaScript implementation of just the axes, using the D3 and CSS defaults, which generates the first graph above:
```
```

The final graph above was generated with this JavaScript

```
javascript
```

and the associated additional CSS:
```
css
```


<style>
.axis {
   font: 10px sans-serif;
}

.axis path {
    display: none;
}

.axis line {
    fill: none;
    stroke: #000;
    shape-rendering: crispEdges;
}


/* remove the path (outside box) */
.no-line.y.axis path {
    display: none;
}

.no-line.x.axis path {
    display: none;
}

.line {
  fill: none;
  stroke: black;
}

</style>