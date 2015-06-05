---
layout: post
title: "Domain and Range"
meta: "A picayune of D3"
date: 2015-06-06 16:31:01 +05:00
tags: D3 stark
author: Christopher Michael Buck
comments: false
draft: true
---

An easy way to create grid lines with D3 is to use ticks, where the tick is the height of the plot for the x axis and the width of the plot for the y axis. Thusly:

    var x_axis = d3.svg.axis()
        .tickSize(-plot_height)
		...

    var y_axis = d3.svg.axis()
        .tickSize(-plot_width)
		...

TL;DR
From the top. Given you have a SVG element created, perhaps, like this (see: [Centering a D3 Plot]({% post_url 2015-06-05-centering-a-plot %})):

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

The range of  (see: [Domain and Range]({% post_url 2015-06-06-domain-and-range %})):
   var x = d3.scale.linear()
        .range([0, plot_width]);

    // Range is flipped because svg origin is at top (left).
    var y = d3.scale.linear()
        .range([plot_height, 0]);
        
    x.domain([1880, 2020])
    y.domain([0, 40000])


<div id="examples-1" style="margin-bottom: 10px"></div>


And the CSS:


<style>
.axis {
   font: 10px sans-serif;
}

.axis path {
    display: none;
}

.axis line {
    fill: none;
    stroke: #000;
    shape-rendering: crispEdges;
}


/* remove the path (outside box) */
.no-line.y.axis path {
    display: none;
}

.no-line.x.axis path {
    display: none;
}

.line {
  fill: none;
  stroke: black;
}

</style>
