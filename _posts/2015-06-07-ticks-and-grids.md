---
layout: post
title: "Making a Grid with Ticks"
meta: "A picayune of D3"
date: 2015-06-07 22:31:01 +05:00
tags: D3 stark
author: Christopher Michael Buck
comments: false
draft: false
custom_js: ticks-and-grids
---

An easy way to create grid lines with D3 is to use axis ticks, making the tick the height of the plot on the x axis and the width of the plot on the y axis. Thusly:

    var x_axis = d3.svg.axis()
        .tickSize(-plot_height)
		...

    var y_axis = d3.svg.axis()
        .tickSize(-plot_width)
		...

TL;DR

Given we have a SVG element created, perhaps, like this (see: [Centering a D3 Plot]({% post_url 2015-06-05-centering-a-plot %})):

    var total_width = 200
    var total_height = 160
	var margin = { top: 20, right: 20, left: 50, bottom: 30 }
	var plot_width = total_width - margin.left - margin.right
	var plot_height = total_height - margin.top - margin.bottom

    var svg = d3.select("#viz")
	  .append("svg")
        .attr("width", total_width)
        .attr("height", total_height)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

And our data domain like this (see: [Domain and Range]({% post_url 2015-06-06-domain-and-range %})):

    var x = d3.scale.linear()
        .range([0, plot_width])
        .domain([1880, 2020])

    // Range is flipped because SVG origin is at top (left).
    var y = d3.scale.linear()
        .range([plot_height, 0])
        .domain([0, 40000])
        
Configure the axes, aka the grid:

    var x_axis = d3.svg.axis()
		.tickSize(-plot_height); // Re-purpose tick marks as vertical grid lines
        .scale(x)
        .orient("bottom")
		.tickFormat("")    // Suppress labeling 

    var y_axis = d3.svg.axis()
		.tickSize(-plot_width);  // Re-purpose tick marks as horizontal grid lines
        .scale(y)
        .orient("left")
		.tickFormat("")   // Suppress labeling

Generate the SVG (draw the grid):

    svg.append("g")
        .attr("transform", "translate(0," + plot_height + ")")
        .style("fill", "none")
        .style("stroke", "black")
        .call(x_axis)

    svg.append("g")
        .style("fill", "none")
        .style("stroke", "black")
        .call(y_axis)

        
<div id="viz" style="margin-bottom: 10px"></div>


Ta da. A grid.

<script>

    var total_width = 200
    var total_height = 160
	var margin = { top: 20, right: 20, left: 50, bottom: 30 }
	var plot_width = total_width - margin.left - margin.right
	var plot_height = total_height - margin.top - margin.bottom

    var svg = d3.select("#viz")
	  .append("svg")
        .attr("width", total_width)
        .attr("height", total_height)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    var x = d3.scale.linear()
        .range([0, plot_width])
        .domain([1880, 2020])

    // Range is flipped because SVG origin is at top (left).
    var y = d3.scale.linear()
        .range([plot_height, 0])
        .domain([0, 40000])
        
    var x_axis = d3.svg.axis()
		.tickSize(-plot_height) // Re-purpose tick marks as vertical grid lines
        .scale(x)
        .orient("bottom")
		.tickFormat("")    // Suppress labeling 

    var y_axis = d3.svg.axis()
		.tickSize(-plot_width)  // Re-purpose tick marks as horizontal grid lines
        .scale(y)
        .orient("left")
		.tickFormat("")   // Suppress labeling

    svg.append("g")
        .attr("transform", "translate(0," + plot_height + ")")
        .style("fill", "none")
        .style("stroke", "black")
        .call(x_axis)

    svg.append("g")
        .style("fill", "none")
        .style("stroke", "black")
        .call(y_axis)

</script>