---
layout: post
title: "Image Color Bar Chart"
meta: "A picayune of D3"
date: 2015-06-15 12:01:01 +05:00
tags: D3 stark
author: Christopher Michael Buck
comments: false
draft: true
custom_js:
 - image_util
 - color_distances
 - bar_chart
---

This is graph to Given the data from a canvas

<div id="image-div"></div>

Okay. Let's now plot the x most 

<div id="viz"></div>

<script>
    var src = '../../../../../joc80862f1.gif'

    var image_div = document.getElementById("image-div")
    var image = new Image()
    image.src = src
    image_div.appendChild(image)
    
    image_util.get_image_pixels(src, function(pixels) {
        pixel_counts = image_util.get_pixel_counts(pixels.data)
        var grouped = color_distances.group(pixel_counts.color_counts, 200.0)
        var firsts = grouped.map(function(c) { return c[0] } )
        bar_chart({
            where: "#viz",
            width: 100,
            height: 100
        }, firsts.slice(1,20))
    })
            
</script>

Something underneath. 