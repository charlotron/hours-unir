const puppeteer = require('puppeteer');

const COOKIES_DISCLAMER_SELECTOR = "#truste-consent-button";
const LOGIN_URL = "https://micampus.unir.net/";
const LOGIN_INPUT_USER_SELECTOR = "input[name=Username]";
const LOGIN_INPUT_PWD_SELECTOR = "input[name=Password]";
const LOGIN_INPUT_SUBMIT = "#btn-acceder";

module.exports = class PageService {
    constructor(puppeteerOpts) {
        this.puppeteerOpts = puppeteerOpts;
    }

    async init() {
        try {
            console.log("Initializing puppeteer with options: ",this.puppeteerOpts);
            const browser = await puppeteer.launch(this.puppeteerOpts);

            console.log("Opening new tab in chromium");
            this.page = await browser.newPage();
        } catch (e) {
            console.error("There was an error while initializing puppeteer or creating a new page", e);
            throw e;
        }
    }

    async login(login_user, login_pwd) {
        try {
            console.log(`Opening login page: (url: ${LOGIN_URL})`);
            await this.goto(LOGIN_URL);

            console.log(`Clicking on cookies disclamer: (selector: ${COOKIES_DISCLAMER_SELECTOR})`);
            await this.clickOnElementBySelector(COOKIES_DISCLAMER_SELECTOR);

            //Fill login
            console.log(`Filling user in form: (selector: ${LOGIN_INPUT_USER_SELECTOR}, value: ${login_user})`);
            await this.fillInput(LOGIN_INPUT_USER_SELECTOR, login_user);
            console.log(`Filling pwd in form: (selector=${LOGIN_INPUT_PWD_SELECTOR}, value: **********)`);
            await this.fillInput(LOGIN_INPUT_PWD_SELECTOR, login_pwd);
            console.log(`Submitting form: (selector: ${LOGIN_INPUT_SUBMIT}`);
            await this.clickOnElementBySelector(LOGIN_INPUT_SUBMIT);
            console.log("Waiting for page load after submit..");
            await this.waitForPageLoaded();
            console.log("Loaded OK..");
        } catch (e) {
            console.error("There was an error while logging in", e);
            throw e;
        }
    }

    async clickOnElementBySelector(selector, x = null, y = null) {
        const elem = await this.getElementBySelector(selector);
        return this.clickOnElement(elem, x, y);
    }

    // Clicks on an element at position x,y
    async clickOnElement(elem, x = null, y = null) {
        const rect = await this.page.evaluate(el => {
            const {top, left, width, height} = el.getBoundingClientRect();
            return {top, left, width, height};
        }, elem);

        // Use given position or default to center
        const _x = x !== null ? x : rect.width / 2;
        const _y = y !== null ? y : rect.height / 2;

        return this.page.mouse.click(rect.left + _x, rect.top + _y);
    }

    async goto(url) {
        try {
            return this.page.goto(url, {waitUntil: 'networkidle0',});
        } catch (e) {
            console.error(`There was an opening url: ${url}`, e);
            throw e;
        }
    }

    async waitForPageLoaded() {
        try {
        return this.page.waitForNavigation({waitUntil: 'networkidle2'});
        } catch (e) {
            console.error('Error waiting for the page to be fully loaded' , e);
            throw e;
        }
    }

    async fillInput(selector, text) {
        await this.page.focus(selector)
        return this.write(text);
    }

    async write(text) {
        return await this.page.keyboard.type(text)
    }

    async getElementBySelector(selector) {
        return this.page.$(selector);
    }
}