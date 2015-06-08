---
layout: post
title: "XKCD 1520 Graph Recreation"
meta: "D3 Recreation"
date: 2015-06-15 12:01:01 +05:00
tags: D3 
author: Christopher Michael Buck
comments: false
draft: true
---

http://xkcd.com/1520/

http://www.explainxkcd.com/wiki/index.php/1520

http://jama.jamanetwork.com/article.aspx?articleid=768249

http://amaprod.silverchaircdn.com/data/Journals/JAMA/4590/m_joc80862f1.gif

The data is gathered and plotted and we have:

Right. It doesn't look hand drawn.  Let's take a

http://www.cdc.gov/nchs/fastats/infectious-disease.htm

http://apps.who.int/gho/data/node.main.171?lang=en

var deaths_per_100000 = [
    [1900, 797],
    [1980, 36],
    [1995, 63],
    [1996, 59]
]

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



