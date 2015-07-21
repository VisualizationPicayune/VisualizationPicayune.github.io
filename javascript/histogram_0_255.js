    function histogram_0_255(options, data) {
        var width = options.width || 700
        var height = options.height || 500
        var where = options.where
      
        var x = d3.scale.linear()
            .domain([0, 255])
            .range([0, width])
                        
        var y = d3.scale.linear()
            .domain([0, d3.max(data, function(d) { return d })])
            .range([height, 0])
            
        //var yAxis = d3.svg.axis().scale(y).ticks(4);

        var viz = d3.select(where)
        //var div = viz.append("div")
        //    .attr("width", width)
        //    .attr("height", height)
          
        var svg = viz.append("svg")
            .attr("width", width)
            .attr("height", height)
  
        var bar = svg.selectAll("g")
            .data(data)
          .enter().append("g")
            .attr("transform", function(d, i) { return "translate(" + x(i) + ",0)"; })

        bar.append("rect")
            .attr("y", function(d, i) { return y(d) })
            .attr("height", function(d) { return height - y(d) })
            .attr("width", width/256)
            .attr("fill", "black")
            
        // Add the y-axis.
        //svg.append("g")
        //    .attr("class", "y axis")
        //    .attr("transform", "translate(" + width + ",0)")
        //    .call(yAxis);
    }
