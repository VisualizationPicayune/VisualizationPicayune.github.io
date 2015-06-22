---
layout: post
title: "XKCD 1520 Graph Reproduction (part 1)"
meta: "The first in a series of reproductions in D3."
date: 2015-06-16 15:01:01 +05:00
tags: D3 Reproduction
author: Christopher Michael Buck
comments: false
draft: true
custom_js:
 - image_util
 - color_distances
---

This is the first of a first, the first part of the first in a series of graph reproductions in D3. Later on, we'll work on some historical reproductions, much like the fine work of Jim V. For now, let's reproduce this graph from XKCD:

<a href="https://xkcd.com/1520/" 
style="display: inline-block;
height: 170px;
width: 204px;
background: url(../../../../degree_off.png);
background-position: -392px -4px;"></a><a href="https://xkcd.com/license.html">used under license</a>
<!-- https://imgs.xkcd.com/comics/degree_off.png -->

The graph itself, as you might 

<a href="https://xkcd.com/1520/" 
style="display: inline-block;
height: 118px;
width: 184px;
background: url(../../../../degree_off.png);
background-position: -411px -26px;"></a><a href="https://xkcd.com/license.html">A</a>


Later, we'll take a look at ways to better estimate the graph line, for now, we'll estimate by eye some of the values from the graph.

    var data = [
        [1900, 795],
        [1921, 500], 
        [1925, 750],
        [1928, 400],
        [1950, 100],
        [1980, 50],
        [1994, 60],
        [2000, 55]
    ]

From observation we know the x domain is linear between 1900 to 2000 with a little space at the ends. The x range is the width of the box on the screen, which we'll make the same as the graph we're reproducing so that we can easily make comparisons.

    var x = d3.scale.linear()
        .domain([1896, 2004])
        .range([0, 204])
        
Likewise the y domain is linear between 0 and 800, and the range is the height of the graph we are reproducing.

    var y = d3.scale.linear()
        .domain([0, 800])
        .range([170, 0])  // Reversed because SVG origin is upper left and our plot origin is bottom left

These are the functions that do the mapping of the data to pixels.



Pick the label font:

    <link href='http://fonts.googleapis.com/css?family=Patrick+Hand' rel='stylesheet' type='text/css'>

Setup the x and y axes functions:

And draw the graph


Not bad. Let's fix the alignment
[bl.ocks][gist]

<div id="viz2"></div>
<a href="https://xkcd.com/1520/" 
style="display: inline-block;
height: 170px;
width: 204px;
background: url(../../../../degree_off.png);
background-position: -392px -4px;"></a><a href="https://xkcd.com/license.html">used under license</a>

<script>
    var data = [
        [1900, 795],
        [1921, 500], 
        [1925, 750],
        [1928, 400],
        [1950, 100],
        [1980, 50],
        [1994, 60],
        [2000, 55]
    ]
    

    var x_labels = [1900, 1950, 2000]
    var y_labels = [200, 400, 600, 800]

    var options = {
        where: "#viz2",
        height: 170,
        width: 204,
        margin: { top: 10, right: 10, bottom: 20, left: 20 }
    }
    
        var where = options.where
        
        var full_width = options.width || 420
        var full_height = options.height || 260
        var margin = options.margin || {top: 20, right: 20, bottom: 30, left: 50}
        var width = full_width - margin.left - margin.right
        var height = full_height - margin.top - margin.bottom

        var x = d3.scale.linear()
            .range([0, width]);

        // Range is flipped because svg origin is at top (left).
        var y = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .tickFormat(d3.format("04d"))
            .ticks(3)

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(4)
            .tickSize(-4)
 
        var line = d3.svg.line()
            .x(function(d) { return x(d[0]); })
            .y(function(d) { return y(d[1]); });

        var viz = d3.select(where)
        var svg = viz.append("svg")
            .attr("width", full_width)
            .attr("height", full_height)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        var x_extent = d3.extent(data, function(d) { return d[0]; })
        var y_extent = d3.extent(data, function(d) { return d[1]; })
        var x_magnitude = x_extent[1] - x_extent[0]
        var y_magnitude = y_extent[1] - y_extent[0]
        
        var x_padding = x_magnitude / 50
        var y_padding = y_magnitude / 50
        
        x.domain([x_extent[0]-x_padding, x_extent[1]+x_padding])
        y.domain([y_extent[0]-y_padding, y_extent[1]+y_padding])
        

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .style("fill","none")
            .style("stroke","black")
            .selectAll("text").style("fill", "black").style("stroke","none").style("font-family","Patrick Hand")

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .style("fill","none")
            .style("stroke","black")
            .selectAll("text").style("fill", "black").style("stroke","none")

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line)
            .style("fill","none")
            .style("stroke","black")

