//
// Label connected components. Separate into interesting pixels and other pixels.
// Label all connected pixels-of-interest with same label.
//
// Functional tests at end. Not performance tested.
//

var max_integer = 9007199254740991

function gen_counter(start) {
    var l = start
    return function() { l = l + 1; return l }
}

// This is a multiple scan implementation.
function scan_and_label(pixels) {
    var gen_next_label = gen_counter(0)

    // label is output array
    var label = new Array(pixels.data.length/4)

    provisional_label_scan(pixels, label, gen_next_label)

    var changed = relabel(pixels, label)
    while (changed) {
        changed = relabel(pixels, label)
    }
    return label
}

function label_to_image(label, width, height) {
    var colors = [[255, 0, 0], [255, 255, 0], [0, 255, 0], [0, 255, 255], [0, 0, 255], [255, 0, 255]]
    var pixels = image_util.gen_pixels(width, height)
    for (var i = 0; i < label.length; i++) {
        var base = i*4
        var color = colors[ label[i] % colors.length ]
        pixels.data[base] = color[0]
        pixels.data[base+1] = color[1]
        pixels.data[base+2] = color[2]
        pixels.data[base+3] = 255
    }
    return pixels
}

// Threshold for interesting pixel. We're detecting darker colors, in particular, a color with a red component under 150.
// Assume a white background, so a transparent color is less dark. This function works on gray-scale images and when we
// only care about the red in the image.
function interesting(image, e) {
    var thresh = 150  
    var red = image[e*4]
    var white_background = 255 - image[(e*4)+3]  // If transparent assume white background
    return (red + white_background < thresh)
}

// Pixels around e
//
// abc
// de

function provisional_label_scan(pixels, label, gen_next_label) {
    var width = pixels.width
    var height = pixels.height
    var image = pixels.data
    var a, b, c, d, e = 0
    
    var is_left_edge, is_right_edge = false

    
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            e = y * width + x

            // Set provisional label
            if (!interesting(image, e)) {
                label[e] = 0
            } else {
                // top edge is handled by the width subtractions
                is_left_edge = (e % width == 0)
                is_right_edge = (e % width == (width - 1))
                // Addressing with adjustments for boundary cases.
                a = e - width - 1; if (is_left_edge) { a = -1 }
                b = e - width
                c = e - width + 1; if (is_right_edge) { c = -1 }
                d = e - 1;         if (is_left_edge) { d = -1 }
    
                var minimum_label = find_minimum_label(label, [a, b, c, d])
                if (minimum_label == max_integer) {
                    label[e] = gen_next_label()
                } else {
                    label[e] = minimum_label
                }
            }
        }
    }
}

// Pixels around e
//
// abc
// def
// ghi

function relabel(pixels, label) {
    var width = pixels.width
    var height = pixels.height
    var image = pixels.data
    var a, b, c, d, e, f, g, h, i = 0

    var is_left_edge, is_right_edge, is_bottom_edge = false

    var changed = false
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            e = y * width + x
    
            if (label[e] > 1) {
                // top edge is handled by the width subtractions
                is_left_edge = (e % width == 0)
                is_right_edge = (e % width == (width - 1))
                is_bottom_edge = (e + width >= (width * height))

                a = e - width - 1; if (is_left_edge) { a = e }
                b = e - width
                c = e - width + 1; if (is_right_edge) { c = e }
                d = e - 1;         if (is_left_edge) { d = e }
    
                f = e + 1;         if (is_right_edge) { f = e }
                g = e + width - 1; if (is_left_edge || is_bottom_edge) { g = e }
                h = e + width;     if (is_bottom_edge) { h = e }
                i = e + width + 1; if (is_right_edge || is_bottom_edge) { i = e }
            
                var l = find_minimum_label(label, [a, b, c, d, f, g, h, i])
                if (l < label[e]) {
                    changed = true
                    label[e] = l
                }
            }
        }
    }
    return changed
}

