var image_util = function () {

    // Pixel by pixel access of canvas with context.getImageData can bring a browser to it's knees. Given all the ImageData from an image like is returned from get_image_pixels, above, return [r,g,b,a] of a particular pixel:

    function get_pixel(pixels, x, y) {
        var width = pixels.width
        var height = pixels.height
        var base_y = y * width * 4
        var base = base_y + x * 4
        return pixels.data.subarray(base, base+4)
    }
    
    // To load an image, and dispatch with [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData), given a url:
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
            var context = canvas.getContext('2d')
            context.drawImage(image, 0, 0)
            // Give the context back to the caller
            var pixels = context.getImageData(0, 0, context.canvas.width, context.canvas.height)
            callback(pixels)
        }
    }

    
    function get_svg_pixels(svg_element, callback) {
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

    
    function get_pixel_counts(data) {
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
    
    function get_pixel_addresses_by_color(pixels, color_24) {
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

    function get_graph_addresses_by_color(pixels, color_24) {
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
    function image_distance_red(image_1_pixels, image_2_pixels) {
        var size = image_1_pixels.width * image_1_pixels.height * 4
        var diff = 0
        for (var i = 0; i < size; i = i + 4) {
            diff = diff + Math.abs(image_1_pixels[i] - image_2_pixels[i])
        }
        return(diff)
    }
    
    function get_random_0_255() {
        return Math.floor(Math.random() * 256)
    }
    
    function test() {
        
    }
    
    return {
        get_pixel: get_pixel,
        get_image_pixels: get_image_pixels,
        get_svg_pixels: get_svg_pixels,
        get_pixel_counts: get_pixel_counts,
        get_pixel_addresses_by_color: get_pixel_addresses_by_color,
        get_graph_addresses_by_color: get_graph_addresses_by_color,
        image_distance_red: image_distance_red,
        test: test
    }

}()