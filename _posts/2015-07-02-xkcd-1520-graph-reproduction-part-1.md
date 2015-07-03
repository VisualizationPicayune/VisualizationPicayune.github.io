---
layout: post
title: "Infectious Diseases, a Reproduction - part 1"
meta: "The first in a series of reproductions in D3."
date: 2015-07-02 17:59:01 +05:00
updated: 2015-07-03 12:00:00 +05:00
tags: D3 Reproduction XKCD
author: Christopher Michael Buck
comments: false
draft: false
---

How difficult would it be to reproduce this graph from [XKCD 1520](https://xkcd.com/1520/) in D3?

<div style="
    display: inline-block;
    height: 170px;
    width: 204px;
    background: url(../../../../degree_off.png);
    background-position: -392px -4px;
"></div>[XKCD license](http://xkcd.com/license.html)

(Cropped with CSS. See [Cropping Images with CSS]({% post_url 2015-06-30-cropping-images-with-CSS %}) for an explanation of CSS cropping.)

Perhaps very. Let's go for it. First pass, let's estimate by eye some of the values from the graph.

~~~
var data = [
    [1900, 790],
    [1921, 500], 
    [1925, 750],
    [1928, 400],
    [1950, 100],
    [1980, 50],
    [1994, 60],
    [2005, 55]
]
~~~

<script>
var data = [
    [1900, 790],
    [1921, 500], 
    [1925, 750],
    [1928, 400],
    [1950, 100],
    [1980, 50],
    [1994, 60],
    [2005, 55]
]
</script>

From observation we know the x domain is linear between 1900 to 2000: the 1900, 1950, and 2000 labels look approximately even. So we'll assume that the domain is linear for our guesses from 1900 to 2005. Similarly, the ticks look fairly even so the y domain is linear between 50 and 790.

Using the same CSS cropping, here's the graph line:

<div style="
    display: inline-block;
    height: 118px;
    width: 184px;
    background: url(../../../../degree_off.png);
    background-position: -411px -26px;
"></div>

To simplify matters we are making the reproduction the same scale as the original graph. Thus the x range is the same as the pixel width of the line (and the box): 184. The height, and therefore the y range, of the box and line is 118.

We will use the following functions to map the [year, count] data pairs to pixels.

~~~
var x = d3.scale.linear()
    .domain([1900, 2005])
    .range([0, 184])

var y = d3.scale.linear()
    .domain([50, 790])
    .range([118, 0])  // Reversed because SVG origin is upper left and our plot origin is bottom left
~~~

<script>
var x = d3.scale.linear()
    .domain([1900, 2005])
    .range([0, 184])

var y = d3.scale.linear()
    .domain([50, 790])
    .range([118, 0])  // Reversed because SVG origin is upper left and our plot origin is bottom left
</script>

Let's plot our line as gray over the original plot. See [A SVG Overplot]({% post_url 2015-07-02-a-svg-overplot %}) about SVG overlays and, by extension, D3 over-plots. Given the above here's the rest of the code to plot our reproduction so far (the estimates):

    var where = "#viz"
    
    var line = d3.svg.line()
        .x(function(d) { return x(d[0]); })
        .y(function(d) { return y(d[1]); })

    var viz = d3.select(where)
    var svg = viz.append("svg")
        .attr("width", 184)
        .attr("height",118)

    svg.append("path")
        .datum(data)
        .attr("d", line)
        .style("fill","none")
        .style("stroke","gray")

<script>

function plot(where) {    
    var line = d3.svg.line()
        .x(function(d) { return x(d[0]); })
        .y(function(d) { return y(d[1]); })

    var viz = d3.select(where)
    var svg = viz.append("svg")
        .attr("width", 184)
        .attr("height",118)

    svg.append("path")
        .datum(data)
        .attr("d", line)
        .style("fill","none")
        .style("stroke","gray")
}

</script>

<div style="position: relative; height: 124px;">
  <div style="
    display: inline-block;
    height: 118px;
    width: 184px;
    background: url(../../../../degree_off.png);
    background-position: -411px -26px;
    position: absolute;
  "></div>
  <div style="position: absolute;" id="viz"></div>
</div>
<script>
plot("#viz")
</script>

Not bad. Let's reduce the x range.

~~~
x.range([0, 178])
~~~

<script>
x.range([0, 178])
</script>

<div style="position: relative; height: 120px;">
  <div style="
    display: inline-block;
    height: 118px;
    width: 184px;
    background: url(../../../../degree_off.png);
    background-position: -411px -26px;
    position: absolute;
  "></div>
  <div style="position: absolute;" id="viz2"></div>
</div>
<script>
plot("#viz2")
</script>

Better. Better still, let's tune the estimates:

~~~
data = [
    [1900, 790],
    [1919, 500], 
    [1922, 700],
    [1925, 400],
    [1956, 104],
    [1984, 54],
    [1996, 80],
    [2005, 60]
]
~~~

<script>
data = [
    [1900, 790],
    [1919, 500], 
    [1922, 700],
    [1925, 400],
    [1956, 104],
    [1984, 54],
    [1996, 80],
    [2005, 60]
]
</script>
<div style="position: relative; height: 120px;">
  <div style="
    display: inline-block;
    height: 118px;
    width: 184px;
    background: url(../../../../degree_off.png);
    background-position: -411px -26px;
    position: absolute;
  "></div>
  <div style="position: absolute;" id="viz3"></div>
</div>
<script>
plot("#viz3")
</script>

Not bad, the gray line is far less visible. But manually tuning the data above was tedious. We could have created a overlay grid to help make the estimation more precise and the tuning a bit easier, but it would have still been tedious. If only there was a way to 'read' the graph line to reverse engineer the data. If only. There is, and that's what we'll do in part 2.