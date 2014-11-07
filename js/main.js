/**
 * Created by niels on 11/4/14.
 * D3.js and SVG based animated countdown to a given date
 */

d3.xml("img/index.svg", "image/svg+xml", function(xml) {
    // Append imported SVG to DOM
    document.body.appendChild(xml.documentElement);

    // Initialize target date to countdown towards
    var arrival = moment("2014-12-19 11:00 +0800", "YYYY-MM-DD HH:mm Z");
    var start = moment(moment("2014-09-01 12:00 +0200", "YYYY-MM-DD HH:mm Z"));

    // Center entire SVG element
    var svg = d3.select("svg")
        .style("display", "block")
        .style("margin", "auto");

    // Adjust large day label in text
    var AdjustDayLabel = function (id, data) {
        d3.select("#" + id)
            .text(data.total + data.totalUnits);
    };


    var initializePercentage = function(perc) {
        d3.select("#path4585").remove();
        d3.select("#path4587").remove();

        var gW = 540 * (1-perc);
        var bW = 540 * perc;

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

    var adjustPercentage = function(perc) {
        var gW = 540 * (1-perc);
        var bW = 540 * perc;

        d3.select("#passedPercRect")
            .transition()
            .duration(2000)
            .attr("width", gW);

        d3.select("#remainPercRect")
            .transition()
            .duration(2000)
            .attr("width", bW)
            .attr("transform", "translate(" + (127+gW) + ",1024)");

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

    // Initialize all 3 counters
    cCounter.initializeCounter("seconds", tUtil.currentSecond(arrival));
    cCounter.initializeCounter("minutes", tUtil.currentMinute(arrival));
    cCounter.initializeCounter("hours", tUtil.currentHour(arrival));
    AdjustDayLabel("days", tUtil.currentHour(arrival));

    // Initialize percentage
    var periodDur = moment.utc(arrival).diff(start);
    var remDur = moment.utc(arrival).diff(moment());
    var remPerc = remDur / periodDur;
    initializePercentage(1);
    adjustPercentage(remPerc);

    // Start interval timer to adjust counters once every second
    setInterval(function () {
        // Adjust counters, pass callback to each other to update next counter when reaching 0
        cCounter.adjustCounter("seconds", tUtil.currentSecond(arrival), function() {
            cCounter.adjustCounter("minutes", tUtil.currentMinute(arrival), function() {
                cCounter.adjustCounter("hours", tUtil.currentHour(arrival), function() {
                    AdjustDayLabel("days", tUtil.currentHour(arrival));
                })
            });
        });
    }, 1000);
});