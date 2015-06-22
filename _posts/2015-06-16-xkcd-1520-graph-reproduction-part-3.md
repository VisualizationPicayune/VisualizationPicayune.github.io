---
layout: post
title: "XKCD 1520 Graph Reproduction (part 3)"
meta: "The first in a series of D3 reproductions."
date: 2015-06-16 15:01:01 +05:00
tags: D3 Reproduction
author: Christopher Michael Buck
comments: false
draft: true
custom_js:
 - image_util
 - color_distances
---

Part 1: Introduce the graphic, plot guesses in D3, pick font
Hand-drawn line
Grid Over-plot
Part 2: Better Guesses
Blobs
Part 3: Data from XKCD
A simple color distance
Part 4: Data from source

This is the third in the series. See: 

So far, we have this:

We acquired the data points by eye: by human estimation. What can we with some computation?

Here's a bar chart of the colors ordered by frequency (see ):

The information we want is monotonic in time: the x axis. So

The graph line is great, which is expected because we have measurements at every pixel. This is as close as we're going to make the reproduction. If this was a more precise graph, and assuming the data was yearly, to approximate the original data we'd  bin our 'readings' of the graph line into yearly increments, average and plot that:


We get:

Not as close to the original, but in a sense more like the plot the XKCD is a copy of. In the next, final, installment in this series, we'll take a look at plotting the original data. If you want to read the paper we're going to get the data from, it's here.


Part 4)

We've already seen how to gather data from the XKCD plot. Let's grab the data in a similar manner from ...

Unlike the XKCD graphic, we have known values from the paper. They are:

We can isolate the graph line, like we did for the XKCD line. The color bar chart is, well, more colorful:

In this case we don't need to isolate by space, because we can isolate by color.

Like in part 3, let's bin by year,

Now we have pixel addresses that should have a linear relationship to the actual data. For 1900, our pixel address is []. our first data point is at []. For , our pixel address is [], and our data point is []. Using a linear scale from D3 see():

    var x = d3.scale(
    var y = d3.scale(

To test:
    x(1985)
    x(1986)
    
    y(1985)
    y(1986)
    
Hmmm... our test points are shifted by...





