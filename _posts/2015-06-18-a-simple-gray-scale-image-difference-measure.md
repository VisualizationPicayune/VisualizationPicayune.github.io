---
layout: post
title: "A Simple Gray-scale Image Difference Measure"
meta: "A p of JavaScript"
date: 2015-06-18 15:01:01 +05:00
tags: JavaScript
author: Christopher Michael Buck
comments: false
draft: true
custom_js:
 - image_util
 - color_distances
---

This measure is only good on gray-scale images of the same dimensions. Since the red, green, and blue components of a gray-scale image are the same, it simply uses the red component. Transparency is not taken into account.



