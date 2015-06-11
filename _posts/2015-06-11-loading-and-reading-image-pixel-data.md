---
layout: post
title: "Loading and Reading Image Pixel Data"
meta: "A picayune of JavaScript in the browser"
date: 2015-06-11 14:31:01 +05:00
tags: canvas image
author: Christopher Michael Buck
comments: false
draft: false
---

To load an image, and dispatch with [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData), given a url:

    // Calls back with ImageData. Caller is likely interested in:
    // .width, .height, and .data 
    function get_image_pixels(url, callback) {
        var image = new Image()
        image.src = url   // the get request happens here

        // When the request is fulfilled
        image.onload = function () {
            // To get at the image data we need to write it to a canvas
            var canvas = document.createElement('canvas')
            // Make the canvas the same size as the image so it can hold it exactly
            canvas.width=image.width
            canvas.height=image.height
            // Get the canvas 2d context and write the image
            context = canvas.getContext('2d')
            context.drawImage(image, 0, 0)
            // Give the context back to the caller
            var pixels = context.getImageData(0, 0, context.canvas.width, context.canvas.height)
            callback(pixels)
        }
    }
    
Pixel by pixel access of canvas with context.getImageData can bring a browser to it's knees. Given all the ImageData from an image like is returned from get_image_pixels, above, return [r,g,b,a] of a particular pixel:

    function get_pixel(pixels, x, y) {
        var width = pixels.width
        var height = pixels.height
        var base_y = y * width * 4
        var base = base_y + x * 4
        return pixels.data.subarray(base, base+4)
    }

<script>
    // Calls back with ImageData. Caller is likely interested in:
    // .width, .height, and .data 
    function get_image_pixels(url, callback) {
        var image = new Image()
        image.src = url   // the get request happens here

        // When the request is fulfilled
        image.onload = function () {
            // To get at the image data we need to write it to a canvas
            var canvas = document.createElement('canvas')
            // Make the canvas the same size as the image so it can hold it exactly
            canvas.width=image.width
            canvas.height=image.height
            // Get the canvas 2d context and write the image
            context = canvas.getContext('2d')
            context.drawImage(image, 0, 0)
            // Give the context back to the caller
            var pixels = context.getImageData(0, 0, context.canvas.width, context.canvas.height)
            callback(pixels)
        }
    }
    
//Pixel by pixel access of canvas with context.getImageData can bring a browser to it's knees. Given all the ImageData from an image like is returned from get_image_pixels, above, return [r,g,b,a] of a particular pixel:

    function get_pixel(pixels, x, y) {
        var width = pixels.width
        var height = pixels.height
        var base_y = y * width * 4
        var base = base_y + x * 4
        return pixels.data.subarray(base, base+4)
    }

</script>