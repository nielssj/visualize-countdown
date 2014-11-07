/**
 * Created by niels on 11/7/14.
 */

var bPercentage = {};

// Initialize percentage bar
bPercentage.initializePercentage = function(perc) {
    var gW = 540 * (1-perc);
    var bW = 540 * perc;

    // Remove dummy bars
    d3.select("#path4585").remove();
    d3.select("#path4587").remove();

    // Insert and initialize actual bars
    d3.select("#g3083").insert("rect", ":first-child")
        .attr("width", gW) // max 540
        .style("fill", "#d3d2d2")
        .attr("transform", "translate(127,1024)")
        .attr("height", 22)
        .attr("id", "passedPercRect");

    d3.select("#g3083").insert("rect", ":first-child")
        .attr("width", bW) // max 540
        .style("fill", "#58b4f2")
        .attr("transform", "translate(" + (127+gW) + ",1024)")
        .attr("height", 22.1)
        .attr("id", "remainPercRect");

    // Initialize text labels
    var percF = Math.round(perc * 100);
    var percR = 100 - percF;
    d3.select("#tspan3077")
        .datum({value: perc})
        .text(percF + "%");
    d3.select("#passedPercLabel")
        .datum({value: 1-perc})
        .text(percF + "%");
    d3.select("#remainPercLabel")
        .datum({value: perc})
        .text(percR + "%");
};

// Adjust percentage bar
bPercentage.adjustPercentage = function(perc) {
    var gW = 540 * (1-perc);
    var bW = 540 * perc;

    // Animate the bar(s) itself
    d3.select("#passedPercRect")
        .transition()
        .duration(2000)
        .attr("width", gW);

    d3.select("#remainPercRect")
        .transition()
        .duration(2000)
        .attr("width", bW)
        .attr("transform", "translate(" + (127+gW) + ",1024)");

    // Interpolated animation function to adjust percentage labels gradually
    var labelTween = function(transition, newVal) {
        transition.tween("text", function(data) {
            var interpolate = d3.interpolate(data.value, newVal);
            return function(t) {
                data.value = interpolate(t);
                console.log(data.value);
                this.textContent = Math.round(data.value * 100) + "%";
            };
        });
    };

    // Animate text labels
    d3.select("#passedPercLabel")
        .transition()
        .duration(2000)
        .call(labelTween, 1 - perc);

    d3.select("#remainPercLabel")
        .transition()
        .duration(2000)
        .call(labelTween, perc);

    d3.select("#tspan3077")
        .transition()
        .duration(2000)
        .call(labelTween, perc);
};