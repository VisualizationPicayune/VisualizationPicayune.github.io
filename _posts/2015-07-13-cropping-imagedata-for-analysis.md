---
layout: post
title: "Cropping Pixels (ImageData) for Analysis"
meta: "A Picayune of JavaScript"
date: 2015-07-13 12:25:01 +05:00
tags: JavaScript
author: Christopher Michael Buck
comments: false
draft: false
---

Given the pixels ([ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData)), to get a crop of the pixels:

~~~
function  get_crop(pixels, x, y, width, height) {
        var canvas = document.createElement('canvas')
        canvas.width=pixels.width
        canvas.height=pixels.height
        var context = canvas.getContext('2d')
        context.putImageData(pixels, 0, 0)
        var cropped = context.getImageData(x, y, width, height)
        return cropped
    }

~~~

If you want to crop an image for display, see: [Cropping Images with CSS]({% post_url 2015-06-30-cropping-images-with-CSS %}). If you want to crop an image analysis, such as connectivity analysis on part of the image, you can use the above. This is the simplest version I could imagine. A slightly more complicated version that doesn't use document, based on 'new ImageData', is possible.
