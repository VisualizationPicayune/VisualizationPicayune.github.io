    function gen_svg_curve_html() {
        var svg_string = '<svg width="500px" height="160px" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M10 80 Q 52.5 10, 95 40 T 180 40 T 240 40 T 300 40 T 340 40" stroke="black" fill="transparent"/></svg>'
        return svg_string

    }

    function gen_random_svg_curve_html() {
        var svg_string = '<svg width="500px" height="160px" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M10 80 Q 52.5 10, 95 40'
        for (var i=1; i<5; i++) {
            svg_string += ' T ' + (100 + (i*40) + get_random_integer(50,100)) + ' 40'
        }
        svg_string += '" stroke="black" fill="transparent"/></svg>'
        return svg_string
    }

    // Random integer, inclusive
    function get_random_integer(min, max) {
        return Math.floor(Math.random() * (max + 1 - min)) + min
    }
    
    
    // A set of possible models to look thorough
    // A way to test whether a model is good
    // A clever way to find a really good model with only a few test
    