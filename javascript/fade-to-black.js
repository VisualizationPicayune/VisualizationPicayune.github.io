// Plot maximal background contrast
// Plot minimal grid contrast
// Plot maximal ...
// When does the grid become foreground?

var grays = [ "black", "lightgray", "darkgray", "white" ]
var opacities = [ 1.0, 0.4, 0.2, 0.1 ]


var tests = [
{ stroke: "black", opacity: 1.0, background: "white" },
{ stroke: "black", opacity: 0.5, background: "white" },
{ stroke: "black", opacity: 0.2, background: "white" },
{ stroke: "black", opacity: 0.01, background: "white" },
{ stroke: "black", opacity: 0.25, background: "white" },
{ stroke: "black", opacity: 0.2, background: "white" },
{ stroke: "black", opacity: 0.15, background: "white" },
{ stroke: "black", opacity: 0.1, background: "white" },
{ stroke: "black", opacity: 1.0, background: "lightgray" },
{ stroke: "black", opacity: 0.5, background: "lightgray" },
{ stroke: "black", opacity: 0.2, background: "lightgray" },
{ stroke: "black", opacity: 0.01, background: "lightgray" },
{ stroke: "black", opacity: 0.25, background: "lightgray" },
{ stroke: "black", opacity: 0.2, background: "lightgray" },
{ stroke: "black", opacity: 0.15, background: "lightgray" },
{ stroke: "black", opacity: 0.1, background: "lightgray" },
{ stroke: "black", opacity: 1.0, background: "darkgray" },
{ stroke: "black", opacity: 0.5, background: "darkgray" },
{ stroke: "black", opacity: 0.2, background: "darkgray" },
{ stroke: "black", opacity: 0.01, background: "darkgray" },
{ stroke: "black", opacity: 0.25, background: "darkgray" },
{ stroke: "black", opacity: 0.2, background: "darkgray" },
{ stroke: "black", opacity: 0.15, background: "darkgray" },
{ stroke: "black", opacity: 0.1, background: "darkgray" }
]


var variables = [
["Grid Opacity", opacities],
["Background", grays]
]

variables.forEach(function(d) { console.log(d[0], d[1]) })


d3.json("../../../Joseph.json", function(error, name_data) {
    var div = d3.select("#examples")
    examples(div, tests, name_data)
    var svg = d3.select("#viz")
        .append('svg')
        .
    samples({
        svg: svg,
        variables: variables,
        data: name_data
    })
})

function samples(p) {

}
    
// Make all as one.

function examples(parent, tests, name_data) {
    var width = 170
    var height = 160
    

	tests.forEach(function(data, i) {
        var grid = parent
            .append('div')
            .style({
                width: width + 'px',
                height: height + 'px',
                display: 'inline-block',
                background: data.background,
                "border-radius": '8px',
                "box-shadow": "0 0 5px #eee",
                "margin-right": '8px',
                "margin-bottom": '8px'
            });

    var svg = grid_1({
		    viz: grid,
			width: width,
			height: height,
            order: data
		}, name_data)
        
    svg.select("g.x").selectAll(".tick line")
        .style('stroke', data.stroke)
        .style('opacity', data.opacity)
        .style('stroke-width', 1)

    svg.select("g.y").selectAll(".tick line")
        .style('stroke', data.stroke)
        .style('opacity', data.opacity)
        .style('stroke-width', 1)
        //.style({ "stroke-width": 6 })
    grid.append('div')
      .text('Grid Opacity: '+data.opacity)
      .style('text-align', "center")
      .style('margin-top', "-28px")

    });

}

function grid_1(options, data) {

    // var margin = {top: 20, right: 20, bottom: 30, left: 50} // With labels
    var margin = {top: 20, right: 20, bottom: 20, left: 20}
    var width = options.width - margin.left - margin.right
    var height = options.height - margin.top - margin.bottom
	var viz = options.viz

    var x = d3.scale.linear()
        .range([0, width]);

    // Range is flipped because svg origin is at top (left).
    var y = d3.scale.linear()
        .range([height, 0]);
        
    x.domain([1880, 2020])
    y.domain([0, 40000])

    var x_axis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickSize(-height)
		.tickFormat(function() { return "" });

    var y_axis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickSize(-width)
		.tickFormat(function() { return "" });

    var line = d3.svg.line()
        .x(function(d) { return x(d[0]); })
        .y(function(d) { return y(d[1]); });


    var svg = viz.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(x_axis);
    
    svg.append("g")
        .attr("class", "y axis")
        .call(y_axis);

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);
    return svg
}


function svg_gen(where, attr) {
    var viz = d3.select(where)
    
    var svg = viz.append("svg")
         .attr(attr)
         
    return svg
}

// TODO Call this with styling to apply.
function append_line_graph(svg, x_axis, y_axis, styles, data) {
  
    svg.append("g")
        .attr("transform", "translate(" + right + "," + down + height + ")")
        .call(x_axis);
    
    svg.append("g")
        .attr("transform", "translate(" + right + "," + down + ")")
        .call(y_axis);

    svg.append("path")
        .datum(data)
        .attr("transform", "translate(" + right + "," + down + ")")
        .attr("d", line);
    return svg
}


