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

    // Initialize all 3 counters
    cCounter.initializeCounter("seconds", tUtil.currentSecond(arrival));
    cCounter.initializeCounter("minutes", tUtil.currentMinute(arrival));
    cCounter.initializeCounter("hours", tUtil.currentHour(arrival));
    AdjustDayLabel("days", tUtil.currentHour(arrival));

    // Initialize percentage
    var periodDur = moment.utc(arrival).diff(start);
    var remainDur = moment.utc(arrival).diff(moment());
    var remPerc = remainDur / periodDur;
    bPercentage.initializePercentage(1);
    bPercentage.adjustPercentage(remPerc);

    // Initialize comparisons
    cCompare.initializeComparison({
        selector: "#layer1",
        leftValue: moment.duration(52.14, "days"),
        leftLabel: "Dog year",
        rightValue : moment.duration(remainDur),
        rightLabel: "Remaining\ntime",
        style: {
            x: 232,
            y: 1366,
            leftRadius: 50,
            middlePadding: 48
        }
    });
    cCompare.initializeComparison({
        selector: "#layer1",
        leftValue: moment.duration(5, "months"),
        leftLabel: "Semester\n at ITU",
        rightValue : moment.duration(remainDur),
        rightLabel: "Remaining\ntime",
        style: {
            x: 245,
            y: 1686,
            leftRadius: 83,
            middlePadding: 38
        }
    });
    cCompare.initializeComparison({
        selector: "#layer1",
        leftValue: moment.duration(30, "years"),
        leftLabel: "Theresa's\nlifespan\n(so far)",
        rightValue : moment.duration(remainDur),
        rightLabel: "Remaining\ntime\n(of being apart)",
        style: {
            x: 221,
            y: 2114,
            leftRadius: 94,
            middlePadding: 99
        }
    });
    cCompare.initializeComparison({
        selector: "#layer1",
        leftValue: moment.duration(30, "years"),
        leftLabel: "Theresa's\nlifespan\n(so far)",
        rightValue : moment.duration(remainDur),
        rightLabel: "Remaining\ntime\n(of being apart)",
        style: {
            x: 135,
            y: 2458,
            leftRadius: 94,
            middlePadding: 270
        }
    });

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


    // CLEAN UP GARBAGE FROM SVG    TODO: Figure a more pratical way to deal with this
    d3.select("#g5279-7").remove();
    d3.select("#g9273-1").remove();
    d3.select("#remainPercLabel-2-4-3-6-7").remove();
    d3.select("#g5283-8-6-7").remove();
    d3.select("#g10196").remove();
    d3.select("#remainPercLabel-2-4-3-6").remove();
    d3.select("#g5283-8-66").remove();
    d3.select("#g5283-8-69-6").remove();
    d3.select("#remainPercLabel-2-4-3").remove();
    d3.select("#g9266").remove();
    d3.select("#g5283-8").remove();
});