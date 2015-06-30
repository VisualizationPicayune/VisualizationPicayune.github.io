!function () {
    
    var image_util = {}
    
    var tests = []

    // Pixel by pixel access of canvas with context.getImageData can bring a browser to it's knees. Given all the ImageData from an image like is returned from get_image_pixels, above, return [r,g,b,a] of a particular pixel:

    image_util.get_pixel = function(pixels, x, y) {
        var width = pixels.width
        var height = pixels.height
        var base_y = y * width * 4
        var base = base_y + x * 4
        return pixels.data.subarray(base, base+4)
    }
    
    // To load an image, and dispatch with [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData), given a url:
    // Calls back with ImageData. Caller is likely interested in:
    // .width, .height, and .data 
    image_util.get_image_pixels = function(url, callback) {
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
            var context = canvas.getContext('2d')
            context.drawImage(image, 0, 0)
            // Give the context back to the caller
            var pixels = context.getImageData(0, 0, context.canvas.width, context.canvas.height)
            callback(pixels)
        }
    }

    
    function gen_count_function(start) {
        var s = start || 0
        var count = -1
        return {
            next : function () {
                count = count + 1
                return s + count
            }
        }
    }
    
    var test_count_function = gen_count_function(10)
    
    tests.push(function() { return [ "true", true ] })
    tests.push(function() { return [ "true", false ] })
    tests.push(function() {
        return [ "turn up to 11", test_count_function.next === 11 ]
    })
    
    /*
    Both the following methods use a off-screen div to get metrics and raw data.
    Since they can be asynchronous, many could be in action at once.
    To test, these are set as positive numbers and the results can be seen walking across the screen.
    */
    /* TODO: finish
    var x_measure_position = -1000
    var y_measure_position = -1000
    var x_measure_increment = -1000
    
    image_util.create_offscreen_element = function(type) {
        x_measure_position += x_measure_increment   // slight race condition
        my_x_measure_position = x_measure_position  // between these... single thread helps
        createElement
    }
    
    image_util.get_text_pixels = function(text, style, callback) {
        if (callback) {
            callback(pixels)
        } else {
            return pixels
        }
    }
    */
    
    image_util.get_svg_pixels = function(svg_element, callback) {
        var svgString = new XMLSerializer().serializeToString(svg_element);
        var DOMURL = self.URL || self.webkitURL || self;
        var svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
        var url = DOMURL.createObjectURL(svg);
        get_image_pixels(url, callback)
    }
    
    
    /*var svgString = new XMLSerializer().serializeToString(document.querySelector('svg'));

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var DOMURL = self.URL || self.webkitURL || self;
var img = new Image();
var svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
var url = DOMURL.createObjectURL(svg);
img.onload = function() {
    ctx.drawImage(img, 0, 0);
    var png = canvas.toDataURL("image/png");
    document.querySelector('#png-container').innerHTML = '<img src="'+png+'"/>';
    DOMURL.revokeObjectURL(png);
};
img.src = url;
    */

    
    image_util.get_pixel_counts = function(data) {
        var semi_transparent_pixel_count = 0
        var counts = {}
        // Using a RGB hex color string here. Could use a 24-bit integer and convert on use
        for (var i=0; i < data.length; i = i+4) {
           var s = 256*256*data[i+0] + 256*data[i+1] + data[i+2]  // R@0, G@1, B@2
           if (data[i+3] !== 255) { semi_transparent_pixel_count += 1 }
           counts[s] = (counts[s] | 0) + 1
        }
        // Convert to color, count pairs
        var a = []
        for (var key in counts) {
            if (counts.hasOwnProperty(key)) {
                var count = counts[key]
                a.push([parseInt(key), count])
            }
        }
        var sorted = a.sort(function(a,b) { return b[1] - a[1] } )
        return({
          color_counts: sorted,
          pixel_count: data.length/4,
          semi_transparent_pixel_count: semi_transparent_pixel_count
        })
    }
    
    image_util.get_pixel_addresses_by_color = function(pixels, color_24) {
        var r = color_24 >> 16, g = (color_24 >> 8) % 256, b = color_24 % 256
        var addresses = []
        var width = pixels.width
        var height = pixels.height
                
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var pixel = get_pixel(pixels, x, y)
                if ((pixel[0] === r) && (pixel[1] === g) && (pixel[2] === b)) {
                    addresses.push([x,y])
                }
            }
        }
        return(addresses)
    }

    image_util.get_graph_addresses_by_color = function(pixels, color_24) {
        var r = color_24 >> 16, g = (color_24 >> 8) % 256, b = color_24 % 256
        var addresses = []
        var width = pixels.width
        var height = pixels.height
                
        for (var x = 0; x < width; x++) {
            var ys = []
            for (var y = 0; y < height; y++) {
                var pixel = get_pixel(pixels, x, y)
                if ((pixel[0] === r) && (pixel[1] === g) && (pixel[2] === b)) {
                    ys.push(y)
                }
            }
            if (ys.length > 0) {
                var sum = 0;
                ys.forEach(function(v) { sum = sum + v })
                var ave = sum/ys.length
                addresses.push([x,ave])
            }
        }
        return(addresses)
    }

    // Distance as a red level distance. Works as a total distance measure for gray scale.
    image_util.image_distance_red = function(image_1_pixels, image_2_pixels) {
        var data_1 = image_1_pixels.data
        var data_2 = image_2_pixels.data
        var diff = 0
        for (var i = 0, size = data_1.length; i < size; i = i + 4) {
            diff = diff + Math.abs(data_1[i] - data_2[i])
        }
        return(diff)
    }
    
    function get_random_0_255() {
        return Math.floor(Math.random() * 256)
    }
    
    function invert(pixels) {
        var pix = pixels.data
        // Loop over each pixel and invert the color.
        for (var i = 0, n = pix.length; i < n; i += 4) {
            pix[i  ] = 255 - pix[i  ] // red
            pix[i+1] = 255 - pix[i+1] // green
            pix[i+2] = 255 - pix[i+2] // blue
            // i+3 is alpha (the fourth element)
        }
        return pixels
    }
    
    image_util.test = function() {
        return tests.map(function(t) {
            return t()
        })
    }
    
    image_util.get_failed_tests = function(results) {
        var failed = []
        results.forEach(function (r) {
            if (r[1] == false) { 
                failed.push(r)
            }
        })
    }
    if (typeof define === "function" && define.amd) define(image_util); else if (typeof module === "object" && module.exports) module.exports = image_util
    this.image_util = image_util
}()