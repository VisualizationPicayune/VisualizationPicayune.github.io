---
layout: post
title: "On RGB Color Distances"
meta: "A p of JavaScript"
date: 2015-07-07 15:01:01 +05:00
tags: JavaScript
author: Christopher Michael Buck
comments: false
draft: true
custom_js:
 - image_util
 - color_distances
---

To normalize between 0 and 1:

0 distance means: same color, 1 is the distance between black and white.

(abs(r1-r2) + abs(g1-g2) + abs(b1-b2))/(255*3)

Note this is quite different than a human
This is a JavaScript implementation of E'' from "".


Here's equally spaced colors from xx to xx in each:

It turns out that the two measures track ???exactly??? on the gray scale.

How about from random rgb to random rgb where both the human and the machine distance are greater than 0.5?

