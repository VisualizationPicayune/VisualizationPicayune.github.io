    function bar_chart(options, data) {
        var width = options.width || 700
        var height = options.height || 500
        var where = options.where
      
        var x = d3.scale.ordinal()
            .domain(data.map(function(d) { return d[0] }))
            .rangeRoundBands([0, width], .1)
                        
        var y = d3.scale.linear()
            .domain([0, d3.max(data, function(d) { return d[1] })])
            .range([height, 0])

        var viz = d3.select(where)

        // Tooltip.  Adapted from: http://stackoverflow.com/a/16780756/718291 and http://bl.ocks.org/mbostock/3902569
        var tool_tip = d3.select(where).append("div")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("display", "none")
            .style("background","rgba(255,255,255,0.6)") // semi-transparent white background
            .style("border-radius", "4px")
            .style("padding","0px 4px 0px 4px")
            .text("Placeholder Text")
        
        var svg = viz.append("svg")
            .attr("width", width)
            .attr("height", height)
  
        var bar = svg.selectAll("g")
            .data(data)
          .enter().append("g")
            .attr("transform", function(d) { return "translate(" + x(d[0]) + ",0)"; })

        bar.append("rect")
            .attr("y", function(d) { return y(d[1]) })
            .attr("height", function(d) { return height - y(d[1]) })
            .attr("width", x.rangeBand())
            .attr("fill", function(d) {
                return "#"+("000000"+d[0].toString(16)).slice(-6)  // covert and zero pad hex color
            })
            .on("mouseover", function(d){
                tool_tip.text(" #"+("000000"+d[0].toString(16)).slice(-6)+" ")
                tool_tip.style("display", null)
            })
            .on("mousemove", function() {
                tool_tip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px")
            })
            .on("mouseout", function(){
                tool_tip.style("display", "none")
            })
    }
