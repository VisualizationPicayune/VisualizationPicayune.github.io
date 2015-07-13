---
layout: post
title: "Getting Image Pixels (ImageData)"
meta: "A Picayune of JavaScript"
date: 2015-07-13 11:51:01 +05:00
tags: JavaScript
author: Christopher Michael Buck
comments: false
draft: false
---

To get [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) for a image, for modification or analysis:

~~~
function get_image_pixels(url, callback) {
    var image = new Image()
    image.crossOrigin = "Anonymous"  // Needed for CORS enabled image
    image.src = url   // the get request occurs here
    // When the request is fulfilled
    image.onload = function () {
        // To get at the image data we need to write it to a canvas
        var canvas = document.createElement('canvas')
        // Make the canvas the same size as the image so it can hold it exactly
        canvas.width=image.width
        canvas.height=image.height
        // Get the canvas 2d context and write the image
        var context = canvas.getContext('2d')
        context.drawImage(image, 0, 0)
        // Give the context back to the caller
        var pixels = context.getImageData(0, 0, context.canvas.width, context.canvas.height)
        callback(pixels)
    }
}
~~~

Note that for this to work the image needs either be from the current domain or have the right CORS headers. See: [CORS Enabled Image](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image)