function find_minimum_label(label, indexes) {
    var ml = max_integer
    for (var i=0; i < indexes.length; i++) {
        var a = indexes[i]
        if (a >= 0 && label[a] > 0 && label[a] < ml) { ml = label[a] } 
    }
    return ml
}

////////////////////////////
//         Tests          //
////////////////////////////

var test_patterns = [
    [
        [0]
    ],[
        [1]
    ],[
        [1, 0],
        [0, 1]
    ],[
        [1, 0, 2]
    ],[
        [1],
        [0],
        [2]
    ],[
        [0, 1, 0, 2, 0, 3]
    ],[
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
    ],[
        [1, 0, 2],
        [1, 0, 2],
        [1, 0, 2]
    ],[
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1]
    ],[
        [1, 1, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1]
    ],[
        [1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1]
    ],[
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1]
    ],[
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0],
        [1, 0, 1, 1, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1]
    ],[
        [1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
        [1, 0, 0, 1, 1],
        [1, 0, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1]
    ],[
        [1, 0, 1, 1, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 1, 1, 0, 1]
    ],[
        [1, 0, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 1, 0],
        [1, 0, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1]
    ],[
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1],
        [1, 1, 1, 0, 1, 1, 1]
    ],[ 
        [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1]
    ],[
        [1, 1, 1, 1],
        [0, 0, 0, 1],
        [1, 1, 1, 1],
        [1, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 1],
        [1, 1, 1, 1],
        [1, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 1],
        [1, 1, 1, 1],
        [1, 0, 0, 0],
        [1, 1, 1, 1]
    ]
]

function gray_or_black_gen(zero_other) {
    if (zero_other == 0) return [0, 0, 0, 0]
    return [128, 128, 128, 255]
}

function gray_or_white_gen(zero_other) {
    if (zero_other == 0) return [255, 255, 255, 255]
    return [128, 128, 128, 255]
}

function pattern_to_pixels(pattern, gen_value) {
    var width = pattern[0].length
    var height = pattern.length
    var pixels = image_util.gen_pixels(width, height)
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            image_util.set_pixel(pixels, x, y, gen_value(pattern[y][x]))
        }
    }
    return pixels
}

function pattern_to_label(pattern) {
    var width = pattern[0].length
    var height = pattern.length
    var label = []
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            label.push(pattern[y][x])
        }
    }
    return label
}

function test_pattern(pattern, gen_value) {
    var pixels = pattern_to_pixels(pattern, gen_value)
    var label_wanted = pattern_to_label(pattern)
    var label = scan_and_label(pixels)
    return [image_util.arrays_equal(label_wanted, label), label_wanted, label, pixels] 
}

function test() {
    for (var i = 0; i < test_patterns.length; i++) {
        var results = test_pattern(test_patterns[i], gray_or_white_gen)
        if (!results[0]) {
            console.log(results[1])
            console.log(results[2])
        }
    }
}
test()

/*
// Untested. Union-find for table-based blob merging //
// See: Optimizing Two-Pass Connected-Component Labeling Algorithms by Kesheng Wu, Ekow Otoo, Kenji Suzuk

// return the root of the tree i is in
function find_root(p, i) {
    var root = i
    while (p[root] < root) {
        root = p[root]
    }
    return root
}

function set_root(p, i, root) {
    var j;
    while (p[i] < i) {
        j = p[i]
        p[i] = root
        i = j
    }
    p[i] = root
}
    
function find(p, i) {
    var root = find_root(p, i)
    set_root(p, i, root)
    return root
}

function union(p, i, j) {
    var root = find_root(p, i)
    if (i !== j) {
        root_j = find_root(p, j)
        if (root !== root_j ) { root = root_j }
        set_root(p, j, root)
    }
    set_root(p, i, root)
    return root
}

// Flatten to consecutive labels
function flatten(p) {
    var k = 1
    for (var i = 1; i < p.length; i++) {
        if (p[i] < i) {
            p[i] = p[p[i]]
        } else {
            P[i] = k
            k = k + 1
        }
    }
    return p
}
*/