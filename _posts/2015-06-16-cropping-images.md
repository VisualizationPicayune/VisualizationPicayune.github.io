---
layout: post
title: "Cropping Images"
meta: "A p of JavaScript"
date: 2015-06-16 15:01:01 +05:00
tags: JavaScript
author: Christopher Michael Buck
comments: false
draft: true
custom_js:
 - image_util
 - color_distances
---

How to crop images depends on what you're going to do with them.  If you're simply going to display part of one, 

Two cases: when it's yours and ...

For an upcoming graph reproduction I wanted to display part of a image The 
You've got an image and y
Given that you've l
a

If you simply want to display the item:

<a href="https://xkcd.com/1520/" 
style="display: inline-block;
height: 170px;
width: 204px;
background: url(https://imgs.xkcd.com/comics/degree_off.png);
background-position: -392px -4px;"></a>

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

Here styling did all the work. Let's say you actually to manipulate the chunk in a canvas.




