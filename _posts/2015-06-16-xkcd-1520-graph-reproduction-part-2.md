---
layout: post
title: "XKCD 1520 Graph Reproduction (part 2)"
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

This is the second in the series. See: 

So far, we have this:

Neither the axes or the plot look hand-drawn and more data is needed. How to draw an approximation of a hand-drawn line in SVG is the subject of another post. Treating the D3 generated axes as structure (for graphic placement), replace the other parts:

One way to get better data is to have better guesses. To have better guesses, we can overlay a grid on the original graphic:

After we do that...

Looking better. How would we do a similar thing programmaticly?

