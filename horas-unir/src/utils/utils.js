const DEFAULT_MIN_WAIT_TIME_SECS = 30;
const DEFAULT_MAX_WAIT_TIME_SECS = 50;

async function waitRandomTime() {
    const waitForSecs = randomIntFromInterval(
        process.env.MIN_WAIT_TIME_SECS || DEFAULT_MIN_WAIT_TIME_SECS,
        process.env.MAX_WAIT_TIME_SECS || DEFAULT_MAX_WAIT_TIME_SECS);
    return delay(waitForSecs * 1000);
}

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

async function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
}

function hasElapsedMinutes(date, minutes) {
    const limit_date=new Date(date.getTime() + parseInt(minutes) * 60 * 1000);
    return new Date() > limit_date;
}

module.exports = {
    waitRandomTime,
    hasElapsedMinutes
}
