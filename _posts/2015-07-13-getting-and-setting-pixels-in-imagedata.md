---
layout: post
title: "Getting and Setting Pixels in ImageData"
meta: "A Picayune of JavaScript"
date: 2015-07-13 11:55:01 +05:00
tags: JavaScript
author: Christopher Michael Buck
comments: false
draft: false
---

Given pixels ([ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData)), to get or set a pixel:

~~~
function get_pixel(pixels, x, y) {
    var width = pixels.width
    var height = pixels.height
    var base_y = y * width * 4
    var base = base_y + x * 4
    return pixels.data.subarray(base, base+4)
}

function set_pixel(pixels, x, y, value) {
    var width = pixels.width
    var height = pixels.height
    var base_y = y * width * 4
    var base = base_y + x * 4
    pixels.data[base] = value[0]
    pixels.data[base+1] = value[1]
    pixels.data[base+2] = value[2]
    pixels.data[base+3] = value[3]
}
~~~

Pixels are RGBA values, four uint8 values, each in the range of 0 to 255.