---
layout: post
title: "Domain and Range"
meta: "A picayune of D3"
date: 2015-06-06 22:21:01 +05:00
tags: D3 stark
author: Christopher Michael Buck
comments: false
draft: false
---

To translate from the data domain (observations) to the plotting range (a box on the screen) we use scales. Say we are dealing with counts (observations) with a minimum of 0  and a maximum of 40,000 taken yearly from 1880 to 2000 and want a plot 160 wide and 120 high. We create two functions, x and y, to do the scaling.

For x, we scale the numbers 1880 to 2000 to a number of pixels between 0 and 160.

    var x = d3.scale.linear()
	    .domain([1880, 2000])
        .range([0, 160])
    
    var y = d3.scale.linear()
	    .domain([0, 40000])
        .range([120,0])

For y, we translate the numbers 0 to 40,000 to a number of pixels between 120 and 0. What? Since the SVG origin (0,0) is at the upper left and generally we want the plot origin at the bottom left, we flip the range.  x(2000) is 160, x(1880) is 0, y(0) is 120, and y(40000) is 0.


A simple example. Given we want create a SVG plot with margins, like in [Centering a D3 Plot]({% post_url 2015-06-05-centering-a-plot %}):

    var total_width = 200
    var total_height = 160
	var margin = { top: 20, right: 20, left: 20, bottom: 20 }
	var plot_width = total_width - margin.left - margin.right
	var plot_height = total_height - margin.top - margin.bottom

    var svg = d3.select("#viz")
	  .append("svg")
        .attr("width", total_width)
        .attr("height", total_height)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

	// plotting functions (this post)
    var x = d3.scale.linear()
        .range([0, plot_width])
        .domain([1880,2000])
		
    // Range is flipped because SVG origin is at top (left).
    var y = d3.scale.linear()
        .domain([0, 40000])
        .range([plot_height, 0])

    // Use the scaling functions to translate data pairs
    var line = d3.svg.line()
        .x(function(d) { return x(d[0]); })
        .y(function(d) { return y(d[1]); })

	// Three somewhat arbitrary data points
    var data = [[1880, 30], [1950, 38000], [2000, 20000]]		
 
    svg.append("path")
        .datum(data)
		.style("fill","none")     // Without this you get a triangle
		.style("stroke","black")  // Without this you get nothing
        .attr("d", line)


<div id="viz" style="margin-bottom: 10px"></div>

Ta da. A line in space.


<script>
    var total_width = 200
    var total_height = 160
	var margin = { top: 20, right: 20, left: 20, bottom: 20 }
	var plot_width = total_width - margin.left - margin.right
	var plot_height = total_height - margin.top - margin.bottom

    var svg = d3.select("#viz")
	  .append("svg")
        .attr("width", total_width)
        .attr("height", total_height)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

	// plotting functions (this post)
    var x = d3.scale.linear()
        .range([0, plot_width])
		.domain([1880,2000])
		
    // Range is flipped because svg origin is at top (left).
    var y = d3.scale.linear()
        .domain([0, 40000])
        .range([plot_height, 0])

    // Use the scaling functions to translate data pairs
    var line = d3.svg.line()
        .x(function(d) { return x(d[0]); })
        .y(function(d) { return y(d[1]); })

	// Three somewhat arbitrary data points
    var data = [[1880, 30], [1950, 38000], [2000, 20000]]		
 
    svg.append("path")
        .datum(data)
		.style("fill","none")     // Without this you get a triangle
		.style("stroke","black")  // Without this you get nothing
        .attr("d", line)
</script>