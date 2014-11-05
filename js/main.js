/**
 * Created by niels on 11/4/14.
 * D3.js and SVG based animated countdown to a given date
 */

d3.xml("img/index.svg", "image/svg+xml", function(xml) {
    // Append imported SVG to DOM
    document.body.appendChild(xml.documentElement);

    // Initialize target date to countdown towards
    var arrival = moment("2014-12-19 11:00 +0800", "YYYY-MM-DD HH:mm Z");

    // Center entire SVG element
    var svg = d3.select("svg")
        .style("display", "block")
        .style("margin", "auto");

    // Dimensions of counter arcs except for endAngle
    var arc = d3.svg.arc()
        .innerRadius(65)
        .outerRadius(82)
        .startAngle(0);

    // Interpolated animation function to adjust endAngle of an arc (invoked every 24 seconds by d3 during animation)
    var arcTween = function(transition, newAngle) {
        transition.attrTween("d", function(d) {
            var interpolate = d3.interpolate(d.endAngle, newAngle);
            return function(t) {
                d.endAngle = interpolate(t);
                return arc(d);
            };
        });
    };

    // Calculate number of seconds left of current minute. Also calculate total number of minutes
    var currentSecond = function() {
        var rem = moment.duration(moment.utc(arrival).diff(moment()));
        return {
            current: rem.seconds(),
            currentUnits: "s",
            currentRad: rem.seconds() * 0.104666667,
            total: Math.ceil(rem.asMinutes()),
            totalUnits: "m",
            refillValue: 59
        }
    };

    // Calculate number of minutes left of current hour. Also calculate total number of hours
    var currentMinute = function() {
        var rem = moment.duration(moment.utc(arrival).diff(moment()));
        return {
            current: rem.minutes(),
            currentUnits: "m",
            currentRad: rem.minutes() * 0.104666667,
            total: Math.ceil(rem.asHours()),
            totalUnits: "h",
            refillValue: 59
        }
    };

    // Calculate number of hours left of current day. Also calculate total number of days
    var currentHour = function() {
        var rem = moment.duration(moment.utc(arrival).diff(moment()));
        return {
            current: rem.hours(),
            currentUnits: "h",
            currentRad: rem.hours() * 0.261666667,
            total: Math.ceil(rem.asDays()),
            totalUnits: " days",
            refillValue: 23
        }
    };

    // Adjust counter with given id using given data function. Invoke callback if 0 is reached.
    var AdjustCounter = function (parentId, data, refillCallback) {
        var parent = d3.select("#" + parentId);

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

    // Adjust large day label in text
    var AdjustDayLabel = function (id, data) {
        d3.select("#" + id)
            .text(data.total + data.totalUnits);
    };

    // Initialize a counter with a given data id and data function
    var initializeCounter = function(gId, data) {
        var parent = d3.select("#" + gId);

        parent.select(".progArc").remove();
        parent.append("path")
            .datum({endAngle: 6.28})
            .attr("d", arc)
            .attr("transform", "translate(396,814.5)")
            .attr("class", "progArc")
            .style("fill", "#58b4f2");

        AdjustCounter(gId, data);
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
            .attr("height", 22);

        d3.select("#g3083").insert("rect", ":first-child")
            .attr("width", bW) // max 540
            .style("fill", "#58b4f2")
            .attr("transform", "translate(" + (127+gW) + ",1024)")
            .attr("height", 22.1);

        d3.select("#tspan3077").text(perc * 100 + "%");
        d3.select("#passedPercLabel").text((1-perc) * 100 + "%");
        d3.select("#remainPercLabel").text(perc * 100 + "%");
    };

    var adjustPercentage = function(perc) {
        // TODO: Implement adjustment with animation (IDEA: animate labels as well)
    };

    // Initialize all 3 counters
    initializeCounter("seconds", currentSecond());
    initializeCounter("minutes", currentMinute());
    initializeCounter("hours", currentHour());
    AdjustDayLabel("days", currentHour());
    initializePercentage(0.32);

    // Start interval timer to adjust counters once every second
    setInterval(function () {
        // Adjust counters, pass callback to each other to update next counter when reaching 0
        AdjustCounter("seconds", currentSecond(), function() {
            AdjustCounter("minutes", currentMinute(), function() {
                AdjustCounter("hours", currentHour(), function() {
                    AdjustDayLabel("days", currentHour());
                })
            });
        });
    }, 1000);
});