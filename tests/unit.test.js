const browserObject = require('../browser');
const scrapeAllObj = require("../pageController");
let pack = require("../package.json");

const globs = pack.jest.globals;


describe('Browser unit tests', () => {
    jest.useFakeTimers();
    jest.setTimeout(globs.TIMEOUT_SLEEP);
    let browserInstance;

    it('should run browser once', async () => {
        const browserMock = await jest.spyOn(browserObject, 'startBrowser');
        await browserObject.startBrowser();
        expect(browserMock).toBeCalledTimes(1);
    });

    it('should run go to specific url once', async () => {
        browserInstance = await browserObject.startBrowser();
        const testController = await jest.spyOn(scrapeAllObj.scrapeAllObject, 'scrapeAll');
        await scrapeAllObj.scrapeAllObject.scrapeAll(browserInstance, globs.LINK, globs.TESTFILE);
        expect(testController).toBeCalledTimes(1);
    });
});