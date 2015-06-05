---
layout: post
title: "Fade to Black"
meta: "Contrast studies in D3"
date: 2015-06-08 12:01:01 +05:00
tags: D3 stark
draft: true
custom_js: fade-to-black
---

Black line plot with a "black" grid of various opacities between 1 and 0.01 on a white background.

<div id="examples-1" style="margin-bottom: 10px"></div>
<div id="examples-2" style="margin-bottom: 10px"></div>
<div id="examples-3" style="margin-bottom: 10px"></div>
<div id="examples-4" style="margin-bottom: 10px"></div>
<div id="examples-5" style="margin-bottom: 10px"></div>
<div id="examples-6" style="margin-bottom: 10px"></div>


To my eye, the grid lines get in the way for 1 and 0.5, and are useless at 0.01

<div id="secondary-examples" style="margin-bottom: 10px"></div>

Here's minimalist, starting, D3 JavaScript implementation of just the axes, using the D3 and CSS defaults, which generates the first graph above:
```
```

The final graph above was generated with this JavaScript

```
javascript
```

and the associated additional CSS:
```
css
```

Some preliminaries. Let's say we know that we know we have yearly data from 1900 to 1958 with a single measurement per year in a the range of 50 to 40000. We also the measurement is a count, so that it's 0 based.

The space between 

<div id="range-examples"></div>

And we 
First let's take care of the fill for t

<div id="figure-1"></div>

Remove the labels.

<div id="figure-2"></div>

Get rid of the
<div id="figure-3"></div>
<div id="figure-4"></div>

So, you've got some bivarate data like the number of times babies were named Joseph in the US for the last twenty years:
Given some data:
```javascript
var data = [[1890,40
```
And you plot it with D3:

Here's the 


So, I haven't found much on the use of tick, so I've updated the documentation, but I limited the treatments there to common use. This is a fuller example  of some of the trade offs. I'll finish with some discussion of best practices, specificity about best practices for the example given. Please leave any reactions to the form, especially if you have a ...

A note about accessibility: note that for those ... ...

Using small multiples, let's compare the treatment of the same data. Again: the focus here is not on the particular data, but the treatment of it.

Here I'm varying the width of of the ticks from a single pixel to half the width of the representation.

For the vertical axis I'm varying the ....

Without any grid at all, estimating the value of a point is...

From a graph you relative, ...

Here's the rubric I'm using for analysis:

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
<div id="d3-1"></div>
<div></div>

And another line.
