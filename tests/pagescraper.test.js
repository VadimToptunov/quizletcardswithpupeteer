const pagescraper = require("../pageScraper");
const browserObject = require("../browser");
const setupScript = require('./setup');
const tearDownScript = require('./teardown');
let pack = require("../package.json");
const globs = pack.jest.globals;

describe('Page scraper test:', () => {
    jest.useFakeTimers();
    jest.setTimeout(globs.TIMEOUT_SLEEP);
    let browserInstance= null;

    beforeEach(async () => {
        console.log('Starting browser test...');
        browserInstance = await browserObject.startBrowser();
        await setupScript();
    });

    afterAll(async () => {
        console.log(`Cleaning up the created file ${globs.TESTFILE}...`);
        await tearDownScript();
    });

    it('should run scraping once', async () => {
        const scraperMock = await jest.spyOn(pagescraper.scraperObject, 'scraper');
        await pagescraper.scraperObject.scraper(browserInstance, globs.LINK, globs.TESTFILE);
        expect(scraperMock).toBeCalledTimes(1);
    });
});