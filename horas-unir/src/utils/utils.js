const MIN_WAIT_TIME_SECS = 30;
const MAX_WAIT_TIME_SECS = 50;

async function waitRandomTime() {
    const waitForSecs = randomIntFromInterval(MIN_WAIT_TIME_SECS, MAX_WAIT_TIME_SECS);
    return delay(waitForSecs * 1000);
}

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

async function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
}

function hasPassedNHours(date, hours){
        const hour= 1000 * 60 * 60 * hours;
        const hourago= Date.now() - hour;

        return date > hourago;
}

module.exports= {
    waitRandomTime,
    hasPassedNHours
}
