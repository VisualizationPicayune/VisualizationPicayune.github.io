---
layout: post
title: "Using Small Multiples to Gauge Design Parameters"
meta: "A p of JavaScript and SVG"
date: 2015-06-16 15:01:01 +05:00
tags: JavaScript
author: Christopher Michael Buck
comments: false
draft: true
custom_js:
 - image_util
 - color_distances
---

function small_multiple(where, row_values, column_values) {
}

First pass: a straight line.


<div id="viz"></div>

<svg width="500px" height="160px" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 80 Q 52.5 10, 95 40 T 180 40 T 240 40 T 300 40 T 340 40" stroke="black" fill="transparent"/>
</svg>

<script>
    var data = [[0,0],[0,10]]

    var svg = d3.select("#viz")



<script>