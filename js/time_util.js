/**
 * Created by niels on 11/7/14.
 */

var tUtil = {}

// Calculate number of seconds left of current minute. Also calculate total number of minutes
tUtil.currentSecond = function(to, from) {
    if(!from) from = moment();
    var rem = moment.duration(moment.utc(to).diff(from));
    return {
        current: rem.seconds(),
        currentUnits: "s",
        currentRad: rem.seconds() * 0.104666667,
        total: Math.floor(rem.asMinutes()),
        totalUnits: "m",
        refillValue: 59
    }
};

// Calculate number of minutes left of current hour. Also calculate total number of hours
tUtil.currentMinute = function(to, from) {
    if(!from) from = moment();
    var rem = moment.duration(moment.utc(to).diff(from));
    return {
        current: rem.minutes(),
        currentUnits: "m",
        currentRad: rem.minutes() * 0.104666667,
        total: Math.floor(rem.asHours()),
        totalUnits: "h",
        refillValue: 59
    }
};

// Calculate number of hours left of current day. Also calculate total number of days
tUtil.currentHour = function(to, from) {
    if(!from) from = moment();
    var rem = moment.duration(moment.utc(to).diff(from));
    return {
        current: rem.hours(),
        currentUnits: "h",
        currentRad: rem.hours() * 0.261666667,
        total: Math.floor(rem.asDays()),
        totalUnits: " days",
        refillValue: 23
    }
};