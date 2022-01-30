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
if (typeof process.env.REBOOT_AFTER_MINS === "undefined")
    console.debug("Max minutes running before restart set (envir: REBOOT_AFTER_MINS)")
else
    console.debug(`Max minutes running before restart set to ${process.env.REBOOT_AFTER_MINS} (envir: REBOOT_AFTER_MINS)`)

//-------------- PREPARE ENV CONSTANTS
const REBOOT_AFTER_MINS = process.env.REBOOT_AFTER_MINS;
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
    console.log("======= Program started =====")

    //Configure service
    const pageService = new PageService(PUPPETEER_OPTIONS)

    //Initialize browser and create new page
    await pageService.init();

    //Login
    await pageService.login(LOGIN_USER, LOGIN_PASSWORD);

    //Alternate between pages
    let i = 0;
    let start_date = new Date();
    while (!REBOOT_AFTER_MINS || !Utils.hasElapsedMinutes(start_date, REBOOT_AFTER_MINS)) { //If none of these is true, intentional infinite loop till forced close
        console.log(`Browsing to url (url: ${URLS[i]})`);
        await pageService.goto(URLS[i]);
        await Utils.waitRandomTime();
        i = (i + 1) % URLS.length;
    }

    //If this point is reached process should finish.
    console.log(`Running for more than ${REBOOT_AFTER_MINS} minutes, so its time to shutdown/reboot`);
    console.log("======= Program finishing/rebooting =====");
}

//------------- RUN PROG
main()
    .then(()=>process.exit(0))
    .catch(e => {
        console.error(e);
        console.error("======= Program prematurely finished due to errors =======");
        process.exit(1)
    })