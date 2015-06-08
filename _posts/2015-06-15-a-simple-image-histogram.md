---
layout: post
title: "A Simple Image Histogram"
meta: "A picayune of D3"
date: 2015-06-15 12:01:01 +05:00
tags: D3 stark
author: Christopher Michael Buck
comments: false
draft: true
---

This is graph to Given the data from a canvas


Okay. Let's now plot the x most 

<div id="image-div"></div>

<!--<canvas id="canvas" width="300" height="300"></canvas>-->

<div id="viz"></div>

<script>
    var img = new Image()
    img.src = '../../../../../joc80862f1.gif'
    var image_div = document.getElementById("image-div")

    var results = {}
    var context;
    img.onload = function () {
        //var canvas = document.getElementById("canvas");
        var canvas = document.createElement('canvas')
        canvas.width=img.width
        canvas.height=img.height
        context = canvas.getContext('2d')
        context.drawImage(img, 0, 0)
        image_div.appendChild(canvas)
        var pixels = context.getImageData(0, 0, img.width, img.height)
        var data = pixels.data
        for (var i=0; i < data.length; i = i+4) {
           var s = ("0"+data[i+0].toString(16)).slice(-2) +
           ("0"+data[i+1].toString(16)).slice(-2) +
           ("0"+data[i+2].toString(16)).slice(-2)
           if (data[i+3] !== 255) { alert("Paritally Transparent: "+data[i+3]) }
           // ("0"+data[i+3].toString(16)).slice(-2)
           results[s] = (results[s] | 0) + 1
        }
        var a = []
        for (var key in results) {
            if (results.hasOwnProperty(key)) {
                var val = results[key]
                a.push([val, key])
            }
        }
        var sorted = a.sort(function(a,b) { return b[0] - a[0] } )
        display(sorted)
        console.log(sorted.length)
    }
    
    function display(sorted) {
        histogram("#viz", sorted.slice(4))
        //histogram("#viz", sorted.slice(0,5))
        //histogram("#viz", sorted.slice(6,16))
    }
    
    function histogram(where, data) {
        var width = 700
        var height = 500
      
        var x = d3.scale.ordinal()
            .domain(data.map(function(d) { return d[1] }))
            .rangeRoundBands([0, width], .1)
                        
        var y = d3.scale.linear()
            .domain([0, d3.max(data, function(d) { return d[0] })])
            .range([height, 0])

        var viz = d3.select(where)
            
        var svg = viz.append("svg")
            .attr("width", width)
            .attr("height", height)
  
        var bar = svg.selectAll("g")
            .data(data)
          .enter().append("g")
            .attr("transform", function(d) { return "translate(" + x(d[1]) + ",0)"; });

        bar.append("rect")
            .attr("y", function(d) { return y(d[0]); })
            .attr("height", function(d) { return height - y(d[0]); })
            .attr("width", x.rangeBand())
            .attr("fill", function(d) { return "#"+d[1] })

        //bar.append("text")
        //    .attr("x", x.rangeBand() / 2)
        //    .attr("y", function(d) { return y(d[0]) + 3; })
        //    .attr("dy", ".75em")
        //    .text(function(d) { return d[1]; });
    }
    
    function rough_color_distance_measure( r1, g1, b1, r2, g2, b2 ) {
        var r_ave = (r1 + r2) / 2
        var r_component = (2 + (r_ave / 256)) * (r1 - r2) * (r1 - r2)
        var g_component = 4 * (g1 - g2) * (g1 - g2)
        var b_component = (2 + ((255 - r_ave) / 256)) * (b1 - b2) * (b1 - b2)
        return Math.sqrt(r_component + g_component + b_component)
    }
    
</script>

Something underneath. 