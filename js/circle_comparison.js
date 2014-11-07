/**
 * Created by niels on 11/7/14.
 */

cCompare = {};

cCompare.initializeComparison = function(data) {
    // Insert wrapper
    var wrapper = d3.select(data.selector).insert("g", ":first-child")
        .attr("transform", "translate(88.297496,-24)")

    // Calculate radius ratio
    var rRatio = svgUtil.radiusRatio(data.leftValue.asSeconds(), data.rightValue.asSeconds());
    var style = data.style;

    // Draw left circle
    wrapper.insert("circle", ":first-child")
        .style("fill", "#d3d2d2")
        .attr("r", style.leftRadius)
        .attr("cx", style.x)
        .attr("cy", style.y);

    // Draw right circle
    var rightRadius = style.leftRadius * rRatio;
    var rightX = style.x + style.leftRadius + rightRadius + style.middlePadding;
    var rightY = style.y - (rightRadius - style.leftRadius);
    wrapper.insert("circle", ":first-child")
        .style("fill", "#58b4f2")
        .attr("r", rightRadius)
        .attr("cx", rightX)
        .attr("cy", rightY);

    // Get style from label template and remove it afterwards (TODO: Move this to a stylesheet)
    var labelStyle = "font-size:14px;font-style:normal;font-weight:bold;text-align:end;line-height:125%;letter-spacing:0px;word-spacing:0px;text-anchor:end;fill:#7b7979;fill-opacity:1;stroke:none;font-family:Sans;-inkscape-font-specification:Sans Bold";

    // Add label above right circle, if defined
    if(data.rightLabel) {
        var labelY = rightY - rightRadius - 7;  // Subtracting circle radius and a bit of padding
        svgUtil.multiLineText(wrapper, rightX, labelY, data.rightLabel, labelStyle);
    }
};