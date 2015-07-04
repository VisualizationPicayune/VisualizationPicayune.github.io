/* Copyright 2015 Christopher Michael Buck */
!function() {
    
    var color_distances = {}

    // Assumes colors array is [[24-bit-color, ...],[24-bit-color, ...]...]

    function get_near_colors(color, candidates, delta) {
        var near_colors = []
        var farther_colors = []
        candidates.forEach(function(c) {
            if ( rgb_distance(color[0], c[0]) < delta ) {
                near_colors.push(c) 
            } else {
                farther_colors.push(c)
            }
        })
        return {
            near: near_colors,
            far: farther_colors
        }
    }
    color_distances.get_near_colors = get_near_colors
    
    // Assume colors are in sorted order. If a color is within delta
    function group_colors_by_distance(colors, delta) {
        var results = []
        var split = get_near_colors(colors[0], colors, delta)
        results.push(split.near)
        while (split.far.length > 0) {
            split = get_near_colors(split.far[0], split.far, delta)
            results.push(split.near)
        }
        return results
    }
    color_distances.group_colors_by_distance = group_colors_by_distance
    
    // Implementation of formula E'' From section 7, The ∆E formula in the RGB space, in:
    // Colour difference ∆E - A survey
    // Mokrzycki W.S., Tatol M. {mokrzycki,mtatol}@matman.uwm.edu.pl
    // http://www.researchgate.net/profile/Wojciech_Mokrzycki/publication/236023905_Color_difference_Delta_E_-_A_survey/links/00b4951d3e67b5b616000000.pdf
    
    function rgb_distance( c1, c2 ) {
        var r1 = c1 >> 16, g1 = (c1 >> 8) % 256, b1 = c1 % 256
        var r2 = c2 >> 16, g2 = (c2 >> 8) % 256, b2 = c2 % 256
        
        var r_ave = (r1 + r2) / 2

        var r_component = (2 + (r_ave / 256)) * (r1 - r2) * (r1 - r2)
        var g_component = 4 * (g1 - g2) * (g1 - g2)
        var b_component = (2 + ((255 - r_ave) / 256)) * (b1 - b2) * (b1 - b2)
        var distance = Math.sqrt(r_component + g_component + b_component)
        
        return distance

    }
    color_distances.rgb_distance = rgb_distance
    
    color_distances.test = function() {
        var errors = []
        var black = 0
        var red = 256*256*255
        var green = 256*255
        var blue = 255
        var white = red + green + blue
        var max_distance = rgb_distance(white, black)
        if (rgb_distance(white, black) < 1) { errors.push("white, black distance less than one") }
        if (rgb_distance(white, black) !== rgb_distance(black, white)) { errors.push("Distance not symmetrical") }
        if (rgb_distance(red, green) >= max_distance*0.9) { errors.push("red, green distance weird "+rgb_distance(red, green)) }
        if (rgb_distance(red, blue) >= max_distance*0.9) { errors.push("red, blue distance weird "+rgb_distance(red, blue)) }
        if (rgb_distance(blue, green) >= max_distance*0.9) { errors.push("blue, green distance weird "+rgb_distance(blue, green)) }
        if (rgb_distance(red, 256*256*254) > max_distance*0.01) { errors.push("reds distance weird") }
        if (rgb_distance(green, 256*254) > max_distance*0.01) { errors.push("greens distance weird") }
        if (rgb_distance(blue, 254) > max_distance*0.01) { errors.push("blues distance weird") }
        return errors
    }
    
    if (typeof define === "function" && define.amd) define(image_util); else if (typeof module === "object" && module.exports) module.exports = color_distances
    this.color_distances = color_distances
}()
