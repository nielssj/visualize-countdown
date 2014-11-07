/**
 * Created by niels on 11/7/14.
 */

var cCounter = {};

// Dimensions of counter arcs except for endAngle
cCounter.arc = d3.svg.arc()
    .innerRadius(65)
    .outerRadius(82)
    .startAngle(0);

// Adjust counter with given id using given data function. Invoke callback if 0 is reached.
cCounter.adjustCounter = function (parentId, data, refillCallback) {
    var parent = d3.select("#" + parentId);

    // Interpolated animation function to adjust endAngle of an arc (invoked every 24 seconds by d3 during animation)
    var arcTween = function(transition, newAngle) {
        transition.attrTween("d", function(d) {
            var interpolate = d3.interpolate(d.endAngle, newAngle);
            return function (t) {
                d.endAngle = interpolate(t);
                return cCounter.arc(d);
            };
        });
    };

    // Animate arc
    parent.select(".progArc")
        .transition()
        .duration(1000)
        .call(arcTween, data.currentRad);

    // Update large label
    parent.select(".current tspan")
        .text(data.current + data.currentUnits);

    // Update small label
    parent.select(".total tspan").text(data.total + data.totalUnits);

    // Invoke callback if counter is refilling (i.e. deduct time from larger counter)
    if(refillCallback && data.current == data.refillValue) {
        refillCallback();
    }
};

// Initialize a counter with a given data id and data function
cCounter.initializeCounter = function(gId, data) {
    var parent = d3.select("#" + gId);

    parent.select(".progArc").remove();
    parent.append("path")
        .datum({endAngle: 6.28})
        .attr("d", cCounter.arc)
        .attr("transform", "translate(396,814.5)")
        .attr("class", "progArc")
        .style("fill", "#58b4f2");

    cCounter.adjustCounter(gId, data);
};