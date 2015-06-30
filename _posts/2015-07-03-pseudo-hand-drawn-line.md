---
layout: post
title: "Pseudo Hand-Drawn Line"
meta: "A p of JavaScript and SVG"
date: 2015-07-03 15:01:01 +05:00
tags: JavaScript
author: Christopher Michael Buck
comments: false
draft: true
custom_js:
 - image_util
 - svg_gen
---

First pass: a straight line.

Problem? It's too straight.

Second pass: a random line.

A hand-drawn --

We need a hand-drawn line detector. An objective measurement as to how close we are.
[A Hand-Drawn Line Detector]()

Third pass: blot, pull, tail.


<div id="viz"></div>

<svg width="500px" height="160px" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 80 Q 52.5 10, 95 40 T 180 40 T 240 40 T 300 40 T 340 40" stroke="black" fill="transparent"/>
</svg>

<script>
    var data = [[0,0],[0,10]]

    var viz = d3.select("#viz")
    var html = gen_random_svg_curve_html()
    viz.html(html)

</script>