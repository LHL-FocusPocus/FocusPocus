export default function toMinutes(_a) {
    var hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds;
    var total = 0;
    if (hours) {
        total += hours * 60;
    }
    if (minutes) {
        total += minutes;
    }
    if (seconds) {
        total += seconds / 60;
    }
    return total;
}
//# sourceMappingURL=toMinutes.js.map