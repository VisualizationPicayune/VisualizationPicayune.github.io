---
layout: post
title: "Centering a D3 Plot"
meta: "A picayune of D3"
date: 2015-06-05 16:01:01 +05:00
tags: D3 stark
author: Christopher Michael Buck
comments: true
draft: false
---

The punchline first: since SVG addressing is 0,0 at the top left, to center the plot within a SVG, a SVG group element (g) is added and shifted down and to the right.

	var plot_area = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

The svg element used above is a sized box, created and attached to a known element, like this:

    var svg = d3.select("#viz")
	  .append("svg")
        .attr("width", total_width)
        .attr("height", total_height)

In the preliminaries, you keep track of the margins (for the axes) and the plot size. The extra amount of margin on the left and bottom is for labeling the axes.

    var total_width = 200
    var total_height = 160
	var margin = { top: 20, right: 20, left: 50, bottom: 30 }
	var plot_width = total_width - margin.left - margin.right
	var plot_height = total_height - margin.top - margin.bottom

Below, the solid box is the svg area and the dotted box is the plot area.
	
<div id="viz" style="outline: 1px solid color black"></div>

The code to draw the above:

    plot_area.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", plot_width)
        .attr("y2", plot_height)
		.attr("stroke-width", 1)
		.attr("stroke", "black")
	
	svg.style("outline","1px solid black")
	plot_area.style("outline","1px dotted black")

The centering code right side up:

    var total_width = 200
    var total_height = 160
	var margin = { top: 20, right: 20, left: 50, bottom: 30 }
	var plot_width = total_width - margin.left - margin.right
	var plot_height = total_height - margin.top - margin.bottom
	
    var svg = d3.select("#viz")
	  .append("svg")
        .attr("width", total_width)
        .attr("height", total_height)

	var plot_area = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

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

	var plot_area = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    plot_area.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", plot_width)
        .attr("y2", plot_height)
		.attr("stroke-width", 1)
		.attr("stroke", "black")
	
	svg.style("outline","1px solid black")
	plot_area.style("outline","1px dotted black")

</script>
