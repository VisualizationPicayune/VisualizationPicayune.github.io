---
layout: post
title: "Cropping Images with CSS"
meta: "A Picayune of JavaScript"
date: 2015-06-30 11:57:01 +05:00
updated: 2015-07-03 10:30:00 +05:00
tags: JavaScript
author: Christopher Michael Buck
comments: false
draft: false
---

The same technique that is used for CSS sprites can be used to display part of any image. For example, here is the US infectious disease graph from [XKCD 1520](https://xkcd.com/1520/):

<div style="
    background: url(https://imgs.xkcd.com/comics/degree_off.png);
    height: 170px;
    width: 204px;
    background-position: -392px -4px;
    display: inline-block;
"></div>
[XKCD license](http://xkcd.com/license.html)

~~~ 
<div style="
    background: url(https://imgs.xkcd.com/comics/degree_off.png);
    height: 170px;
    width: 204px;
    background-position: -392px -4px;
    display: inline-block;
"></div>
~~~
Height and width specify the size of the crop, and background-position above shifts the image left and up. Think of which pixel you want in the upper left corner of the crop. The same method can be used for an image link:

~~~ 
<a href="https://xkcd.com/1520/" style="
    background: url(https://imgs.xkcd.com/comics/degree_off.png);
    height: 170px;
    width: 204px;
    background-position: -392px -4px;
    display: inline-block;
"></a>
~~~