</script>
<style>
#viz2 .axis text {
    font-family: "Patrick Hand";
    font-size: 10px;
    fill: "black";
    stroke: "none";
}

</style>

<link href='http://fonts.googleapis.com/css?family=Patrick+Hand' rel='stylesheet' type='text/css'>

<span style='font-family: "Patrick Hand"; font-size: 20px'>Patrick Hand PER 100,000</span>

This graph from XKCD caught my eye. How difficult would it be to reproduce in D3?

It's a simple graph, just axes and the line. Straightforward, right? Sure.

If you're willing to give up some of the hand-drawn look, it 


/* use the same trick css sprites use to display a particular part of the reference graphic */


.y-axis-clip {
    display: inline-block;
    height: 160px;
	width: 50px;
	background: url(silver-feature-joseph2.png);
	background-position: 0px -60px;
	background-size: 500px;
}

[Go Team](https://xkcd.com/1520/)
https://xkcd.com/license.html

That depends. A hand sketch on a light table? Fairly simple, especially if you don't care about how sloppy it is.





In a later entry, I'll take a look at drawing the graph closer to the one in the original paper.


How about more precision? How about a graph in D3 from the original paper? More difficult.

Explain XKCD
http://www.explainxkcd.com/wiki/index.php/1520
says the original source is in the article 
 Trends in Infectious Disease Mortality in the United States During the 20th Century (Figure 1)
http://jama.jamanetwork.com/article.aspx?articleid=768249
with the image
http://amaprod.silverchaircdn.com/data/Journals/JAMA/4590/joc80862f1.gif

The article specifies four data points as deaths per 100000, for 1900 (797), 1980(36), 1995(63), and 1996(59). All the rest of the data in the text is specified as trends. Given just this data we have:
[self generated view]
[view and code / bl.ocks link]

How about guessing a few more values?

Okay.

Oh, look! A rabbit hole. Let's go down it.

We can better approximate the original values if we "simply" measure the original graph. This is a what, a six color graph? We can find the colors of the graph and pick the right one. Here's a bar graph of the colors used in the graph.
[self generated view]
Let's drop white and just plot the first five.
[self generated view]
[view and code / bl.ocks link]

Now we can take the image and plot those points.
[self generated view]

It's all jittery and we don't have axes.

We could calculate where they go, but plotting them by eye works:

We know the first point, which is minimum x is at 1900, 797 and the minimum y is at 1980, 36.
We also know that the original graph covers years from 1900 to 1996.
We also know that the line in the original was drawn with a width, about 2.5 (human eye estimate).
We add one to the start

The XKCD graph seems to go to 2000.

We might get lucky.
There are two ways to the 


The data is gathered and plotted and we have:

Right. It doesn't look hand drawn. We have too many points.  Let's take a

But what if we wanted to replot on 

Speaking of rabbit holes, what other ways could we have gotten the data to work with? What raw data sources are available? Reditt discussion here.


http://www.cdc.gov/nchs/fastats/infectious-disease.htm

http://apps.who.int/gho/data/node.main.171?lang=en



<div id="viz"></div>


<script>
    var src = '../../../../../joc80862f1.gif'
    
    var pixel_counts;
    var grouped;
    var addresses;
        
    image_util.get_image_pixels(src, function(pixels) {
        pixel_counts = image_util.get_pixel_counts(pixels.data)
        grouped = color_distances.group(pixel_counts.color_counts, 200.0)
        addresses = image_util.get_graph_addresses_by_color(pixels, grouped[1][0][0])
        plot(addresses, pixels.width, pixels.height)        
    })
    
    var deaths_per_100000 = [
        [1900, 797],
        [1980, 36],
        [1995, 63],
        [1996, 59]
    ]

    function test(fx) {
        var errors = []
        deaths_per_100000.forEach(function(pair) {
            if (fx(pair[0]) !== pair[1]) {
              errors.push( [ pair[0], pair[1], fx(pair[0]) ] )
            }
        })
        return errors
    }
    
    function year(addresses) {
    }
    
    function plot(data, width, height) {      
    var total_width = width
    var total_height = height
	var margin = { top: 0, right: 0, left: 70, bottom: 20 }
	var plot_width = total_width - margin.left - margin.right
	var plot_height = total_height - margin.top - margin.bottom

    var svg = d3.select("#viz")
        .append("svg")
            .attr("width", total_width)
            .attr("height", total_height)
         
    svg.append("rect")
        .attr("x", 0)
       	.attr("y", 0)
       	.attr("height", height)
       	.attr("width", width)
       	.style("stroke", "black")
       	.style("fill", "none")
       	.style("stroke-width", 1)
        
    var axes = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

	// plotting functions (this post)
    //var x = d3.scale.linear()
	//	.domain(x_values)
    //    .range([0, plot_width])
		
    // Range is flipped because svg origin is at top (left).
    //var y = d3.scale.linear()
    //    .domain(y_values)
    //    .range([plot_height, 0])

    // Use the scaling functions to translate data pairs
    var line = d3.svg.line()
        .x(function(d) { return d[0]; })
        .y(function(d) { return d[1]; })
        //.x(function(d) { return x(d[0]); })
        //.y(function(d) { return y(d[1]); })
        
    svg.append("path")
        .datum(data)
		.style("fill","none")     // Without this you get a triangle
		.style("stroke","black")  // Without this you get nothing
        .style("stroke-width", 2.5)
        .attr("d", line)   

    var x_pixel_extent = d3.extent(data,function(d) { return d[0] })
    var min_pixel_x = x_pixel_extent[0]
    var max_pixel_x = x_pixel_extent[1]
    var min_year_x = 1900
    var max_year_x = 1996
    
    var x = d3.scale.linear()
        .range([0, plot_width])
        .domain([1896, 2000])

    // Range is flipped because SVG origin is at top (left).
    var y = d3.scale.linear()
        .range([plot_height, 0])
        .domain([0, 800])
        
    var x_axis = d3.svg.axis()
		.tickSize(-plot_height) // Re-purpose tick marks as vertical grid lines
        .scale(x)
        .orient("bottom")

    //var y_axis = d3.svg.axis()
	//	.tickSize(-plot_width)  // Re-purpose tick marks as horizontal grid lines
    //    .scale(y)
    //    .orient("left")
    
    
    var min_y_pixel_address = d3.min(data, function(d) { return d[1] })
    var min_year_y = 1980
    
    axes.append("g")
        .attr("transform", "translate(0," + plot_height + ")")
        .style("fill", "none")
        .style("stroke", "black")
        .call(x_axis)

    //svg.append("g")
    //    .style("fill", "none")
    //    .style("stroke", "black")
    //    .call(y_axis)  
    }

</script>

var guesses_per_100000 = [
    [1916, 450],
    [1918, 975],
    [1920, 375],
    [1955, 75]
]

Here's a trick. Let's take the original graph and

Load the image into a .

Get the size.

Create a canvas with the same size.

Generate a histogram of the colors.

Hand pick the color.

