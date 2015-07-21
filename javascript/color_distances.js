/* Copyright 2015 Christopher Michael Buck */
!function() {
    
    var color_distances = {}

    // Assumes colors array is [[24-bit-color, ...],[24-bit-color, ...]...]

    function get_near_colors(color, candidates, delta) {
        var near_colors = []
        var farther_colors = []
        candidates.forEach(function(c) {
            if ( machine_distance(color[0], c[0]) < delta ) {
            //if ( rgb_distance(color[0], c[0]) < delta ) {
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
    
    // Assume colors are in counted sorted order. If a color is within delta
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

    function group_colors_until_count(colors, count) {
        var delta = 28.00
        var delta_delta = 4.00
        var results = group_colors_by_distance(colors, delta)
        for (var i = 0; i < 20 && results.length !== count; i++) {
            if (results.length > count) {
                delta = delta + delta_delta
            } else {
                delta = delta - delta_delta
            }
            results = group_colors_by_distance(colors, delta)
            delta_delta = delta_delta * 0.75 // Tune this
        }
        return results
    }
    color_distances.group_colors_until_count = group_colors_until_count
    
    // Assumes fingerprints are same length
    function fingerprint_distance( f1, f2 ) {
        var distance = machine_distance(f1[0], f2[0])
        for (var i = 1; i < f1.length; i++) {
            distance = distance + machine_distance(f1[i], f2[i])
        }
        return distance
    }
    
    function closest_color_fingerprint(color_fingerprints, fingerprint) {
        var closest = 0
        var closest_distance = fingerprint_distance(color_fingerprints[0][2], fingerprint)
        for (var i = 1; i < color_fingerprints.length; i++) {
            var distance = fingerprint_distance(color_fingerprints[i][2], fingerprint)
            if (distance < closest_distance) {
                closest = i
                closest_distance = distance
            }
        }
        return closest
    }
    color_distances.closest_color_fingerprint = closest_color_fingerprint
    
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


    function machine_distance( c1, c2 ) {
        var r1 = c1 >> 16, g1 = (c1 >> 8) % 256, b1 = c1 % 256
        var r2 = c2 >> 16, g2 = (c2 >> 8) % 256, b2 = c2 % 256
        
        var r_component = (r1 - r2) * (r1 - r2)
        var g_component = (g1 - g2) * (g1 - g2)
        var b_component = (b1 - b2) * (b1 - b2)
        var distance = Math.sqrt(r_component + g_component + b_component)
        
        return distance

    }
    color_distances.machine_distance = machine_distance
    
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
