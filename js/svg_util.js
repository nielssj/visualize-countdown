/**
 * Created by niels on 11/7/14.
 */

var svgUtil = {};

// Append multi-line text element at selector (requires predefined line-breaks in content)
svgUtil.multiLineText = function(parent, x, y, content, style) {
    // Create wrapper element (text)
    var text = parent.append("text")
        .attr("x", x)
        .attr("style", style)
        .attr("xml:space", "preserve")
        .style("text-anchor", "middle");

    // Calculate line stats
    var lineHeight = parseFloat(text.style("line-height"));
    var lines = content.split("\n");
    var mainY = y - ((lines.length-1) * lineHeight);

    // Insert lines
    for(var i = 0; i < lines.length; i++) {
        var line = lines[i];
        text.append("tspan")
            .attr("x", x)
            .attr("y", mainY + (i * lineHeight))
            .text(line);
    }

    // Adjust main Y to be lower anchor based on number of lines
    text.attr("y", mainY);
};


/*
 Utility for calculating radius ratio for circles with 2 given areas.
 Necessary because relative size of areas does not directly
 translate to the same relative size of radius.

 For example:
 A1 = 1
 r1 = sqrt(1 / 3.14) = 0.564
 A2 = 1.26
 r2 = sqrt(1.26 / 3.14) = 0.633
 rR = 1.123

 (rRatio = sqrt(A2 / 3.14) / sqrt(A1 / 3.14))
 */
svgUtil.radiusRatio = function(a1, a2) {
    rA2 = a2 / a1;
    return Math.sqrt(rA2 / Math.PI) / Math.sqrt(1 / Math.PI);
};