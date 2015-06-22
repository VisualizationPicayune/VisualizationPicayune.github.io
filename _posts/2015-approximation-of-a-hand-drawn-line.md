---
layout: post
title: "Approximation of a Hand-Drawn Line"
meta: "A p of JavaScript and SVG"
date: 2015-06-14 15:01:01 +05:00
tags: JavaScript
author: Christopher Michael Buck
comments: false
draft: false
custom_js:
 - image_util
 - color_distances
---

First pass: a straight line.


<div id="viz"></div>

svg width="190px" height="160px" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 80 Q 52.5 10, 95 80 T 180 80" stroke="black" fill="transparent"/>
</svg>

<script>
    var data = [[0,0],[0,10]]

    var svg = d3.select("#viz")



<script>