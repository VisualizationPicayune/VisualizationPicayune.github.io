    function line_graph(options, data) {
    
        var where = options.where
        
        var full_width = options.width || 420
        var full_height = options.height || 260
        var margin = options.margin || {top: 20, right: 20, bottom: 30, left: 50}
        var x_domain = options.x_domain || d3.extent(data, function(d) { return d[0]; })
        var y_domain = options.y_domain || d3.extent(data, function(d) { return d[1]; })
        
        var width = full_width - margin.left - margin.right
        var height = full_height - margin.top - margin.bottom

        var x = d3.scale.linear()
            .range([0, width])
            .domain(x_domain)

        // Range is flipped because svg origin is at top (left).
        var y = d3.scale.linear()
            .range([height, 0])
            .domain(y_domain)

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .tickFormat(d3.format("04d"));

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");
 
        var line = d3.svg.line()
            .x(function(d) { return x(d[0]); })
            .y(function(d) { return y(d[1]); });

        var viz = d3.select(where)
        var svg = viz.append("svg")
            .attr("width", full_width)
            .attr("height", full_height)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);
    }
