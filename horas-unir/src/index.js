let PageService = require("./services/page-service");
let Utils = require("./utils/utils");

//----------- CHECK INIT CONSTRAINTS FILLED
if (!process.env.LOGIN_USER)
    throw new Error("Invalid user, please provide one in environment var: LOGIN_USER");
if (!process.env.LOGIN_PASSWORD)
    throw new Error("Invalid password, please provide one in environment var: LOGIN_PASSWORD");
if (!process.env.URL1)
    throw new Error("Invalid urL 1, please provide one in environment var: URL1");
if (!process.env.URL2)
    throw new Error("Invalid url 2, please provide one in environment var: URL2");
if (typeof process.env.DISABLE_HEADLESS !== "undefined" && process.env.DISABLE_HEADLESS === "1")
    console.debug("Headless mode disabled (envir: DISABLE_HEADLESS set to 1)")
else
    console.debug("Headless mode enabled (envir: DISABLE_HEADLESS not set or set to any other than 1)")
if(typeof process.env.MAX_HOURS==="undefined")
    console.debug("Max hours limit not set (envir: MAX_HOURS)")
else
    console.debug(`Max hours limit set to ${process.env.MAX_HOURS} (envir: MAX_HOURS)`)

//-------------- PREPARE ENV CONSTANTS
const MAX_HOURS=process.env.MAX_HOURS;
const LOGIN_USER = process.env.LOGIN_USER;
const LOGIN_PASSWORD = process.env.LOGIN_PASSWORD;
const URL1 = process.env.URL1;
const URL2 = process.env.URL2;
const URLS = [URL1, URL2];
const HEADLESS = !(typeof process.env.DISABLE_HEADLESS !== "undefined" && process.env.DISABLE_HEADLESS === "1"); //If set to any value, then show the navigator
const PUPPETEER_OPTIONS = {
    headless: HEADLESS,
    args: [
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--disable-setuid-sandbox",
        "--no-sandbox",
    ]
}

//------------- MAIN PROG
async function main() {
    console.log("Program started =====")

    //Configure service
    const pageService = new PageService(PUPPETEER_OPTIONS)

    //Initialize browser and create new page
    await pageService.init();

    //Login
    await pageService.login(LOGIN_USER, LOGIN_PASSWORD);

    //Alternate between pages
    let i = 0;
    let date=new Date();
    while (true) {
        if(MAX_HOURS && Utils.hasPassedNHours(date,MAX_HOURS)){
            console.log(`Has passed ${MAX_HOURS} hours so time to restart`);
            return;
        }
        console.log(`Browsing to page: ${URLS[i]}`);
        await pageService.goto(URLS[i]);
        await Utils.waitRandomTime();
        i = (i + 1) % URLS.length;
    }
}

//------------- RUN PROG
main().catch(e => {
    throw e;
})